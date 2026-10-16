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
      const ciudad = claveCiudad(lugar.ciudad);
      if (ciudad) ciudades.add(ciudad);
    }
    if (!data || data.length < tamano) return [...ciudades];
  }
}, ["ciudades-con-lugares-v1"], { revalidate: 60 });

export async function ciudadesConLugares(): Promise<string[]> {
  try { return await cargarCiudades(); }
  catch { return []; } // Una alternativa opcional nunca debe impedir mostrar la agenda.
}
