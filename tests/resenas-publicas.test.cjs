/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { createClient } = require('@supabase/supabase-js');
const loaded = { exports: {} };
new Function('require', 'module', 'exports', ts.transpileModule(
  fs.readFileSync(require.resolve('../lib/resenas-publicas.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }
).outputText)(require, loaded, loaded.exports);
const { cargarResenasPublicas } = loaded.exports;
function client(responses) {
  const requests = [];
  const db = createClient('https://example.supabase.co', 'test-key', {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: async (url) => {
      requests.push(new URL(url));
      const select = new URL(url).searchParams.get('select');
      const kind = select === 'id' ? 'inline' : select === 'id,foto' ? 'urls' : 'base';
      const index = responses.findIndex(response => (response.kind || 'base') === kind);
      const next = responses.splice(index, 1)[0];
      return new Response(JSON.stringify(next.body), { status: next.status || 200, headers: { 'Content-Type': 'application/json' } });
    } },
  });
  return { db, requests };
}
test('reviews retain order, text, flags, remote URLs and absent photos', async () => {
  const rows = [
    { id: 'inline', comentario: 'Foto real', reportado: false },
    { id: 'empty', comentario: 'Sin foto', reportado: null },
    { id: 'remote', comentario: 'URL', reportado: false },
    { id: 'reported', comentario: 'Conservar indicador', reportado: true },
  ];
  const { db, requests } = client([
    { body: rows },
    { kind: 'urls', body: [{ id: 'remote', foto: 'https://example.com/photo.jpg' }] },
    { kind: 'inline', body: [{ id: 'inline' }] },
  ]);
  const result = await cargarResenasPublicas(db, ['place']);
  assert.equal(result.error, null);
  assert.deepEqual(result.data, rows.map(row => ({ ...row, foto: row.id === 'inline' ? '/api/imagenes-publicas/resenas/inline' : row.id === 'remote' ? 'https://example.com/photo.jpg' : null })));
  assert(!requests[0].searchParams.get('select').includes('foto'));
  assert.equal(requests.find(url => url.searchParams.get('select') === 'id,foto').searchParams.getAll('foto').length, 5);
  assert(requests.some(url => url.searchParams.get('select') === 'id'));
});
test('photo lookup errors reject the load instead of silently hiding photos', async () => {
  const { db } = client([{ body: [{ id: 'one' }] }, { kind: 'urls', status: 400, body: { message: 'photo lookup failed' } }, { kind: 'inline', body: [] }]);
  const result = await cargarResenasPublicas(db, ['place']);
  assert.equal(result.data, null);
  assert.equal(result.error.message, 'photo lookup failed');
});
test('empty reviews do not request photo data', async () => {
  const { db, requests } = client([{ body: [] }]);
  assert.deepEqual((await cargarResenasPublicas(db, ['place'])).data, []);
  assert.equal(requests.length, 1);
});
