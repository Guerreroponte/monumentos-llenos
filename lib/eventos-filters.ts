export function leerFiltrosEventos(params: URLSearchParams) {
  const colaborador = params.get("colaborador")?.trim() || "";
  const texto = params.get("q") || "";
  const fechaParam = params.get("fecha") || "";
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(fechaParam) ? fechaParam : "";
  const ciudad = params.get("ciudad")?.trim() || "";
  const tipo = params.get("tipo")?.trim() || "";
  const proximos = params.get("proximos") !== "0";
  const vistaParam = params.get("vista");
  const vista: "grandes" | "locales" | "todos" = vistaParam === "grandes" || vistaParam === "locales" ? vistaParam : "todos";
  const paginaParam = Number(params.get("pagina") || "1");
  const pagina = Number.isSafeInteger(paginaParam) && paginaParam > 0 ? paginaParam : 1;
  const clave = JSON.stringify([texto, fecha, ciudad, tipo, proximos, vista, colaborador]);
  return { colaborador, texto, fecha, ciudad, tipo, proximos, vista, pagina, clave };
}
