const { test } = require("node:test");
const assert = require("node:assert/strict");
const { leerFiltrosEventos } = require("../lib/eventos-filters.ts");
const id = "bc0e941e-c0ba-4fe0-80bb-157671cf832b";

test("ignora colaboradores mal formados sin perder otros filtros", () => {
  for (const value of ["prueba", "null", "123", id + "x", id.slice(1), "{ " + id + "}"]) {
    const params = new URLSearchParams({ colaborador: value, ciudad: "Barcelona", tipo: "Concierto", pagina: "2" });
    const filters = leerFiltrosEventos(params);
    params.delete("colaborador");
    assert.deepEqual(filters, leerFiltrosEventos(params));
  }
});

test("conserva UUID válidos y normaliza variantes aceptadas", () => {
  for (const value of [id, id.toUpperCase(), ` ${id} `, `{${id}}`, id.replaceAll("-", "")]) {
    assert.equal(leerFiltrosEventos(new URLSearchParams({ colaborador: value })).colaborador, id);
  }
  assert.equal(leerFiltrosEventos(new URLSearchParams()).colaborador, "");
  assert.equal(leerFiltrosEventos(new URLSearchParams("colaborador=prueba&colaborador=" + id)).colaborador, "");
});


test("el fin de semana conserva filtros, página y colaborador en enlaces compartidos", () => {
  const filters = leerFiltrosEventos(new URLSearchParams({ periodo: "fin-de-semana", ciudad: "Madrid", tipo: "Concierto", colaborador: id, pagina: "2" }));
  assert.equal(filters.periodo, "fin-de-semana");
  assert.equal(filters.ciudad, "Madrid");
  assert.equal(filters.tipo, "Concierto");
  assert.equal(filters.colaborador, id);
  assert.equal(filters.pagina, 2);
  assert.equal(leerFiltrosEventos(new URLSearchParams("periodo=desconocido")).periodo, "");
  assert.equal(leerFiltrosEventos(new URLSearchParams("fecha=2026-10-08&periodo=fin-de-semana")).periodo, "");
});
