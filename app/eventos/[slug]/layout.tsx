import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvento } from "@/lib/detail-data";

import { eventoJsonLd, serializarJsonLd } from "@/lib/evento-jsonld";
import { metadataEvento } from "@/lib/evento-metadata";

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

  return metadataEvento(evento, evento.slug || slug);
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

  const datos = eventoJsonLd(evento, evento.slug || slug);
  return <>
    {datos && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializarJsonLd(datos) }} />}
    {children}
  </>;
}