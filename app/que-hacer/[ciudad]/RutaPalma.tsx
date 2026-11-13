import RutaPalmaInteractiva from "./RutaPalmaInteractiva";
export default function RutaPalma() {
  return <section aria-labelledby="ruta-palma-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Palma a pie · 4 paradas</p>
    <h3 id="ruta-palma-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Lonja a los Baños Árabes</h3>
    <p className="mt-3 leading-7 text-slate-600">Un paseo por el casco histórico que enlaza la Lonja, la Almudaina, la Catedral y los Baños Árabes. El recorrido exterior y las visitas interiores se pueden organizar por separado.</p>
    <RutaPalmaInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">Consulta los horarios de cada monumento antes de salir. Las entradas de los interiores son independientes. Hay calles empedradas, desniveles y accesos con escalones; confirma la accesibilidad de cada visita si la necesitas.</p>
  </section>;
}
