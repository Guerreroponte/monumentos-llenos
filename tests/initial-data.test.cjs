/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

// Load pure data modules with an in-memory public database; never write production data.
function load(relative, db) {
  const cache = new Map();
  function moduleAt(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const compiledModule = { exports: {} };
    cache.set(filename, compiledModule.exports);
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    function mockedRequire(id) {
      if (id === 'server-only') return {};
      if (id === 'next/cache') return { unstable_cache: fn => fn };
      if (id === 'react') return { cache: fn => fn };
      if (id === 'next/navigation') return { notFound: () => { throw new Error('NOT_FOUND'); } };
      if (id.endsWith('/supabase-public-server')) return { publicServer: db };
      if (id === './supabase') return { supabase: db };
      const resolved = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(filename), id);
      return moduleAt(resolved + '.ts');
    }
    new Function('require', 'module', 'exports', output)(mockedRequire, compiledModule, compiledModule.exports);
    return compiledModule.exports;
  }
  return moduleAt(path.join(root, relative));
}

function database(tables, failingTable) {
  const reads = [];
  return { reads, from(table) {
    let rows = [...(tables[table] || [])], single = false;
    const query = {
      select() { return query; },
      eq(key, value) { rows = rows.filter(row => row[key] === value); return query; },
      in(key, values) { rows = rows.filter(row => values.includes(row[key])); return query; },
      or() { rows = rows.filter(row => row.reportado !== true); return query; },
      not(key) { rows = rows.filter(row => row[key] != null); return query; },
      order() { return query; },
      range(start, end) { rows = rows.slice(start, end + 1); reads.push({ table, start, end }); return query; },
      limit(count) { rows = rows.slice(0, count); return query; },
      maybeSingle() { single = true; return query; },
      then(resolve, reject) {
        return Promise.resolve({ data: single ? rows[0] || null : rows, error: table === failingTable ? new Error('offline') : null }).then(resolve, reject);
      },
    };
    return query;
  } };
}
const image = 'data:image/png;base64,aGVsbG8=';
const uuid = '11111111-1111-4111-8111-111111111111';

test('initial event filters retain deep links and pagination', () => {
  const { leerFiltrosEventos } = load('lib/eventos-filters.ts');
  const f = leerFiltrosEventos(new URLSearchParams('ciudad=Madrid&tipo=Concierto&pagina=3&vista=locales&proximos=0&colaborador=sala&q=jazz&fecha=2026-10-04'));
  assert.equal(f.pagina, 3);
  assert.equal(f.proximos, false);
  assert.equal(f.colaborador, 'sala');
  assert.deepEqual(JSON.parse(f.clave), ['jazz', '2026-10-04', 'Madrid', 'Concierto', false, 'locales', 'sala']);
  for (const pagina of ['0', '-1', 'bad', '1.5', 'Infinity']) {
    assert.equal(leerFiltrosEventos(new URLSearchParams({ pagina })).pagina, 1);
  }
});

test('legacy photos become URLs without changing normal image URLs or their bytes', () => {
  const { publicImage, decodePublicImage } = load('lib/public-images.ts');
  assert.equal(publicImage('resenas', uuid, image), `/api/imagenes-publicas/resenas/${uuid}`);
  assert.equal(publicImage('lugares', uuid, 'https://example.com/photo.jpg'), 'https://example.com/photo.jpg');
  assert.equal(publicImage('lugares', uuid, null), null);
  const decoded = decodePublicImage(image);
  assert.equal(decoded.contentType, 'image/png');
  assert.equal(Buffer.from(decoded.base64, 'base64').toString(), 'hello');
  assert.equal(decodePublicImage('data:text/html;base64,aGVsbG8='), null);
});

test('home preserves visibility, reviews, gallery deduplication and zero ratings', async () => {
  const db = database({
    Monumentos: [{ id: uuid, nombre: 'Visible', rating: 0, imagen: image }, { id: 'hidden', reportado: true }],
    resenas: [{ id: 'review', monumento_id: uuid, foto: image, likes: 4 }, { id: 'hidden-review', monumento_id: uuid, reportado: true }],
    lugares_fotos: [{ lugar_id: uuid, imagen: 'https://example.com/a.jpg' }, { lugar_id: uuid, imagen: 'https://example.com/a.jpg' }],
  });
  const { cargarDatos } = load('lib/home-data.ts', db);
  const result = await cargarDatos(db);
  assert.equal(result.length, 1);
  assert.equal(result[0].rating, 0);
  assert.equal(result[0].resenas.length, 1);
  assert.equal(result[0].resenas[0].likes, 4);
  assert.deepEqual(result[0].fotosLugar, ['https://example.com/a.jpg']);
  assert(!JSON.stringify(result).includes('data:image'));
});

test('failed data loads reject instead of masquerading as an empty catalogue', async () => {
  const db = database({}, 'Monumentos');
  const { cargarDatos } = load('lib/home-data.ts', db);
  await assert.rejects(cargarDatos(db), /offline/);
});

