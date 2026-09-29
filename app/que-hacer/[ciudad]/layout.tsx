import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://www.monumentosllenos.com";
const PAGE_SIZE = 1000;

type Props = {
  children: React.ReactNode;
  params: Promise<{
    ciudad: string;
  }>;
};

type RegistroCiudad = {
  ciudad: string | null;
};

type TablaCiudad =
  | "eventos"
  | "Monumentos"
  | "colaboradores";

function normalizarCiudad(texto: string): string {
  return decodeURIComponent(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatearCiudadDesdeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() +
        palabra.slice(1)
    )
    .join(" ");
}

function limpiarCiudad(ciudad: string): string {
  return ciudad.replace(/\s+/g, " ").trim();
}

async function buscarCiudadEnTabla(
  tabla: TablaCiudad,
  ciudadSlug: string
): Promise<string | null> {
  let desde = 0;

  while (true) {
    let consulta = supabase
      .from(tabla)
      .select("ciudad")
      .not("ciudad", "is", null)
      .order("created_at", { ascending: true })
      .range(
        desde,
        desde + PAGE_SIZE - 1
      );

    // Solo usamos eventos válidos y no reportados
    if (tabla === "eventos") {
      consulta = consulta
        .eq("validado", true)
        .eq("reportado", false);
    }

    // Solo usamos lugares no reportados
    if (tabla === "Monumentos") {
      consulta = consulta.eq(
        "reportado",
        false
      );
    }

    const { data, error } = await consulta;

    if (error) {
      console.error(
        `Error buscando ciudad en ${tabla}:`,
        error
      );

      return null;
    }

    const registros =
      (data || []) as RegistroCiudad[];

    const coincidencia = registros.find(
      (registro) =>
        registro.ciudad &&
        normalizarCiudad(registro.ciudad) ===
          ciudadSlug
    );

    if (coincidencia?.ciudad) {
      return limpiarCiudad(
        coincidencia.ciudad
      );
    }

    if (registros.length < PAGE_SIZE) {
      break;
    }

    desde += PAGE_SIZE;
  }

  return null;
}

async function obtenerNombreRealCiudad(
  ciudadSlug: string
): Promise<string> {
  // Primero buscamos en eventos
  const ciudadEvento =
    await buscarCiudadEnTabla(
      "eventos",
      ciudadSlug
    );

  if (ciudadEvento) {
    return ciudadEvento;
  }

  // Después en lugares
  const ciudadLugar =
    await buscarCiudadEnTabla(
      "Monumentos",
      ciudadSlug
    );

  if (ciudadLugar) {
    return ciudadLugar;
  }

  // Y finalmente en colaboradores
  const ciudadColaborador =
    await buscarCiudadEnTabla(
      "colaboradores",
      ciudadSlug
    );

  if (ciudadColaborador) {
    return ciudadColaborador;
  }

  // Fallback:
  // si por cualquier motivo Supabase no devuelve
  // la ciudad, seguimos generando metadata válida
  // a partir del slug.
  return formatearCiudadDesdeSlug(
    ciudadSlug
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { ciudad } = await params;

  const ciudadSlug =
    normalizarCiudad(ciudad);

  const ciudadFormateada =
    await obtenerNombreRealCiudad(
      ciudadSlug
    );

  const canonical =
    `${BASE_URL}/que-hacer/${ciudadSlug}`;

  const title =
    `Qué hacer en ${ciudadFormateada}: eventos y planes | Lugares Llenos`;

  const description =
    `Descubre qué hacer en ${ciudadFormateada}: conciertos, eventos, planes, lugares y salas. Encuentra propuestas actualizadas en Lugares Llenos.`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Lugares Llenos",
      type: "website",
      locale: "es_ES",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CiudadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}