import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Music2, Ticket, Users, Drama, Sparkles, ArrowUpRight } from "lucide-react";
import { ACCESOS_RAPIDOS, enlacePlan } from "@/lib/planes-rapidos";

const ciudades = [
  { nombre: "Madrid", slug: "madrid", foto: "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/lugares/1780304325961-1-faro-de-moncloa.jpg", lugar: "Faro de Moncloa", texto: "Miradores, barrios y música en directo" },
  { nombre: "Granada", slug: "granada", foto: "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/lugares/alhambra-oficial-editorial-20261013.jpg", lugar: "Alhambra", texto: "Patrimonio, miradores y una pausa de tapas" },
  { nombre: "San Sebastián", slug: "donostia-san-sebastian", foto: "/images/san-sebastian/santa-maria.webp", lugar: "Basílica de Santa María del Coro", texto: "Paseos por la Parte Vieja y cultura" },
  { nombre: "Palma", slug: "palma", foto: "/images/palma/catedral.jpg", lugar: "Catedral de Mallorca", texto: "Historia y rincones junto al Mediterráneo" },
  { nombre: "Lorca", slug: "lorca", foto: "/images/lugares/lorca/palacio-guevara.jpg", lugar: "Palacio de Guevara", texto: "Palacios y un casco histórico para caminar" },
  { nombre: "Barakaldo", slug: "barakaldo", foto: "/images/barakaldo/botanico.jpg", lugar: "Jardín Botánico Ramón Rubial", texto: "Jardines, patrimonio y agenda cultural" },
];
const iconos = { musica: Music2, entrada: Ticket, familia: Users, calendario: CalendarDays, teatro: Drama, festival: Sparkles };
export default function ExplorarBusqueda() {
  return <div className="mt-10 space-y-12 sm:mt-12">
    <section aria-labelledby="buscar-planes-titulo">
      <h2 id="buscar-planes-titulo" className="text-xl font-bold tracking-tight sm:text-2xl">¿Qué te apetece?</h2>
      <p className="mt-2 text-sm text-slate-600">Elige una idea y afina por ciudad o fecha en la agenda.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ACCESOS_RAPIDOS.map(plan => {
          const Icono = iconos[plan.icono];
          return <Link key={plan.nombre} href={enlacePlan(plan.filtro)} className="group flex min-h-28 flex-col items-start justify-between gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-600">
            <Icono aria-hidden="true" size={23} className="text-orange-600" />
            <span className="text-sm font-bold text-slate-800">{plan.nombre}</span>
          </Link>;
        })}
      </div>
    </section>
    <section aria-labelledby="buscar-ciudades-titulo">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Un punto de partida</p><h2 id="buscar-ciudades-titulo" className="mt-2 text-2xl font-bold tracking-tight">Explora por ciudad</h2></div>
        <Link href="/que-hacer" className="text-sm font-semibold text-orange-700 underline underline-offset-4">Ver todas las ciudades →</Link>
      </div>
      <p className="mt-3 text-sm text-slate-600">Seis destinos para empezar. Descubre sus lugares y qué hacer en cada uno.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ciudades.map(ciudad => <Link key={ciudad.slug} href={`/que-hacer/${ciudad.slug}`} className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:border-orange-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-orange-600">
          <div className="relative h-44 overflow-hidden bg-orange-100 sm:h-48">
            <Image src={ciudad.foto} alt={`${ciudad.lugar}, ${ciudad.nombre}`} fill unoptimized sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <h3 className="absolute bottom-4 left-5 right-5 text-2xl font-extrabold text-white">{ciudad.nombre}</h3>
          </div>
          <div className="flex items-center justify-between gap-3 p-5"><p className="text-sm leading-6 text-slate-600">{ciudad.texto}</p><ArrowUpRight aria-hidden="true" size={21} className="shrink-0 text-orange-600" /></div>
        </Link>)}
      </div>
    </section>
  </div>;
}
