import "server-only";
import { cache } from "react";
import { publicServer } from "./supabase-public-server";

export type Entidad = {
  id: string; slug: string; nombre: string; descripcion: string;
  descripcion_corta: string; logo_url: string; web_url: string;
  instagram_url: string | null; created_at: string;
};
const campos = "id,slug,nombre,descripcion,descripcion_corta,logo_url,web_url,instagram_url,created_at";

export async function getEntidades(): Promise<Entidad[]> {
  const entidades: Entidad[] = [];
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await publicServer.from("entidades_colaboradoras")
      .select(campos).eq("activa", true).order("orden").order("id").range(desde, desde + 999);
    if (error) throw new Error(`No se pudieron cargar las entidades: ${error.message}`);
    entidades.push(...(data || []));
    if (!data || data.length < 1000) return entidades;
  }
}

export const getEntidad = cache(async (slug: string): Promise<Entidad | null> => {
  const { data, error } = await publicServer.from("entidades_colaboradoras")
    .select(campos).eq("activa", true).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`No se pudo cargar la entidad: ${error.message}`);
  return data;
});
