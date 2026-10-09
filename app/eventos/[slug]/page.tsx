import EventoClient from "./EventoClient";
import { getEventoDetail } from "@/lib/detail-data";
import { regresoEventos } from "@/lib/eventos-navigation";

export const revalidate = 60;

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ volver?: string | string[] }> }) {
  const { slug } = await params;
  const regreso = regresoEventos((await searchParams).volver);
  return <EventoClient key={slug} regreso={regreso} initialData={await getEventoDetail(slug)} />;
}
