import type { Metadata } from "next";

const BASE_URL = "https://www.monumentosllenos.com";

export const metadata: Metadata = {
  title: {
    absolute:
      "Qué hacer en España: eventos y planes | Lugares Llenos",
  },

  description:
    "Descubre qué hacer en España: conciertos, eventos, planes, lugares y salas por ciudades. Encuentra propuestas actualizadas en Lugares Llenos.",

  alternates: {
    canonical: `${BASE_URL}/que-hacer`,
  },

  openGraph: {
    title:
      "Qué hacer en España: eventos y planes | Lugares Llenos",
    description:
      "Descubre qué hacer en España: conciertos, eventos, planes, lugares y salas por ciudades. Encuentra propuestas actualizadas en Lugares Llenos.",
    url: `${BASE_URL}/que-hacer`,
    siteName: "Lugares Llenos",
    type: "website",
    locale: "es_ES",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Qué hacer en España: eventos y planes | Lugares Llenos",
    description:
      "Descubre qué hacer en España: conciertos, eventos, planes, lugares y salas por ciudades. Encuentra propuestas actualizadas en Lugares Llenos.",
  },
};

export default function QueHacerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}