import LugarClient from "./LugarClient";
import { getLugarDetail } from "@/lib/detail-data";

export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LugarClient key={slug} initialData={await getLugarDetail(slug)} />;
}
