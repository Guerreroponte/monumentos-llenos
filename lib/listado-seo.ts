export type ParametrosListado = Record<string, string | string[] | undefined>;

export function seoListado(ruta: "/eventos" | "/colaboradores", parametros: ParametrosListado) {
  const url = new URL(ruta, "https://www.monumentosllenos.com");
  const claves = ruta === "/eventos"
    ? ["ciudad", "tipo", "q", "fecha", "colaborador", "vista", "proximos", "pagina"]
    : ["ciudad"];
  let filtrada = false;
  for (const clave of claves) {
    const valor = parametros[clave];
    const texto = (Array.isArray(valor) ? valor[0] : valor)?.trim() || "";
    if (!texto) continue;
    if (clave === "pagina") {
      const pagina = Number(texto);
      if (!Number.isSafeInteger(pagina) || pagina < 1) filtrada = true;
      else if (pagina > 1) url.searchParams.set(clave, String(pagina));
      continue;
    }
    if ((clave === "vista" && texto === "todos") || (clave === "proximos" && texto === "1")) continue;
    filtrada = true;
    url.searchParams.set(clave, texto);
  }
  return { canonical: url.href, index: !filtrada };
}
