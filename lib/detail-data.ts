import "server-only";
import { publicImage } from "./public-images";
import { cache } from "react";
import { notFound } from "next/navigation";
import { publicServer } from "./supabase-public-server";
import type { Lugar, Resena } from "@/app/lugar/[slug]/LugarClient";
import type { Evento, Comentario, ColaboradorEvento } from "@/app/eventos/[slug]/EventoClient";

export const getEvento = cache(async (slug: string): Promise<Evento | null> => {
  const { data, error } = await publicServer.from("eventos").select("id,slug,nombre,ciudad,ubicacion_detalle,fecha_inicio,fecha_fin,hora_inicio,hora_fin,descripcion,imagen,enlace,fever_url_afiliado,tipo,subtipo,categoria_evento,precio,ambiente,dificil_bebida,parking,recomendable,colaborador_id,creado_por,video_url").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
});

export async function getEventoDetail(slug: string) {
  const evento = await getEvento(slug);
  if (!evento) notFound();
  const [comments, collaborator] = await Promise.all([
    publicServer.from("comentarios_eventos").select("id,texto,autor,created_at,foto,video_url").eq("evento_id", evento.id).order("created_at", { ascending: false }),
    evento.colaborador_id
      ? publicServer.from("colaboradores").select("id, slug, nombre, categoria_colaborador, logo, logo_url").eq("id", evento.colaborador_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);
  if (comments.error) throw comments.error;
  if (collaborator.error) throw collaborator.error;
  return { evento, comentarios: (comments.data || []) as Comentario[], colaborador: collaborator.data as ColaboradorEvento | null };
}

export async function getLugarDetail(slug: string) {
  const { data, error } = await publicServer.from("Monumentos").select("id,slug,nombre,ciudad,descripcion,imagen,url_afiliado,video_url,rating,precio,acepta_mascotas,parking_cerca,acceso_coche,latitud,longitud").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!data) notFound();
  const lugar = { ...data, imagen: publicImage("lugares", data.id, data.imagen) } as Lugar;
  const comments = await publicServer.from("resenas").select("id,monumento_id,usuario,comentario,foto,video_url,created_at,likes,reportado").eq("monumento_id", lugar.id)
    .or("reportado.is.null,reportado.eq.false").order("created_at", { ascending: false });
  if (comments.error) throw comments.error;
  return { lugar, resenas: ((comments.data || []) as Resena[]).map(row => ({ ...row, foto: publicImage("resenas", row.id, row.foto) })) };
}
