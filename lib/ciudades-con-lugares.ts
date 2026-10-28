import "server-only";
import { unstable_cache } from "next/cache";
import { publicServer } from "./supabase-public-server";
import { claveCiudad } from "./ciudad-identidad";

const cargarCiudades = unstable_cache(async () => {
  const ciudades = new Set<string>();
  const tamano = 500;
  for (let offset = 0; ; offset += tamano) {
    const { data, error } = await publicServer.from("Monumentos")
      .select("ciudad").or("reportado.is.null,reportado.eq.false")
      .order("id", { ascending: true }).range(offset, offset + tamano - 1);
    if (error) throw error;
    for (const lugar of data || []) {
      if (lugar.ciudad && claveCiudad(lugar.ciudad)) ciudades.add(lugar.ciudad);
    }
    if (!data || data.length < tamano) return [...ciudades];
  }
}, ["nombres-ciudades-con-lugares-v2"], { revalidate: 60 });

export async function ciudadesConLugares(): Promise<string[]> {
  try { return [...new Set((await cargarCiudades()).map(claveCiudad))]; }
  catch { return []; } // Una alternativa opcional nunca debe impedir mostrar la agenda.
}

// Conserva los valores originales para filtrar en SQL sin perder tildes o alias.
export async function nombresLugaresCiudad(ciudad: string): Promise<string[]> {
  const clave = claveCiudad(ciudad);
  if (!clave) return [];
  return (await cargarCiudades()).filter(nombre => claveCiudad(nombre) === clave);
}
