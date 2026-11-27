export default function BusquedaGlobalForm({ consulta = "", id = "busqueda-global" }: { consulta?: string; id?: string }) {
  return <form action="/buscar" method="get" role="search" aria-label="Buscar eventos, lugares y ciudades" className="flex flex-col gap-3 sm:flex-row sm:items-end">
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-slate-700">Evento, lugar o ciudad</label>
      <input id={id} name="q" type="search" defaultValue={consulta} placeholder="Por ejemplo: Lorca, jazz o Palacio de Guevara" maxLength={100} required minLength={2} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-2 focus:outline-orange-600" />
    </div>
    <button type="submit" className="min-h-12 rounded-2xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">Buscar</button>
  </form>;
}
