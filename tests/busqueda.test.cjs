const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buscarCoincidencias, paginaBusqueda, textoConsulta } = require('../lib/busqueda.ts');
const datos = [{ nombre: 'Catedral de Málaga', ciudad: 'Málaga' }, { nombre: 'Jazz en el parque', ciudad: 'Lorca' }, { nombre: 'Lorca', ciudad: 'Murcia' }];
const campos = x => [x.nombre, x.ciudad];
test('busca sin tildes ni distinción de mayúsculas y combina palabras entre campos', () => {
 assert.equal(buscarCoincidencias(datos, 'MALAGA', campos)[0].nombre, 'Catedral de Málaga');
 assert.equal(buscarCoincidencias(datos, 'lorca jazz', campos)[0].nombre, 'Jazz en el parque');
 assert.equal(buscarCoincidencias(datos, 'jazz madrid', campos).length, 0);
});
test('prioriza el nombre exacto y mantiene el orden de las demás coincidencias', () => {
 assert.deepEqual(buscarCoincidencias(datos, 'Lorca', campos).map(x => x.nombre), ['Lorca', 'Jazz en el parque']);
});
test('no interpreta símbolos como comodines ni ejecuta consultas vacías', () => {
 for (const q of ['', ' ', '%', 'a', '<>']) assert.deepEqual(buscarCoincidencias(datos, q, campos), []);
 assert.equal(textoConsulta(['Madrid', 'Lorca']), '');
 assert.equal(textoConsulta('x'.repeat(200)).length, 100);
});
test('pagina sin perder resultados y limita páginas inválidas', () => {
 const items = Array.from({length: 19}, (_, i) => i);
 assert.deepEqual(paginaBusqueda(items, '2').items, [8,9,10,11,12,13,14,15]);
 assert.deepEqual(paginaBusqueda(items, '9999').items, [16,17,18]);
 assert.equal(paginaBusqueda(items, '-1').pagina, 1);
 assert.equal(paginaBusqueda([], '10').pagina, 1);
});

test('Lorca no coincide con Mallorca y permite prefijos de palabra', () => {
 const ciudades = ['Lorca', 'Mallorca', 'Palma de Mallorca'];
 assert.deepEqual(buscarCoincidencias(ciudades, 'Lorca', x => [x]), ['Lorca']);
 assert.deepEqual(buscarCoincidencias(ciudades, 'Mall', x => [x]), ['Mallorca', 'Palma de Mallorca']);
});
