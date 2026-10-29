import { claveCiudad } from "./ciudad-identidad.ts";

// Rondas por ciudad, conservando el orden original dentro de cada ciudad.
// Se aplica al catálogo completo antes de paginar: no se pierde ningún lugar.
export function intercalarCiudades<T extends { ciudad?: string | null }>(lugares: readonly T[]): T[] {
  const grupos = new Map<string, T[]>();
  for (const lugar of lugares) {
    const clave = claveCiudad(lugar.ciudad);
    const grupo = grupos.get(clave) || [];
    grupo.push(lugar);
    grupos.set(clave, grupo);
  }
  const resultado: T[] = [];
  for (let ronda = 0; resultado.length < lugares.length; ronda++) {
    for (const grupo of grupos.values()) {
      if (ronda < grupo.length) resultado.push(grupo[ronda]);
    }
  }
  return resultado;
}
