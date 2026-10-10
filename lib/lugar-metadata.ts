import type { Metadata } from "next";

const BASE_URL = "https://www.monumentosllenos.com";
type LugarMetadata = {
  nombre?: string | null;
  ciudad?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
};

function textoLimpio(texto?: string | null) {
  return (texto || "").replace(/<[^>]*>/g, " ").replace(/https?:\/\/\S+/g, "")
    .replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
}

export function metadataLugar(lugar: LugarMetadata, slug: string): Metadata {
  const nombre = textoLimpio(lugar.nombre) || "Lugar";
  const ciudad = textoLimpio(lugar.ciudad);
  const title = ciudad && !nombre.toLocaleLowerCase("es").includes(ciudad.toLocaleLowerCase("es"))
    ? `${nombre} en ${ciudad}` : nombre;
  const texto = textoLimpio(lugar.descripcion) || `Descubre ${title}: fotos, experiencias de visitantes e información para preparar tu visita.`;
  const description = texto.length > 160 ? texto.slice(0, 157).replace(/\s+\S*$/, "") + "…" : texto;
  const canonical = `${BASE_URL}/lugar/${encodeURIComponent(slug)}`;
  let imagen: string | undefined;
  try {
    if (lugar.imagen) {
      const url = new URL(lugar.imagen, BASE_URL);
      if (url.protocol === "https:" || url.protocol === "http:") imagen = url.href;
    }
  } catch { /* Una imagen inválida no impide mostrar la ficha. */ }
  return {
    title, description,
    alternates: { canonical },
    openGraph: {
      title, description, url: canonical, siteName: "Lugares Llenos",
      locale: "es_ES", type: "website",
      images: imagen ? [{ url: imagen, alt: nombre }] : [],
    },
    twitter: {
      card: imagen ? "summary_large_image" : "summary",
      title, description, images: imagen ? [imagen] : [],
    },
  };
}
