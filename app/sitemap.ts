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

type CiudadEvento = {
  ciudad: string | null;
};

type CiudadLugar = {
  ciudad: string | null;
};

async function obtenerTodos(
  tabla: string
): Promise<RegistroBasico[]> {
  let todos: RegistroBasico[] = [];
  let desde = 0;

  while (true) {
    let query = supabase
      .from(tabla)
      .select("slug, created_at");
    if (tabla === "Monumentos") query = query.or("reportado.is.null,reportado.eq.false");
    const { data, error } = await query
      .order("created_at", { ascending: true })
      .range(desde, desde + PAGE_SIZE - 1);

    if (error) {
      console.error(
        `Error cargando ${tabla} para sitemap:`,
        error
      );
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
      .select(
        "slug, created_at, fecha_inicio, fecha_fin"
      )
      .or("reportado.is.null,reportado.eq.false")
      .order("created_at", { ascending: true })
      .range(desde, desde + PAGE_SIZE - 1);

    if (error) {
      console.error(
        "Error cargando eventos para sitemap:",
        error
      );
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

async function obtenerColaboradores(): Promise<
  RegistroBasico[]
> {
  let todos: RegistroBasico[] = [];
  let desde = 0;

  while (true) {
    const { data, error } = await supabase
      .from("colaboradores")
      .select("slug, created_at")
      .eq("destacado", true)
      .not("slug", "is", null)
      .order("created_at", { ascending: true })
      .range(desde, desde + PAGE_SIZE - 1);

    if (error) {
      console.error(
        "Error cargando colaboradores para sitemap:",
        error
      );
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

function normalizarCiudad(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function obtenerCiudadesQueHacer(): Promise<
  string[]
> {
  const hoy = obtenerFechaHoyMadrid();
  const ciudades = new Set<string>();

  // Ciudades con eventos futuros válidos
  let desdeEventos = 0;

  while (true) {
    const { data, error } = await supabase
      .from("eventos")
      .select("ciudad")
      .eq("validado", true)
      .eq("reportado", false)
      .gte("fecha_inicio", hoy)
      .order("fecha_inicio", { ascending: true })
      .range(
        desdeEventos,
        desdeEventos + PAGE_SIZE - 1
      );

    if (error) {
      console.error(
        "Error cargando ciudades de eventos:",
        error
      );
      break;
    }

    if (!data || data.length === 0) {
      break;
    }

    const pagina = data as CiudadEvento[];

    for (const evento of pagina) {
      if (evento.ciudad) {
        const slugCiudad = normalizarCiudad(
          evento.ciudad
        );

        if (slugCiudad) {
          ciudades.add(slugCiudad);
        }
      }
    }

    if (pagina.length < PAGE_SIZE) {
      break;
    }

    desdeEventos += PAGE_SIZE;
  }

  // Ciudades con lugares reales
  let desdeLugares = 0;

  while (true) {
    const { data, error } = await supabase
      .from("Monumentos")
      .select("ciudad")
      .eq("reportado", false)
      .order("created_at", { ascending: true })
      .range(
        desdeLugares,
        desdeLugares + PAGE_SIZE - 1
      );

    if (error) {
      console.error(
        "Error cargando ciudades de lugares:",
        error
      );
      break;
    }

    if (!data || data.length === 0) {
      break;
    }

    const pagina = data as CiudadLugar[];

    for (const lugar of pagina) {
      if (lugar.ciudad) {
        const slugCiudad = normalizarCiudad(
          lugar.ciudad
        );

        if (slugCiudad) {
          ciudades.add(slugCiudad);
        }
      }
    }

    if (pagina.length < PAGE_SIZE) {
      break;
    }

    desdeLugares += PAGE_SIZE;
  }

  return Array.from(ciudades).sort();
}

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const baseUrl =
    "https://www.monumentosllenos.com";

  const hoy = obtenerFechaHoyMadrid();

  const [
    eventos,
    lugares,
    ciudades,
    colaboradores,
  ] = await Promise.all([
    obtenerEventos(),
    obtenerTodos("Monumentos"),
    obtenerCiudadesQueHacer(),
    obtenerColaboradores(),
  ]);

  const eventosUrls: MetadataRoute.Sitemap =
    eventos
      .filter((evento) => {
        if (!evento.slug) {
          return false;
        }

        // Evento con fecha fin:
        // permanece mientras no haya terminado
        if (evento.fecha_fin) {
          return evento.fecha_fin >= hoy;
        }

        // Evento de un solo día
        return Boolean(
          evento.fecha_inicio &&
            evento.fecha_inicio >= hoy
        );
      })
      .map((evento) => ({
        url: `${baseUrl}/eventos/${evento.slug}`,
        lastModified: evento.created_at
          ? new Date(evento.created_at)
          : undefined,
      }));

  const lugaresUrls: MetadataRoute.Sitemap =
    lugares
      .filter((lugar) => lugar.slug)
      .map((lugar) => ({
        url: `${baseUrl}/lugar/${lugar.slug}`,
        lastModified: lugar.created_at
          ? new Date(lugar.created_at)
          : undefined,
      }));

  const ciudadesUrls: MetadataRoute.Sitemap =
    ciudades.map((ciudad) => ({
      url: `${baseUrl}/que-hacer/${ciudad}`,
    }));

  const colaboradoresUrls: MetadataRoute.Sitemap =
    colaboradores
      .filter((colaborador) => colaborador.slug)
      .map((colaborador) => ({
        url: `${baseUrl}/colaboradores/${colaborador.slug}`,
        lastModified: colaborador.created_at
          ? new Date(colaborador.created_at)
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
      url: `${baseUrl}/que-hacer`,
    },
    {
      url: `${baseUrl}/colaboradores`,
    },
    {
      url: `${baseUrl}/participa`,
    },

    ...ciudadesUrls,
    ...colaboradoresUrls,
    ...eventosUrls,
    ...lugaresUrls,
  ];
}