test('event batches keep all rows beyond 1,000 and preserve collaborator filtering', async () => {
  const eventos = Array.from({ length: 1001 }, (_, i) => ({ id: String(i), nombre: `Plan ${i}`, colaborador_id: i < 2 ? 'sala' : 'other', categoria_evento: 'local' }));
  const db = database({ eventos, comentarios_eventos: [{ id: 'c', evento_id: '0' }], colaboradores: [{ id: 'sala', nombre: 'Sala de prueba' }] });
  const { getEventosInitialData } = load('lib/eventos-data.ts', db);
  const all = await getEventosInitialData('');
  assert.equal(all.eventos.length, 1001);
  assert.equal(all.eventos[0].comentariosCount, 1);
  const sala = await getEventosInitialData('sala');
  assert.equal(sala.eventos.length, 2);
  assert.equal(sala.nombreColaborador, 'Sala de prueba');
  assert(db.reads.every(read => read.end - read.start < 500));
});

test('place detail contains reviews on first render and absent slugs return not found', async () => {
  const db = database({ Monumentos: [{ id: uuid, slug: 'lugar', imagen: image }], resenas: [{ id: uuid, monumento_id: uuid, foto: image }, { id: 'hidden', monumento_id: uuid, reportado: true }] });
  const { getLugarDetail } = load('lib/detail-data.ts', db);
  const result = await getLugarDetail('lugar');
  assert.equal(result.resenas.length, 1);
  assert(!JSON.stringify(result).includes('data:image'));
  await assert.rejects(getLugarDetail('missing'), /NOT_FOUND/);
});

test('image endpoint rejects unsupported sources, missing and reported photos', async () => {
  const db = database({ resenas: [{ id: uuid, foto: image, reportado: true }] });
  const { GET } = load('app/api/imagenes-publicas/[origen]/[id]/route.ts', db);
  for (const params of [{ origen: 'private', id: uuid }, { origen: 'resenas', id: 'invalid' }, { origen: 'resenas', id: uuid }]) {
    assert.equal((await GET(new Request('http://localhost'), { params: Promise.resolve(params) })).status, 404);
  }
});

test('image endpoint serves original image bytes with explicit safe content type', async () => {
  const db = database({ Monumentos: [{ id: uuid, imagen: image }] });
  const { GET } = load('app/api/imagenes-publicas/[origen]/[id]/route.ts', db);
  const response = await GET(new Request('http://localhost'), { params: Promise.resolve({ origen: 'lugares', id: uuid }) });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(await response.text(), 'hello');
});

test('comment counts include contributions beyond the API first page', async () => {
  const comments = Array.from({length: 1204}, (_, i) => ({id: String(i), evento_id: i < 1200 ? 'old' : 'swing'}));
  const db = database({eventos: [{id: 'swing'}], comentarios_eventos: comments});
  const {getEventosInitialData} = load('lib/eventos-data.ts', db);
  assert.equal((await getEventosInitialData('')).eventos[0].comentariosCount, 4);
  assert.equal(db.reads.filter(r => r.table === 'comentarios_eventos').length, 3);
});

test('agenda prioritizes current short plans, then long-running plans, with missing dates last', () => {
  const {compararAgenda, fechaAgenda, largaDuracion} = load('lib/agenda-ui.ts');
  const rows = [{id:'long',inicio:'2026-01-01',fin:'2026-12-31'},{id:'tomorrow',inicio:'2026-10-05'},{id:'today',inicio:'2026-10-04'},{id:'ongoing',inicio:'2026-10-02',fin:'2026-10-06'},{id:'unknown'}];
  rows.sort((a,b) => compararAgenda(a,b,'2026-10-04'));
  assert.deepEqual(rows.map(r => r.id), ['ongoing','today','tomorrow','long','unknown']);
  assert.equal(fechaAgenda('2026-07-07','2026-12-31','2026-10-04'), 'Hasta el 31 de diciembre de 2026');
  assert.equal(largaDuracion('2026-10-02','2026-10-06'), false);
});

test('grouped categories preserve old exact filters and safely label ticket links', () => {
  const {grupoTipo, coincideTipo, etiquetaEnlace} = load('lib/agenda-ui.ts');
  assert.equal(grupoTipo('Concierto pequeño'), 'Música y conciertos');
  assert(coincideTipo('Música','grupo:Música y conciertos'));
  assert(coincideTipo('Monólogo','grupo:Humor y monólogos'));
  assert(!coincideTipo('Música','Concierto'));
  assert(coincideTipo('Concierto','Concierto'));
  assert.equal(etiquetaEnlace('https://entradium.com/en/events/swing'), 'Ver entradas');
  assert.equal(etiquetaEnlace('https://entradium.com.ejemplo.org'), 'Consultar programación');
});
