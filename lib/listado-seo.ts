export type ParametrosListado = Record<string, string | string[] | undefined>;

export function seoListado(ruta: "/eventos" | "/colaboradores") {
  // Los filtros públicos comparten canonical con el listado sin parámetros.
  return {
    canonical: new URL(ruta, "https://www.monumentosllenos.com").href,
    index: true,
  };
}
