// Acepta los formatos UUID de PostgreSQL y devuelve el formato canónico.
export function normalizarColaborador(valor: string | null) {
  const texto = (valor || "").trim();
  const sinLlaves = texto.startsWith("{") && texto.endsWith("}") ? texto.slice(1, -1) : texto;
  if (!/^[0-9a-f]{4}(?:-?[0-9a-f]{4}){7}$/i.test(sinLlaves)) return "";
  const hex = sinLlaves.replace(/-/g, "").toLowerCase();
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function leerFiltrosEventos(params: URLSearchParams) {
  const colaborador = normalizarColaborador(params.get("colaborador"));
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
