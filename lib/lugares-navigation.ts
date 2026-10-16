// Solo se aceptan destinos del listado local, nunca direcciones externas.
export function regresoLugares(valor?: string | string[]): string {
  if (typeof valor !== "string" || !/^\/(?:\?|#|$)/.test(valor)) return "/";
  try {
    const url = new URL(valor, "https://local.invalid");
    if (url.origin !== "https://local.invalid" || url.pathname !== "/") return "/";
    const params = new URLSearchParams();
    for (const key of ["lugar", "ciudad", "paginaLugares"]) {
      const value = url.searchParams.get(key);
      if (value) params.set(key, value);
    }
    const hash = /^#lugar-(?:lista|destacado|alternativa)-[a-zA-Z0-9-]+$/.test(url.hash) ? url.hash : "#lugares";
    return `/${params.size ? `?${params}` : ""}${hash}`;
  } catch {
    return "/";
  }
}

export function enlaceFichaLugar(slug: string, nombre: string, ciudad: string, pagina: number, ancla: string): string {
  const params = new URLSearchParams();
  if (nombre) params.set("lugar", nombre);
  if (ciudad) params.set("ciudad", ciudad);
  if (pagina > 1) params.set("paginaLugares", String(pagina));
  const regreso = regresoLugares(`/${params.size ? `?${params}` : ""}#${ancla}`);
  return `/lugar/${encodeURIComponent(slug)}?volver=${encodeURIComponent(regreso)}`;
}
