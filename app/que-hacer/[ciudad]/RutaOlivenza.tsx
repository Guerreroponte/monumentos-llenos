import RutaOlivenzaInteractiva from "./RutaOlivenzaInteractiva";

export default function RutaOlivenza() {
  return (
    <section aria-labelledby="ruta-olivenza-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Olivenza a pie · 5 paradas</p>
      <h3 id="ruta-olivenza-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Magdalena a la Puerta del Calvario</h3>
      <p className="mt-3 leading-7 text-slate-600">Entra por la Puerta de Alconchel y recorre la ciudadela antes de seguir hacia el paseo de Pizarro.</p>
      <RutaOlivenzaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Puedes hacer el paseo por libre. Consulta los horarios si quieres entrar en las iglesias o visitar el museo.</p>
      <a href="https://olivenzateespera.com/planificar/horarios-tarifas/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
