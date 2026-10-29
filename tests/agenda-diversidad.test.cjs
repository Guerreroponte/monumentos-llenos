/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { compararAgenda, eventoVigente } = require('../lib/agenda-ui.ts');
const { intercalarCiudades } = require('../lib/lugares-diversidad.ts');

test('festivales de menos de 30 días no desplazan hoy; se conservan al paginar', () => {
  const hoy = '2026-10-29';
  const eventos = [
    { id: 'festival', inicio: '2026-10-02', fin: '2026-10-30' },
    { id: 'pasado', inicio: '2026-10-28' },
    ...Array.from({ length: 13 }, (_, i) => ({ id: String(i), inicio: hoy })),
    { id: 'proximo', inicio: '2026-10-30' },
  ];
  const ordenados = eventos.filter(e => eventoVigente(e.inicio, e.fin, hoy)).sort((a,b) => compararAgenda(a,b,hoy));
  assert.ok(ordenados.slice(0,12).every(e => e.inicio === hoy));
  assert.deepEqual(ordenados.slice(12).map(e => e.id), ['12','proximo','festival']);
  assert.equal(new Set(ordenados.map(e => e.id)).size, 15);
});

test('diversidad conserva elementos, orden por ciudad y paginación sin duplicados', () => {
  const input = Array.from({length: 18}, (_,id) => ({id, ciudad: id < 8 ? 'Huelva' : id < 14 ? 'Madrid' : 'Ávila'}));
  const original = [...input];
  const result = intercalarCiudades(input);
  assert.deepEqual(result.slice(0,3).map(e => e.ciudad), ['Huelva','Madrid','Ávila']);
  assert.deepEqual(input, original);
  assert.deepEqual(result.map(e=>e.id).sort((a,b)=>a-b), input.map(e=>e.id));
  for (const ciudad of ['Huelva','Madrid','Ávila']) assert.deepEqual(result.filter(e=>e.ciudad===ciudad),input.filter(e=>e.ciudad===ciudad));
  assert.deepEqual(intercalarCiudades([]), []);
  assert.deepEqual(intercalarCiudades(input.slice(0,8)), input.slice(0,8));
});
