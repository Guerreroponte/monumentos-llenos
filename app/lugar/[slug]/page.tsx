import { regresoLugares } from "@/lib/lugares-navigation";
import type { Metadata } from "next";
import LugarClient from "./LugarClient";
import { getLugarDetail } from "@/lib/detail-data";
import { metadataLugar } from "@/lib/lugar-metadata";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { lugar, fotos } = await getLugarDetail(slug);
  return metadataLugar({ ...lugar, imagen: lugar.imagen || fotos[0] }, slug);
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ volver?: string | string[] }> }) {
  const { slug } = await params;
  return <LugarClient regreso={regresoLugares((await searchParams).volver)} key={slug} initialData={await getLugarDetail(slug)} />;
}
