import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// Fuerza a generar el sitemap siempre con los datos actuales de Supabase
export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 1000;

async function obtenerTodos(
  tabla: string
): Promise<{ slug: string | null; created_at: string | null }[]> {
  let todos: { slug: string | null; created_at: string | null }[] = [];
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

    // Si devuelve menos de 1000, ya hemos llegado al final
    if (data.length < PAGE_SIZE) {
      break;
    }

    desde += PAGE_SIZE;
  }

  return todos;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://monumentosllenos.com";

  const [eventos, lugares] = await Promise.all([
    obtenerTodos("eventos"),
    obtenerTodos("Monumentos"),
  ]);

  const eventosUrls: MetadataRoute.Sitemap = eventos
    .filter((evento) => evento.slug)
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