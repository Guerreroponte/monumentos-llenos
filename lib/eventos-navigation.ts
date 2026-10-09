// Solo admite la agenda propia; nunca URLs externas ni otras rutas.
export function regresoEventos(valor?: string | string[]) {
  if (typeof valor !== "string" || !/^\/eventos(?:[?#]|$)/.test(valor)) return "/eventos";
  try {
    const url = new URL(valor, "https://www.monumentosllenos.com");
    if (url.origin !== "https://www.monumentosllenos.com" || url.pathname !== "/eventos") return "/eventos";
    const params = new URLSearchParams();
    for (const clave of ["ciudad", "tipo", "q", "fecha", "periodo", "colaborador", "proximos", "vista", "pagina"]) {
      const contenido = url.searchParams.get(clave);
      if (contenido) params.set(clave, contenido);
    }
    return "/eventos" + (params.size ? "?" + params.toString() : "") + "#seccion-todos";
  } catch {
    return "/eventos";
  }
}
