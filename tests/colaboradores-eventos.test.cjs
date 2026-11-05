const { test } = require('node:test');
const assert = require('node:assert/strict');
const { proximosPorColaborador } = require('../lib/colaboradores-eventos.ts');
const hoy = '2026-11-05';
const evento = (id, colaborador_id, fecha_inicio, extras = {}) => ({
  id, colaborador_id, nombre: id, slug: id, fecha_inicio, fecha_fin: null, hora_inicio: null, ...extras,
});

test('cada colaborador recibe sus dos eventos más cercanos sin mezclar salas', () => {
  const grupos = proximosPorColaborador([
    evento('tarde', 'a', hoy, { hora_inicio: '21:00' }),
    evento('otro', 'b', '2026-11-06'),
    evento('lejano', 'a', '2026-12-01'),
    evento('temprano', 'a', hoy, { hora_inicio: '19:00' }),
    evento('temprano', 'a', hoy, { hora_inicio: '19:00' }),
  ], hoy);
  assert.deepEqual(grupos.get('a').map(e => e.id), ['temprano', 'tarde']);
  assert.deepEqual(grupos.get('b').map(e => e.id), ['otro']);
  assert.equal(grupos.has('sin-eventos'), false);
});

test('descarta eventos pasados, fechas inválidas y fichas sin enlace o colaborador', () => {
  const grupos = proximosPorColaborador([
    evento('pasado', 'a', '2026-11-04'),
    evento('sin-fecha', 'a', null),
    evento('fecha-invalida', 'a', '2026-11-31'),
    evento('rango-invalido', 'a', hoy, { fecha_fin: '2026-11-04' }),
    evento('sin-enlace', 'a', hoy, { slug: null }),
    evento('sin-colaborador', null, hoy),
  ], hoy);
  assert.equal(grupos.size, 0);
});

test('prioriza próximas fechas sobre periodos ya iniciados y conserva rangos vigentes', () => {
  const grupos = proximosPorColaborador([
    evento('en-curso', 'a', '2026-10-01', { fecha_fin: '2026-11-30' }),
    evento('proximo', 'a', '2026-11-06'),
    evento('hoy', 'a', hoy),
    evento('acaba-hoy', 'b', '2026-11-01', { fecha_fin: hoy }),
  ], hoy);
  assert.deepEqual(grupos.get('a').map(e => e.id), ['hoy', 'proximo']);
  assert.deepEqual(grupos.get('b').map(e => e.id), ['acaba-hoy']);
});
