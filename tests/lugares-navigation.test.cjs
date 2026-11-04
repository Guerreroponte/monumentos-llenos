const { test } = require('node:test');
const assert = require('node:assert/strict');
const { regresoLugares, enlaceFichaLugar } = require('../lib/lugares-navigation.ts');

test('la ficha conserva filtros con acentos, página y tarjeta al regresar', () => {
  const link = new URL(enlaceFichaLugar('calado', 'Jardín & museo', 'Logroño', 3, 'lugar-lista-abc-123'), 'https://example.com');
  const regreso = regresoLugares(link.searchParams.get('volver'));
  const destino = new URL(regreso, 'https://example.com');
  assert.equal(destino.pathname, '/');
  assert.equal(destino.searchParams.get('lugar'), 'Jardín & museo');
  assert.equal(destino.searchParams.get('ciudad'), 'Logroño');
  assert.equal(destino.searchParams.get('paginaLugares'), '3');
  assert.equal(destino.hash, '#lugar-lista-abc-123');
});
test('los enlaces directos tienen regreso seguro y rechazan destinos ajenos', () => {
  for (const input of [undefined, ['/?ciudad=Vigo'], '//evil.test', '/\\evil.test', 'https://evil.test', 'javascript:alert(1)', '/eventos']) {
    assert.equal(regresoLugares(input), '/');
  }
  assert.equal(regresoLugares('/?ciudad=Vigo&ajeno=1#inexistente'), '/?ciudad=Vigo#lugares');
  assert.equal(regresoLugares('/#lugar-alternativa-123'), '/#lugar-alternativa-123');
});

test('la ficha regresa al mapa con los filtros que estaban activos', () => {
  const link = new URL(enlaceFichaLugar('castillo', 'Castillo & museo', 'Ávila', 1, 'mapa'), 'https://example.com');
  assert.equal(regresoLugares(link.searchParams.get('volver')), '/?lugar=Castillo+%26+museo&ciudad=%C3%81vila#mapa');
  assert.equal(regresoLugares('/#mapa'), '/#mapa');
  assert.equal(regresoLugares('//evil.test/#mapa'), '/');
});
