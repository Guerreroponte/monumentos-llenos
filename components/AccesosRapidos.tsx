import Link from "next/link";
import { Music2, Ticket, UsersRound, CalendarDays, Drama, Sparkles, ArrowUpRight } from "lucide-react";
import { ACCESOS_RAPIDOS, enlacePlan } from "@/lib/planes-rapidos";

const iconos = { musica: Music2, entrada: Ticket, familia: UsersRound, calendario: CalendarDays, teatro: Drama, festival: Sparkles };

export default function AccesosRapidos({ ciudad = "" }: { ciudad?: string }) {
  return (
    <nav aria-labelledby="planes-rapidos-titulo" className="mt-6 max-w-xl">
      <h2 id="planes-rapidos-titulo" className="text-lg font-black tracking-tight text-slate-950">¿Qué te apetece hacer?</h2>
      <p className="mt-1 text-sm text-slate-600">{ciudad ? `Descubre planes en ${ciudad}.` : "Descubre próximos planes en toda España."}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-3">
        {ACCESOS_RAPIDOS.map(({ nombre, icono, filtro }) => {
          const Icono = iconos[icono];
          return (
            <Link key={nombre} href={enlacePlan(filtro, ciudad)} prefetch={false}
              className="group flex min-h-20 min-w-0 items-center gap-2 rounded-2xl border border-orange-100 bg-white/90 px-3 py-3 text-sm font-bold leading-5 text-slate-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 motion-reduce:transition-none">
              <Icono aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-700" strokeWidth={1.75} />
              <span className="flex-1">{nombre}</span>
              <ArrowUpRight aria-hidden="true" className="hidden h-3.5 w-3.5 shrink-0 text-orange-700 sm:block" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
