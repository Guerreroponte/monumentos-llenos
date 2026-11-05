const { test } = require('node:test');
const assert = require('node:assert/strict');
const { contarCategoriasCiudad } = require('../lib/categorias-ciudad.ts');
const hoy = '2026-11-05';
const evento = (tipo, fecha_inicio = hoy, fecha_fin = null) => ({ tipo, fecha_inicio, fecha_fin });

test('cuenta toda la programación, también la que supera las ocho tarjetas de la guía', () => {
  const eventos = [...Array.from({ length: 12 }, () => evento('Concierto')), evento('Teatro'), evento('Monólogo')];
  assert.deepEqual(contarCategoriasCiudad(eventos, hoy), { Concierto: 12, Teatro: 1, Monólogo: 1, Tardeo: 0 });
});

test('usa el mismo tipo exacto del enlace de agenda y excluye fechas pasadas o inválidas', () => {
  assert.deepEqual(contarCategoriasCiudad([
    evento(' Teatro '), evento('Concierto', '2026-11-04'), evento('Concierto', null),
    evento('Teatro / música'), evento(null), evento('Tardeo', '2026-11-01', '2026-11-30'),
    evento('Monólogo', hoy, '2026-11-04'),
  ], hoy), { Concierto: 0, Teatro: 1, Monólogo: 0, Tardeo: 1 });
});
