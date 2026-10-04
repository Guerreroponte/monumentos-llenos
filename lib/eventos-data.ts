import "server-only";
import { unstable_cache } from "next/cache";
import { publicServer } from "./supabase-public-server";

export type EventoDB = {
  id: string;
  colaborador_id?: string | null;
  slug?: string | null;
  created_at?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  tipo?: string | null;
  subtipo?: string | null;
  categoria_evento?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  hora_inicio?: string | null;
  hora_fin?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
  enlace?: string | null;
  destacado?: boolean | null;
  ubicacion_detalle?: string | null;
  precio?: string | null;
  ambiente?: string | null;
  dificil_bebida?: boolean | null;
  parking?: boolean | null;
  recomendable?: boolean | null;
};

export type ComentarioEventoDB = {
  id: string;
  evento_id: string;
};

export type CategoriaEvento = "grande" | "local";

export type EventoUI = {
  id: string;
  colaboradorId: string | null;
  slug: string;
  createdAt: string | null;
  nombre: string;
  ciudad: string;
  provincia: string;
  comunidad: string;
  tipo: string;
  subtipo: string;
  categoriaEvento: CategoriaEvento;
  fechaInicio: string | null;
  fechaFin: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  descripcion: string;
  imagen: string;
  enlace: string;
  destacado: boolean;
  ubicacionDetalle: string;
  precio: string;
  ambiente: string;
  dificilBebida: boolean;
  parking: boolean;
  recomendable: boolean;
  comentariosCount: number;
};

const FALLBACKS_EVENTOS = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
];

function getFallbackImagen(id: string) {
  const index =
    Math.abs(
      id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % FALLBACKS_EVENTOS.length;

  return FALLBACKS_EVENTOS[index];
}

function normalizarTexto(valor?: string | null) { return (valor ?? "").trim(); }

// Cache bounded batches: the full catalogue exceeds Next's 2 MB cache entry limit.
const BATCH_SIZE = 500;
const getEventBatch = unstable_cache(async (colaborador: string, offset: number) => {
  let query = publicServer.from("eventos").select("id,colaborador_id,slug,created_at,nombre,ciudad,provincia,comunidad_autonoma,tipo,subtipo,categoria_evento,fecha_inicio,fecha_fin,hora_inicio,hora_fin,descripcion,imagen,enlace,destacado,ubicacion_detalle,precio,ambiente,dificil_bebida,parking,recomendable")
    .order("fecha_inicio", { ascending: true }).order("id", { ascending: true })
    .range(offset, offset + BATCH_SIZE - 1);
  if (colaborador) query = query.eq("colaborador_id", colaborador);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as EventoDB[];
}, ["eventos-batch-v1"], { revalidate: 60 });

const getCommentCounts = unstable_cache(async () => {
  const { data, error } = await publicServer.from("comentarios_eventos").select("id, evento_id");
  if (error) throw error;
  return (data || []) as ComentarioEventoDB[];
}, ["eventos-comment-counts-v1"], { revalidate: 60 });

const getCollaboratorName = unstable_cache(async (id: string) => {
  if (!id) return "";
  const { data, error } = await publicServer.from("colaboradores").select("nombre").eq("id", id).maybeSingle();
  if (error) throw error;
  return normalizarTexto(data?.nombre) || "este colaborador";
}, ["eventos-collaborator-name-v1"], { revalidate: 60 });

async function getAllEvents(colaborador: string) {
  const result: EventoDB[] = [];
  let offset = 0;
  while (true) {
    const batch = await getEventBatch(colaborador, offset);
    result.push(...batch);
    if (batch.length < BATCH_SIZE) return result;
    offset += batch.length;
  }
}

export async function getEventosInitialData(colaboradorParam: string) {
  const [eventosData, comentariosData, nombreColaborador] = await Promise.all([
    getAllEvents(colaboradorParam), getCommentCounts(), getCollaboratorName(colaboradorParam),
  ]);

      const comentariosPorEvento = new Map<string, number>();

      ((comentariosData as ComentarioEventoDB[] | null) ?? []).forEach((comentario) => {
        const actual = comentariosPorEvento.get(comentario.evento_id) ?? 0;
        comentariosPorEvento.set(comentario.evento_id, actual + 1);
      });

      const eventosMapeados: EventoUI[] = ((eventosData as EventoDB[] | null) ?? []).map(
        (e) => ({
          id: e.id,
          colaboradorId: e.colaborador_id ?? null,
          slug: normalizarTexto(e.slug) || e.id,
          createdAt: e.created_at ?? null,
          nombre: normalizarTexto(e.nombre) || "Evento sin nombre",
          ciudad: normalizarTexto(e.ciudad) || "Ciudad por confirmar",
          provincia: normalizarTexto(e.provincia),
          comunidad: normalizarTexto(e.comunidad_autonoma),
          tipo: normalizarTexto(e.tipo) || "Evento",
          subtipo: normalizarTexto(e.subtipo),
          categoriaEvento: e.categoria_evento === "local" ? "local" : "grande",
          fechaInicio: e.fecha_inicio ?? null,
          fechaFin: e.fecha_fin ?? null,
          horaInicio: e.hora_inicio ?? null,
          horaFin: e.hora_fin ?? null,
          descripcion:
            normalizarTexto(e.descripcion) ||
            "Consulta este evento y descubre más detalles sobre el ambiente de la zona.",
          imagen: normalizarTexto(e.imagen) || getFallbackImagen(e.id),
          enlace: normalizarTexto(e.enlace),
          destacado: Boolean(e.destacado),
          ubicacionDetalle: normalizarTexto(e.ubicacion_detalle),
          precio: normalizarTexto(e.precio),
          ambiente: normalizarTexto(e.ambiente),
          dificilBebida: Boolean(e.dificil_bebida),
          parking: Boolean(e.parking),
          recomendable: e.recomendable !== false,
          comentariosCount: comentariosPorEvento.get(e.id) ?? 0,
        })
      );

  return { eventos: eventosMapeados, nombreColaborador };
}
