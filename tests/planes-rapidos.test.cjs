const { test } = require('node:test');
const assert = require('node:assert/strict');
const { coincidePlan, ACCESOS_RAPIDOS, enlacePlan } = require('../lib/planes-rapidos.ts');
const { leerFiltrosEventos } = require('../lib/eventos-filters.ts');
const { regresoEventos } = require('../lib/eventos-navigation.ts');
const evento = { precio: '', ambiente: '', tipo: '', subtipo: '' };

test('gratis excludes conditional, mixed and unknown prices', () => {
  for (const precio of ['Gratis', 'Entrada gratuita', '0 €', '0,00 euros', 'Acceso libre', 'Entrada gratuita con reserva previa', 'Gratuito hasta completar aforo.']) {
    assert.equal(coincidePlan({...evento, precio}, 'gratis'), true, precio);
  }
  for (const precio of ['', 'Consultar precio', 'Desde 0 €', 'Gratis menores de 3 años', 'Entrada gratuita; conciertos 15 €', 'No es gratis', 'Gratis con consumición', '10 €', 'Entrada libre con consumición obligatoria']) {
    assert.equal(coincidePlan({...evento, precio}, 'gratis'), false, precio);
  }
});
test('family requires explicit classification, not generic admission or misleading text', () => {
  for (const ambiente of ['Familiar', 'En familia', 'Público familiar', 'Navideño, familiar y cultural']) assert.equal(coincidePlan({...evento, ambiente}, 'familia'), true);
  for (const subtipo of ['Teatro infantil', 'Cuentacuentos / teatro infantil / familiar / Halloween', 'Musical infantil / Tributo a Frozen']) assert.equal(coincidePlan({...evento, subtipo}, 'familia'), true);
  for (const ambiente of ['', 'No familiar', 'Adultos', 'Todos los públicos', 'No recomendado para niños']) assert.equal(coincidePlan({...evento, ambiente}, 'familia'), false);
  assert.equal(coincidePlan(evento, ''), true);
});
test('all six shortcuts preserve city and resolve to supported filters', () => {
  assert.equal(ACCESOS_RAPIDOS.length, 6);
  for (const acceso of ACCESOS_RAPIDOS) {
    const url = new URL(enlacePlan(acceso.filtro, ' Málaga '), 'https://example.com');
    const filtros = leerFiltrosEventos(url.searchParams);
    assert.equal(filtros.ciudad, 'Málaga');
    assert.ok(filtros.plan || filtros.tipo || filtros.periodo);
    assert.equal(filtros.proximos, true);
    assert.equal(filtros.pagina, 1);
  }
});
test('plan survives reload, pagination and detail return, invalid plans are ignored', () => {
  const url = '/eventos?plan=familia&ciudad=Madrid&pagina=2';
  const filtros = leerFiltrosEventos(new URL(url, 'https://example.com').searchParams);
  const vuelta = leerFiltrosEventos(new URL(regresoEventos(url), 'https://example.com').searchParams);
  assert.deepEqual(vuelta, filtros);
  assert.equal(filtros.plan, 'familia');
  assert.equal(filtros.pagina, 2);
  assert.equal(leerFiltrosEventos(new URLSearchParams('plan=invalid')).plan, '');
});
