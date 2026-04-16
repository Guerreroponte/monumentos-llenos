import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://monumentosllenos.com";

  const { data: eventos } = await supabase
    .from("eventos")
    .select("slug, created_at");

  const { data: lugares } = await supabase
    .from("Monumentos")
    .select("slug, created_at");

  const eventosUrls =
    eventos
      ?.filter((evento) => evento.slug)
      .map((evento) => ({
        url: `${baseUrl}/eventos/${evento.slug}`,
        lastModified: evento.created_at ? new Date(evento.created_at) : new Date(),
      })) || [];

  const lugaresUrls =
    lugares
      ?.filter((lugar) => lugar.slug)
      .map((lugar) => ({
        url: `${baseUrl}/lugar/${lugar.slug}`,
        lastModified: lugar.created_at ? new Date(lugar.created_at) : new Date(),
      })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/participa`,
      lastModified: new Date(),
    },
    ...eventosUrls,
    ...lugaresUrls,
  ];
}