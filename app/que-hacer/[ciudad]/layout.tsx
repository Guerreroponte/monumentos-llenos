import type { Metadata } from "next";

const BASE_URL = "https://www.monumentosllenos.com";

function formatearCiudadDesdeSlug(slug: string) {
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

type Props = {
  children: React.ReactNode;
  params: Promise<{
    ciudad: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { ciudad } = await params;

  const ciudadFormateada =
    formatearCiudadDesdeSlug(ciudad);

  const canonical =
    `${BASE_URL}/que-hacer/${ciudad}`;

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