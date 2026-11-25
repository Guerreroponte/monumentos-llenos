import Link from "next/link";
import type { Entidad } from "@/lib/entidades-data";

export default function EntidadesColaboradoras({ entidades }: { entidades: Entidad[] }) {
  if (!entidades.length) return null;
  return <section id="entidades" className="scroll-mt-28">
    <h2 className="text-2xl font-extrabold text-slate-950">Entidades e instituciones colaboradoras</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Organizaciones que trabajan por la cultura, el patrimonio y la participación ciudadana.</p>
    <div className="mt-5 grid gap-5 md:grid-cols-2">
      {entidades.map(entidad => <Link key={entidad.id} href={`/entidades/${entidad.slug}`} className="group flex items-center gap-5 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:border-orange-300 focus-visible:outline-2 focus-visible:outline-orange-600">
        {/* Logos oficiales con proporciones variables. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entidad.logo_url} alt={`Logo de ${entidad.nombre}`} width={112} height={96} className="h-24 w-28 shrink-0 object-contain" />
        <span className="min-w-0"><span className="block text-xl font-extrabold text-slate-900">{entidad.nombre}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{entidad.descripcion_corta}</span><span className="mt-3 block font-bold text-orange-700">Conocer la entidad →</span></span>
      </Link>)}
    </div>
  </section>;
}
