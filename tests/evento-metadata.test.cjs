const { test } = require('node:test');
const assert = require('node:assert/strict');
const { metadataEvento } = require('../lib/evento-metadata.ts');
const { default: robots } = require('../app/robots.ts');

test('event metadata distinguishes cities and keeps canonical and sharing consistent', () => {
  const result = metadataEvento({ nombre: 'Concierto acústico', ciudad: 'Lugo', descripcion: 'Música en directo.', imagen: '/cartel.jpg' }, 'concierto-lugo');
  assert.equal(result.title, 'Concierto acústico en Lugo');
  assert.equal(result.alternates.canonical, 'https://www.monumentosllenos.com/eventos/concierto-lugo');
  assert.equal(result.openGraph.url, result.alternates.canonical);
  assert.equal(result.openGraph.images[0].url, 'https://www.monumentosllenos.com/cartel.jpg');
  assert.equal(result.twitter.description, result.description);
  assert.equal(metadataEvento({nombre:'Concierto en Lugo',ciudad:'Lugo'}, 'concierto').title, 'Concierto en Lugo');
});

test('event summaries handle long formatted text, missing information and unsafe image schemes', () => {
  const result = metadataEvento({descripcion:'<p>Música en directo.</p>\\n https://example.com ' + 'Una noche especial. '.repeat(40), imagen:'javascript:alert(1)'}, 'evento');
  assert(result.description.length <= 160);
  assert(!/[<>]|https:|\\n/.test(result.description));
  assert.deepEqual(result.openGraph.images, []);
  assert.equal(result.twitter.card, 'summary');
  assert.match(metadataEvento({}, 'evento').description, /información del evento/);
});

test('robots advertises the production sitemap without blocking public content or noindex directives', () => {
  assert.deepEqual(robots().rules, {userAgent:'*',allow:'/'});
  assert.equal(robots().sitemap,'https://www.monumentosllenos.com/sitemap.xml');
});
