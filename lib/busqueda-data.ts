import "server-only";
import { unstable_cache } from "next/cache";
import { publicServer } from "./supabase-public-server";
import { getCiudadesInitialData } from "./ciudades-data";
import { diaMadrid, eventoVigente, filtroEventosVigentes, compararAgenda } from "./agenda-ui";

export type FichaBusqueda = {
  id: string; nombre: string | null; slug: string | null; ciudad: string | null;
  tipo?: string | null; subtipo?: string | null; ubicacion_detalle?: string | null;
  fecha_inicio?: string | null; fecha_fin?: string | null; hora_inicio?: string | null; precio?: string | null;
};
const TAMANO = 500;
// Only public fields and anonymous permissions. Cache batches, never search strings.
const lote = unstable_cache(async (tabla: "eventos" | "Monumentos", desde: number, hoy: string) => {
  let query = publicServer.from(tabla).select(tabla === "eventos"
    ? "id,nombre,slug,ciudad,tipo,subtipo,ubicacion_detalle,fecha_inicio,fecha_fin,hora_inicio,precio"
    : "id,nombre,slug,ciudad")
    .eq("reportado", false).order("id").range(desde, desde + TAMANO - 1);
  if (tabla === "eventos") query = query.eq("validado", true).or(filtroEventosVigentes(hoy));
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as unknown as FichaBusqueda[];
}, ["busqueda-publica-lote-v1"], { revalidate: 60 });
async function catalogo(tabla: "eventos" | "Monumentos", hoy: string) {
  const items: FichaBusqueda[] = [];
  for (let desde = 0; ; desde += TAMANO) {
    const pagina = await lote(tabla, desde, hoy);
    items.push(...pagina);
    if (pagina.length < TAMANO) break;
  }
  const visibles = items.filter(item => item.nombre?.trim());
  return tabla === "eventos" ? visibles.filter(e => eventoVigente(e.fecha_inicio, e.fecha_fin, hoy))
    .sort((a, b) => compararAgenda({ inicio: a.fecha_inicio, fin: a.fecha_fin }, { inicio: b.fecha_inicio, fin: b.fecha_fin }, hoy))
    : visibles.sort((a, b) => a.nombre!.localeCompare(b.nombre!, "es"));
}
const ciudades = unstable_cache(getCiudadesInitialData, ["busqueda-ciudades-v1"], { revalidate: 60 });
export async function cargarBusqueda() {
  const hoy = diaMadrid();
  const [eventos, lugares, destinos] = await Promise.allSettled([catalogo("eventos", hoy), catalogo("Monumentos", hoy), ciudades()]);
  return { hoy, eventos, lugares, ciudades: destinos };
}
