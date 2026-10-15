// Alias explícitos: no agrupar municipios distintos por coincidencias parciales.
const alias: Record<string, string> = {
  "palma": "Palma",
  "palma-de-mallorca": "Palma",
  "san-sebastian": "Donostia-San Sebastián",
  "donostia": "Donostia-San Sebastián",
  "donostia-san-sebastian": "Donostia-San Sebastián",
};
function clave(valor: string) {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export function nombreCiudad(valor?: string | null): string {
  const limpio = (valor || "").trim().replace(/\s+/g, " ");
  return alias[clave(limpio)] || limpio;
}
export function claveCiudad(valor?: string | null): string {
  return clave(nombreCiudad(valor));
}
