import RutaZafraInteractiva from "./RutaZafraInteractiva";

export default function RutaZafra() {
  return (
    <section aria-labelledby="ruta-zafra-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Zafra a pie · 4 paradas</p>
      <h3 id="ruta-zafra-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Candelaria al Palacio de los Duques de Feria</h3>
      <p className="mt-3 leading-7 text-slate-600">Pasa por las dos plazas porticadas y cruza el Arquillo del Pan antes de seguir hacia el antiguo alcázar.</p>
      <RutaZafraInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El paseo se puede hacer por libre. Consulta los horarios de la colegiata si quieres ver sus retablos.</p>
      <a href="https://turismo.zafra.es/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
