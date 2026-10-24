import type { SupabaseClient } from "@supabase/supabase-js";
import { claveCiudad } from "./ciudad-identidad";

export type LugarCiudad = {
  id: string;
  nombre: string | null;
  slug: string | null;
  ciudad: string | null;
  imagen: string | null;
  imagen_fullback: string | null;
  descripcion: string | null;
  rating: number | null;
  rating_fuente?: string | null;
};

export async function cargarLugaresDeCiudad(
  client: SupabaseClient, ciudadNormalizada: string, mostrarTodos = false,
): Promise<{ items: LugarCiudad[]; total: number }> {
  const ids: string[] = [];
  // Match the existing accent/alias rules using only small identity fields.
  // Descriptions and photos are requested only for the selected city's cards.
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await client.from("Monumentos")
      .select("id,ciudad").eq("reportado", false)
      .order("created_at", { ascending: false }).order("id", { ascending: true })
      .range(desde, desde + 999);
    if (error) throw error;
    const pagina = data || [];
    ids.push(...pagina.filter(lugar => lugar.ciudad &&
      claveCiudad(decodeURIComponent(lugar.ciudad)) === ciudadNormalizada
    ).map(lugar => lugar.id as string));
    if (pagina.length < 1000) break;
  }

  const seleccionados = mostrarTodos ? ids : ids.slice(0, 8);
  const porId = new Map<string, LugarCiudad>();
  for (let desde = 0; desde < seleccionados.length; desde += 100) {
    const { data, error } = await client.from("lugares_publicos_ligeros")
      .select("id,nombre,slug,ciudad,imagen,imagen_fullback,descripcion,rating,rating_fuente")
      .eq("reportado", false).in("id", seleccionados.slice(desde, desde + 100));
    if (error) throw error;
    for (const lugar of (data || []) as LugarCiudad[]) porId.set(lugar.id, lugar);
  }
  return {
    items: seleccionados.flatMap(id => { const lugar = porId.get(id); return lugar ? [lugar] : []; }),
    total: ids.length,
  };
}
