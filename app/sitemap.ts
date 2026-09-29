import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// Fuerza a generar el sitemap siempre con los datos actuales de Supabase
export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 1000;

type RegistroBasico = {
  slug: string | null;
  created_at: string | null;
};

type EventoSitemap = RegistroBasico & {
  fecha_inicio: string | null;
  fecha_fin: string | null;
};

async function obtenerTodos(tabla: string): Promise<RegistroBasico[]> {
  let todos: RegistroBasico[] = [];
  let desde = 0;

  while (true) {
    const { data, error } = await supabase
      .from(tabla)
      .select("slug, created_at")
      .order("created_at", { ascending: true })
      .range(desde, desde + PAGE_SIZE - 1);

    if (error) {
      console.error(`Error cargando ${tabla} para sitemap:`, error);
      break;
    }

    if (!data || data.length === 0) {
      break;
    }

    todos = [...todos, ...data];

    if (data.length < PAGE_SIZE) {
      break;
    }

    desde += PAGE_SIZE;
  }

  return todos;
}

async function obtenerEventos(): Promise<EventoSitemap[]> {
  let todos: EventoSitemap[] = [];
  let desde = 0;

  while (true) {
    const { data, error } = await supabase
      .from("eventos")
      .select("slug, created_at, fecha_inicio, fecha_fin")
      .order("created_at", { ascending: true })
      .range(desde, desde + PAGE_SIZE - 1);

    if (error) {
      console.error("Error cargando eventos para sitemap:", error);
      break;
    }

    if (!data || data.length === 0) {
      break;
    }

    todos = [...todos, ...data];

    if (data.length < PAGE_SIZE) {
      break;
    }

    desde += PAGE_SIZE;
  }

  return todos;
}

function obtenerFechaHoyMadrid(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.monumentosllenos.com";
  const hoy = obtenerFechaHoyMadrid();

  const [eventos, lugares] = await Promise.all([
    obtenerEventos(),
    obtenerTodos("Monumentos"),
  ]);

  const eventosUrls: MetadataRoute.Sitemap = eventos
    .filter((evento) => {
      if (!evento.slug) return false;

      // Evento con fecha fin: se mantiene mientras no haya terminado
      if (evento.fecha_fin) {
        return evento.fecha_fin >= hoy;
      }

      // Evento de un solo día o sin fecha_fin
      return Boolean(
        evento.fecha_inicio && evento.fecha_inicio >= hoy
      );
    })
    .map((evento) => ({
      url: `${baseUrl}/eventos/${evento.slug}`,
      lastModified: evento.created_at
        ? new Date(evento.created_at)
        : undefined,
    }));

  const lugaresUrls: MetadataRoute.Sitemap = lugares
    .filter((lugar) => lugar.slug)
    .map((lugar) => ({
      url: `${baseUrl}/lugar/${lugar.slug}`,
      lastModified: lugar.created_at
        ? new Date(lugar.created_at)
        : undefined,
    }));

  return [
    {
      url: baseUrl,
    },
    {
      url: `${baseUrl}/eventos`,
    },
    {
      url: `${baseUrl}/participa`,
    },
    ...eventosUrls,
    ...lugaresUrls,
  ];
}