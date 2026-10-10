const { test } = require("node:test");
const assert = require("node:assert/strict");
const { metadataLugar } = require("../lib/lugar-metadata.ts");

test("place metadata is specific, shares an absolute image and preserves canonical", () => {
  const result = metadataLugar({nombre:"Cerro del Tío Pío",ciudad:"Madrid",descripcion:"Un mirador en Vallecas.",imagen:"/api/imagenes-publicas/lugares/test"}, "cerro-del-tio-pio-madrid-vallecas");
  assert.equal(result.title,"Cerro del Tío Pío en Madrid");
  assert.equal(result.description,"Un mirador en Vallecas.");
  assert.equal(result.openGraph.images[0].url,"https://www.monumentosllenos.com/api/imagenes-publicas/lugares/test");
  assert.equal(result.twitter.card,"summary_large_image");
  assert.equal(result.openGraph.url,result.alternates.canonical);
  assert.equal(result.twitter.description,result.description);
});

test("metadata handles missing data, unsafe images and long formatted descriptions", () => {
  const empty = metadataLugar({nombre:"Teatro Romano de Mérida",ciudad:"Mérida"}, "teatro-romano-de-merida");
  assert.equal(empty.title,"Teatro Romano de Mérida");
  assert.match(empty.description,/Teatro Romano de Mérida/);
  assert.equal(empty.twitter.card,"summary");
  assert.deepEqual(empty.openGraph.images,[]);
  const long = metadataLugar({nombre:"Lugar",descripcion:"<p>Un lugar bonito.</p>\\n https://example.com " + "Descripción larga ".repeat(30),imagen:"data:image/png;base64,abc"}, "lugar");
  assert(long.description.length <= 160);
  assert(!long.description.includes("<p>"));
  assert(!long.description.includes("https://"));
  assert.deepEqual(long.openGraph.images,[]);
});
