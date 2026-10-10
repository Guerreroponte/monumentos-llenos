const { test } = require("node:test");
const assert = require("node:assert/strict");
const { enlaceComoLlegarEvento } = require("../lib/eventos-directions.ts");

test("directions prefer valid coordinates including zero and encode addresses safely", () => {
  assert.equal(new URL(enlaceComoLlegarEvento({latitud:0,longitud:0})).searchParams.get("destination"), "0,0");
  const evento = {ciudad:"Madrid",ubicacion_detalle:"Teatro Eslava, Calle del Arenal 11"};
  assert.equal(new URL(enlaceComoLlegarEvento(evento)).searchParams.get("destination"), "Teatro Eslava, Calle del Arenal 11, Madrid");
  assert.equal(new URL(enlaceComoLlegarEvento({...evento,latitud:40.42,longitud:-3.7})).searchParams.get("destination"), "40.42,-3.7");
  assert.equal(enlaceComoLlegarEvento({...evento,latitud:91,longitud:NaN}), enlaceComoLlegarEvento(evento));
  const url = new URL(enlaceComoLlegarEvento({ciudad:"León",ubicacion_detalle:"Sala A & B #2"}));
  assert.equal(url.searchParams.get("destination"), "Sala A & B #2, León");
  assert.equal(url.searchParams.size,2);
});

test("directions stay hidden for missing, city-only, uncertain and multi-venue locations", () => {
  for (const ubicacion_detalle of ["", "Madrid", "Centro urbano", "Por confirmar", "Diversos espacios de Madrid", "Varias sedes", "Consultar programación", "Evento online"]) {
    assert.equal(enlaceComoLlegarEvento({ciudad:"Madrid",ubicacion_detalle}), null, ubicacion_detalle);
  }
  assert.equal(enlaceComoLlegarEvento({ubicacion_detalle:"Teatro Eslava"}), null);
  assert.equal(enlaceComoLlegarEvento({latitud:91,longitud:3}), null);
  assert.equal(enlaceComoLlegarEvento({latitud:40,longitud:-3,ubicacion_detalle:"Varias sedes",ciudad:"Madrid"}), null);
  assert.equal(enlaceComoLlegarEvento({ciudad:"Madrid",ubicacion_detalle:"a".repeat(2100)}), null);
});
