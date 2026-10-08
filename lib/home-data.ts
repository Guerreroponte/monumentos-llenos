import { diaMadrid, eventoEnFecha, calendarioEvento } from "./agenda-ui";
import type { SupabaseClient } from "@supabase/supabase-js";
import { publicImage } from "./public-images";
import { supabase } from "./supabase";

export const SALAS_DESTACADAS_COLABORADORAS = [
  "Café La Palma",
  "Loco Club",
  "Harlem Jazz Club",
  "Cotton Club Bilbao",
  "Radio City",
  "Luz de Gas",
  "Marula Café",
  "Sala X",
  "Sala Clamores",
  "Intruso Bar",
  "Garaje Beat Club",
  "Milwaukee Puerto",
  "Tribeca Live",
  "Planta Baja",
  "Matisse Club",
  "Sala Even",
  "La Cueva del Jazz",
  "Sala Villanos",
  "Marearock",
  "Sala M100",
  "Independance Club",
  "La Cochera Cabaret",
  "Sala Galileo",
  "Alboroto Las Palmas",
  "Sala Repvblicca",
  "Moby Dick Club",
  "Jimmy Jazz",
  "Peter Rock Club",
  "Sala El Sol",
  "Círculo de Arte de Toledo",
  "Los Conciertos de la Muralla",
  "Teatro Eslava",
  "Rvbicón Bar",
  "Big Mama Ballroom",
  "Azkena Bilbo",
  "Sala Mardi Gras",
  "La Mecánica Live",
  "Sala Custom",
  "El Sótano Cultural",
  "MusikaBizi",
  "Zentral Pamplona",
  "La Chistera",
  "El Gran Café",
];

export type MonumentoDB = {
  id: string;
  created_at?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  rating?: number | null;
  precio?: string | null;
  imagen?: string | null;
  descripcion?: string | null;
  acepta_mascotas?: boolean | null;
  acceso_coche?: boolean | null;
  parking_cerca?: boolean | null;
  latitud?: number | null;
  longitud?: number | null;
  slug?: string | null;
  fuente?: string | null;
  es_seed?: boolean | null;
  reportado?: boolean | null;
};

export type ResenaDB = {
  id: string;
  monumento_id?: string | null;
  usuario?: string | null;
  comentario?: string | null;
  foto?: string | null;
  created_at?: string | null;
  likes?: number | null;
  reportado?: boolean | null;
};

export type LugarFotoDB = {
  id: string;
  lugar_id?: string | null;
  imagen?: string | null;
  orden?: number | null;
  created_at?: string | null;
};

export type MonumentoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  rating: number | null;
  precio: string;
  imagen?: string | null;
  descripcion?: string | null;
  created_at?: string | null;
  acepta_mascotas?: boolean | null;
  acceso_coche?: boolean | null;
  parking_cerca?: boolean | null;
  latitud?: number | null;
  longitud?: number | null;
  slug?: string | null;
  fuente?: string | null;
  es_seed?: boolean | null;
  reportado?: boolean | null;
  resenas: ResenaDB[];
  fotosLugar: string[];
};

export type ComentarioEventoUI = {
  id: string;
};

export type EventoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  imagen?: string | null;
  slug?: string | null;
  comentarios_eventos?: ComentarioEventoUI[];
};

export type ComentarioEventoFotoUI = {
  id: string;
  texto?: string | null;
  foto?: string | null;
  created_at?: string | null;
  eventos?:
    | {
        nombre?: string | null;
        ciudad?: string | null;
        slug?: string | null;
        tipo?: string | null;
      }
    | {
        nombre?: string | null;
        ciudad?: string | null;
        slug?: string | null;
        tipo?: string | null;
      }[]
    | null;
};

export type FotoRealUI = {
  id: string;
  origen: "evento" | "lugar";
  foto: string;
  texto: string;
  created_at?: string | null;
  nombre: string;
  ciudad: string;
  href: string;
  tipo?: string | null;
};

export type HeroItemUI = {
  id: string;
  origen: "foto-lugar" | "foto-evento" | "evento-futuro";
  imagen: string;
  nombre: string;
  ciudad: string;
  href: string;
  tipo?: string | null;
  fecha_inicio?: string | null;
};

export type FotoSeleccionada = {
  file: File;
  preview: string;
};

export type SalaDestacadaUI = {
  nombre: string;
  logo?: string | null;
  slug?: string | null;
};

export type PartnerExperienciaUI = {
  id: string;
  nombre: string;
  slug?: string | null;
  logo_url?: string | null;
  url: string;
  descripcion?: string | null;
  activo?: boolean | null;
  destacado?: boolean | null;
  orden?: number | null;
};

