import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://www.monumentosllenos.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: evento } = await supabase
    .from("eventos")
    .select("nombre, descripcion, imagen, ciudad, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (!evento) {
    return {
      title: "Evento | Lugares Llenos",
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
    title: `${evento.nombre} | Lugares Llenos`,
    description: descripcion,

    alternates: {
      canonical,
    },

    openGraph: {
      title: evento.nombre || "Evento | Lugares Llenos",
      description: descripcion,
      url: canonical,
      siteName: "Lugares Llenos",
      locale: "es_ES",
      type: "website",
      images: evento.imagen ? [evento.imagen] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: evento.nombre || "Evento | Lugares Llenos",
      description: descripcion,
      images: evento.imagen ? [evento.imagen] : [],
    },
  };
}

export default function EventoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}