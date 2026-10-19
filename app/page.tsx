import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getHomeInitialData } from "@/lib/initial-data";

export const revalidate = 60;

const title = "Eventos, lugares y qué hacer en España | Lugares Llenos";
const description = "Descubre conciertos, eventos culturales y lugares que visitar en España. Explora el mapa y las guías por ciudades para organizar tu próximo plan.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "https://www.monumentosllenos.com" },
  openGraph: {
    title, description, url: "https://www.monumentosllenos.com",
    siteName: "Lugares Llenos", locale: "es_ES", type: "website",
  },
  twitter: { card: "summary", title, description },
};

export default async function HomePage() {
  return <HomeClient initialData={await getHomeInitialData()} />;
}
