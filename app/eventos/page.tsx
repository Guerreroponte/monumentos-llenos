import type { Metadata } from "next";
import { getEventosInitialData } from "@/lib/eventos-data";
import { leerFiltrosEventos } from "@/lib/eventos-filters";
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

export default async function EventosPage({ searchParams }: Props) {
  const values = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first !== undefined) params.set(key, first);
  }
  const initialFilters = leerFiltrosEventos(params);
  const initialData = await getEventosInitialData(initialFilters.colaborador);
  return <EventosClient key={params.toString()} initialData={initialData} initialFilters={initialFilters} />;
}
