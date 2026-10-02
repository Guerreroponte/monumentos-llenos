import type { Metadata } from "next";
import EventosClient from "./EventosClient";
import { seoListado, type ParametrosListado } from "@/lib/listado-seo";

type Props = { searchParams: Promise<ParametrosListado> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const seo = seoListado("/eventos", await searchParams);
  return {
    title: "Eventos y planes en España",
    description: "Descubre próximos conciertos, fiestas, ferias, festivales y planes en España con Lugares Llenos.",
    alternates: { canonical: seo.canonical },
    robots: { index: seo.index, follow: true },
  };
}

export default function EventosPage() {
  return <EventosClient />;
}
