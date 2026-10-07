import type { Metadata } from "next";
import LugarClient from "./LugarClient";
import { getLugarDetail } from "@/lib/detail-data";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: { canonical: `https://www.monumentosllenos.com/lugar/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LugarClient key={slug} initialData={await getLugarDetail(slug)} />;
}
