import RutaAstorgaInteractiva from "./RutaAstorgaInteractiva";

export default function RutaAstorga() {
  return (
    <section aria-labelledby="ruta-astorga-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Astorga a pie · 5 paradas</p>
      <h3 id="ruta-astorga-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Palacio de Gaudí a la Astorga romana</h3>
      <p className="mt-3 leading-7 text-slate-600">Visita el entorno del palacio y la catedral, pasa junto a la muralla y sigue hacia la Plaza Mayor y el Museo Romano.</p>
      <RutaAstorgaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Organiza el paseo alrededor de las entradas del palacio y la catedral si quieres visitar sus interiores. La Ruta Romana guiada se reserva aparte.</p>
      <a href="https://turismoastorga.es/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
