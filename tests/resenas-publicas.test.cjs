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
test('lightweight review read preserves all returned data and requests only selected places', async () => {
  const rows = [
    { id: 'inline', comentario: 'Foto real', reportado: false, foto: '/api/imagenes-publicas/resenas/inline' },
    { id: 'empty', comentario: 'Sin foto', reportado: null, foto: null },
    { id: 'remote', comentario: 'URL', reportado: false, foto: 'https://example.com/photo.jpg' },
    { id: 'reported', comentario: 'Conservar indicador', reportado: true, foto: null },
  ];
  const { db, requests } = client([{ body: rows }]);
  const result = await cargarResenasPublicas(db, ['place']);
  assert.equal(result.error, null);
  assert.deepEqual(result.data, rows);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].pathname, '/rest/v1/resenas_publicas_ligeras');
  assert.equal(requests[0].searchParams.get('monumento_id'), 'in.(place)');
  assert.equal(requests[0].searchParams.get('order'), 'created_at.desc');
});
test('query failures remain visible instead of silently hiding reviews', async () => {
  const { db } = client([{ status: 400, body: { message: 'review lookup failed' } }]);
  const result = await cargarResenasPublicas(db, ['place']);
  assert.equal(result.data, null);
  assert.equal(result.error.message, 'review lookup failed');
});
test('empty reviews remain empty without additional queries', async () => {
  const { db, requests } = client([{ body: [] }]);
  assert.deepEqual((await cargarResenasPublicas(db, ['place'])).data, []);
  assert.equal(requests.length, 1);
});
