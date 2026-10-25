const { test } = require("node:test");
const assert = require("node:assert/strict");
const { destinosUnicos } = require("../lib/home-seleccion.ts");

test("la portada conserva la primera aportación de cada destino sin eliminar otros planes", () => {
  const cards = [{href:"/eventos/a",id:"foto-nueva"}, {href:"/lugar/b",id:"lugar"}, {href:"/eventos/a",id:"cartel"}, {href:"/eventos/c",id:"otro"}];
  assert.deepEqual(destinosUnicos(cards), [cards[0],cards[1],cards[3]]);
  assert.equal(cards.length,4);
  assert.deepEqual(destinosUnicos([]), []);
});
