import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvento } from "@/lib/detail-data";

const BASE_URL = "https://www.monumentosllenos.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const evento = await getEvento(slug);

  if (!evento) {
    return {
      title: "Evento",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${BASE_URL}/eventos/${evento.slug}`;

  const descripcion =
    evento.descripcion ||
    `Descubre ${evento.nombre} en ${
      evento.ciudad || "Lugares Llenos"
    }.`;

  return {
    title: evento.nombre || "Evento",
    description: descripcion,

    alternates: {
      canonical,
    },

    openGraph: {
      title: evento.nombre || "Evento",
      description: descripcion,
      url: canonical,
      siteName: "Lugares Llenos",
      locale: "es_ES",
      type: "website",
      images: evento.imagen ? [evento.imagen] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: evento.nombre || "Evento",
      description: descripcion,
      images: evento.imagen ? [evento.imagen] : [],
    },
  };
}

export default async function EventoLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const evento = await getEvento(slug);

  if (!evento) {
    notFound();
  }

  return children;
}