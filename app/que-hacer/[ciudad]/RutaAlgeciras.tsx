import RutaAlgecirasInteractiva from "./RutaAlgecirasInteractiva";

export default function RutaAlgeciras() {
  return (
    <section aria-labelledby="ruta-algeciras-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Algeciras a pie · 5 paradas</p>
      <h3 id="ruta-algeciras-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del mercado al Parque María Cristina</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre el Mercado Ingeniero Torroja, la Plaza Alta y San Isidro antes de llegar a las murallas y al parque.</p>
      <RutaAlgecirasInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El paseo incluye cuestas en el casco histórico. Consulta las aperturas del mercado, las murallas y el parque si quieres entrar.</p>
      <a href="https://www.algeciras.es/es/ciudad/interesante/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Guía del Ayuntamiento ↗</a>
    </section>
  );
}
