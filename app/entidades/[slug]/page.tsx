import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntidad } from "@/lib/entidades-data";

export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
const base = "https://www.monumentosllenos.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entidad = await getEntidad((await params).slug);
  if (!entidad) notFound();
  const title = `${entidad.nombre} | Entidades colaboradoras`;
  const url = `${base}/entidades/${entidad.slug}`;
  return { title, description: entidad.descripcion_corta, alternates: { canonical: url },
    openGraph: { title, description: entidad.descripcion_corta, url, type: "website", siteName: "Lugares Llenos", locale: "es_ES", images: [{ url: entidad.logo_url, alt: entidad.nombre }] },
    twitter: { card: "summary", title, description: entidad.descripcion_corta, images: [entidad.logo_url] } };
}

export default async function EntidadPage({ params }: Props) {
  const entidad = await getEntidad((await params).slug);
  if (!entidad) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Organization",
    "@id": `${base}/entidades/${entidad.slug}#organization`, name: entidad.nombre,
    url: entidad.web_url, logo: entidad.logo_url, description: entidad.descripcion,
    sameAs: entidad.instagram_url ? [entidad.instagram_url] : [] };
  return <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white px-4 py-14 text-slate-900 sm:px-6">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <article className="mx-auto max-w-4xl">
      <Link href="/colaboradores#entidades" className="font-bold text-orange-700">← Entidades y colaboradores</Link>
      <div className="mt-8 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-orange-700">Entidades e instituciones colaboradoras</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entidad.logo_url} alt={`Logo de ${entidad.nombre}`} width={320} height={180} className="mt-8 h-44 w-full max-w-xs object-contain object-left" />
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">{entidad.nombre}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{entidad.descripcion_corta}</p>
        <h2 className="mt-8 text-2xl font-bold">Sobre la entidad</h2>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-700">{entidad.descripcion}</p>
        <nav aria-label="Enlaces oficiales" className="mt-8 flex flex-wrap gap-4">
          <a href={entidad.web_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">Web oficial ↗</a>
          {entidad.instagram_url && <a href={entidad.instagram_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-orange-200 px-5 py-3 font-bold text-orange-800">Instagram ↗</a>}
        </nav>
      </div>
    </article>
  </main>;
}