export type MarcaColaboradoraUI = {
  id: string;
  nombre: string;
  slug: string;
  logo_url?: string | null;
  web_url?: string | null;
  descripcion?: string | null;
  descripcion_corta?: string | null;
  color?: string | null;
  activa?: boolean | null;
  destacada?: boolean | null;
  orden?: number | null;
};

export async function cargarDatos(client: SupabaseClient = supabase) {

    const { data: monumentosData, error: errorMonumentos } = await client
      .from("Monumentos")
      .select("*")
      .order("created_at", { ascending: false });

    if (errorMonumentos) {
      console.error("Error cargando lugares:", errorMonumentos);
      throw errorMonumentos;
    }

    const monumentosBase = ((monumentosData || []) as MonumentoDB[]).filter(
      (m) => m.reportado !== true
    );

    const ids = monumentosBase.map((m) => m.id).filter(Boolean);

    let resenasData: ResenaDB[] = [];
    let lugaresFotosData: LugarFotoDB[] = [];

    if (ids.length > 0) {
      const [resenas, fotos] = await Promise.all([
        client.from("resenas")
          .select("id, monumento_id, usuario, comentario, foto, created_at, likes, reportado")
          .in("monumento_id", ids).order("created_at", { ascending: false }),
        client.from("lugares_fotos").select("id, lugar_id, imagen, orden, created_at")
          .in("lugar_id", ids).order("orden", { ascending: true }),
      ]);
      if (resenas.error) throw resenas.error;
      if (fotos.error) throw fotos.error;
      resenasData = ((resenas.data || []) as ResenaDB[]).filter(r => r.reportado !== true);
      lugaresFotosData = (fotos.data || []) as LugarFotoDB[];
    }

    const resenasPorMonumento = new Map<string, ResenaDB[]>();
    const fotosPorLugar = new Map<string, string[]>();

    for (const r of resenasData) {
      const monumentoId = r.monumento_id || "";
      if (!resenasPorMonumento.has(monumentoId)) {
        resenasPorMonumento.set(monumentoId, []);
      }
      resenasPorMonumento.get(monumentoId)!.push({ ...r, foto: publicImage("resenas", r.id, r.foto) });
    }

    for (const foto of lugaresFotosData) {
      const lugarId = foto.lugar_id || "";
      const imagen = foto.imagen || "";

      if (!lugarId || !imagen) continue;

      if (!fotosPorLugar.has(lugarId)) {
        fotosPorLugar.set(lugarId, []);
      }

      fotosPorLugar.get(lugarId)!.push(imagen);
    }

    const resultado: MonumentoUI[] = monumentosBase.map((m) => ({
      id: m.id,
      nombre: m.nombre || "Lugar sin nombre",
      ciudad: m.ciudad || "Ciudad no especificada",
      provincia: m.provincia || null,
      comunidad_autonoma: m.comunidad_autonoma || null,
      rating: typeof m.rating === "number" ? m.rating : null,
      precio: m.precio || "No especificado",
      imagen: publicImage("lugares", m.id, m.imagen),
      descripcion: m.descripcion || null,
      created_at: m.created_at || null,
      acepta_mascotas:
        typeof m.acepta_mascotas === "boolean" ? m.acepta_mascotas : null,
      acceso_coche:
        typeof m.acceso_coche === "boolean" ? m.acceso_coche : null,
      parking_cerca:
        typeof m.parking_cerca === "boolean" ? m.parking_cerca : null,
      latitud: typeof m.latitud === "number" ? m.latitud : null,
      longitud: typeof m.longitud === "number" ? m.longitud : null,
      slug: m.slug || null,
      fuente: m.fuente || null,
      es_seed: typeof m.es_seed === "boolean" ? m.es_seed : null,
      reportado: typeof m.reportado === "boolean" ? m.reportado : null,
      resenas: resenasPorMonumento.get(m.id) || [],
      fotosLugar: [...new Set(fotosPorLugar.get(m.id) || [])],
    }));

    return resultado;
  }

export async function cargarTotalEventosPublicados(client: SupabaseClient = supabase) {
    const { count, error } = await client
      .from("eventos")
      .select("id", { count: "exact", head: true })
      .eq("reportado", false);

    if (error) {
      console.error("Error cargando total de eventos:", error);
      throw error;
    }

    return count || 0;
  }

