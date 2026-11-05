import RutaToroInteractiva from "./RutaToroInteractiva";

export default function RutaToro() {
  return (
    <section aria-labelledby="ruta-toro-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Toro a pie · 5 paradas</p>
      <h3 id="ruta-toro-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Arco del Reloj al Alcázar</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre la calle Mayor, visita la colegiata y sigue el paseo del Espolón con vistas a la vega del Duero.</p>
      <RutaToroInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Consulta el acceso a la colegiata y al Alcázar antes de salir. El mapa numera las paradas; abre Google Maps para seguir el recorrido a pie.</p>
      <a href="https://www.turismotoro.com/toro/rutas-de-interes/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
