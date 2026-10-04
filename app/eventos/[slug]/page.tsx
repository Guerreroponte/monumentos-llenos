import EventoClient from "./EventoClient";
import { getEventoDetail } from "@/lib/detail-data";

export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventoClient key={slug} initialData={await getEventoDetail(slug)} />;
}
