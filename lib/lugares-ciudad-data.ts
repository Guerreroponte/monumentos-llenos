import "server-only";
import { publicServer } from "./supabase-public-server";
import { nombresLugaresCiudad } from "./ciudades-con-lugares";

type Lugar = {
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

export async function cargarLugaresCiudad(
  ciudad: string,
  mostrarTodos = false
): Promise<{ items: Lugar[]; total: number }> {
  const nombres = await nombresLugaresCiudad(ciudad);
  if (!nombres.length) return { items: [], total: 0 };

  const items: Lugar[] = [];
  const tamano = mostrarTodos ? 1000 : 8;
  let total = 0;
  for (let desde = 0; ; desde += tamano) {
    const { data, error, count } = await publicServer
      .from("Monumentos")
      .select("id,nombre,slug,ciudad,imagen,imagen_fullback,descripcion,rating,rating_fuente", { count: "exact" })
      .eq("reportado", false)
      .in("ciudad", nombres)
      .order("created_at", { ascending: false })
      .order("id", { ascending: true })
      .range(desde, desde + tamano - 1);
    // No presentar un fallo como una ciudad vacía o una lista completa.
    if (error) throw error;
    const pagina = (data || []) as Lugar[];
    total = count ?? 0;
    items.push(...pagina);
    if (!mostrarTodos || pagina.length < tamano || items.length >= total) break;
  }
  return { items, total };
}