export async function cargarEventosHoy(client: SupabaseClient = supabase) {
    const hoy = diaMadrid();

    // Filtrar sesiones antes de limitar a seis; los primeros candidatos pueden
    // ser ciclos sin sesión hoy. Paginar evita el límite de filas del servidor.
    const resultado: EventoUI[] = [];
    const tamano = 100;
    for (let offset = 0; ; offset += tamano) {
      const { data, error } = await client
        .from("eventos")
        .select(`id,nombre,ciudad,fecha_inicio,fecha_fin,descripcion,tipo,imagen,slug,comentarios_eventos ( id )`)
        .lte("fecha_inicio", hoy)
        .or(`fecha_fin.gte.${hoy},and(fecha_fin.is.null,fecha_inicio.eq.${hoy})`)
        .eq("reportado", false)
        .order("created_at", { ascending: false })
        .order("id", { ascending: true })
        .range(offset, offset + tamano - 1);

      if (error) {
        console.error("Error cargando eventos de hoy:", error);
        throw error;
      }
      const candidatos = (data || []) as EventoUI[];
      resultado.push(...candidatos.filter((evento) =>
        eventoEnFecha(evento.fecha_inicio, evento.fecha_fin, hoy, calendarioEvento(evento.slug))
      ).map((evento) => ({ ...evento, comentarios_eventos: evento.comentarios_eventos || [] })));
      if (resultado.length >= 6 || candidatos.length < tamano) return resultado.slice(0, 6);
    }
  }

export async function cargarEventosProximosHero(client: SupabaseClient = supabase) {
    const hoy = new Date().toISOString().split("T")[0];

    const { data, error } = await client
      .from("eventos")
      .select(`
        id,
        nombre,
        ciudad,
        fecha_inicio,
        tipo,
        imagen,
        slug
      `)
      .gte("fecha_inicio", hoy)
      .eq("reportado", false)
      .not("imagen", "is", null)
      .order("fecha_inicio", { ascending: true })
      .limit(12);

    if (error) {
      console.error("Error cargando próximos eventos del hero:", error);
      throw error;
    }

    return (data || []) as EventoUI[];
  }

export async function cargarComentariosEventosConFoto(client: SupabaseClient = supabase) {
    const { data, error } = await client
      .from("comentarios_eventos")
      .select(`
        id,
        texto,
        foto,
        created_at,
        eventos (
          nombre,
          ciudad,
          slug,
          tipo
        )
      `)
      .not("foto", "is", null)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error cargando fotos de comentarios de eventos:", error);
      throw error;
    }

    return (data || []) as ComentarioEventoFotoUI[];
  }

export async function cargarLogosSalasDestacadas(client: SupabaseClient = supabase) {
    const { data, error } = await client
      .from("colaboradores")
      .select("nombre, logo, logo_url, slug")
      .in("nombre", SALAS_DESTACADAS_COLABORADORAS);

    if (error) {
      console.error("Error cargando logos de salas colaboradoras:", error);
      throw error;
    }

    const datosPorNombre = new Map<
      string,
      { logo: string | null; slug: string | null }
    >();

    for (const colaborador of data || []) {
      const nombre = colaborador.nombre as string | null;
      const logo =
        (colaborador.logo_url as string | null) ||
        (colaborador.logo as string | null) ||
        null;
      const slug = (colaborador.slug as string | null) || null;

      if (nombre) {
        datosPorNombre.set(nombre, { logo, slug });
      }
    }

    return SALAS_DESTACADAS_COLABORADORAS.map((nombre) => ({
        nombre,
        logo: datosPorNombre.get(nombre)?.logo || null,
        slug: datosPorNombre.get(nombre)?.slug || null,
      }))
    ;
  }

export async function cargarPartnersExperiencias(client: SupabaseClient = supabase) {
    const { data, error } = await client
      .from("partners_experiencias")
      .select("id, nombre, slug, logo_url, url, descripcion, activo, destacado, orden")
      .eq("activo", true)
      .eq("destacado", true)
      .order("orden", { ascending: true });

    if (error) {
      console.error("Error cargando partners de experiencias:", error);
      throw error;
    }

    return (data || []) as PartnerExperienciaUI[];
  }

export async function cargarMarcasColaboradoras(client: SupabaseClient = supabase) {
    const { data, error } = await client
      .from("marcas_colaboradoras")
      .select(
        "id, nombre, slug, logo_url, web_url, descripcion, descripcion_corta, color, activa, destacada, orden"
      )
      .eq("activa", true)
      .eq("destacada", true)
      .order("orden", { ascending: true });

    if (error) {
      console.error("Error cargando marcas colaboradoras:", error);
      throw error;
    }

    return (data || []) as MarcaColaboradoraUI[];
  }
