import RutaAvilesInteractiva from "./RutaAvilesInteractiva";

export default function RutaAviles() {
  return (
    <section aria-labelledby="ruta-aviles-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Avilés a pie · 5 paradas</p>
      <h3 id="ruta-aviles-titulo" className="mt-2 text-2xl font-bold text-slate-900">De Ferrera al barrio de Sabugo</h3>
      <p className="mt-3 leading-7 text-slate-600">Cruza el parque, recorre los soportales de Galiana y pasa por El Parche y Abastos antes de terminar en la plaza del Carbayo.</p>
      <RutaAvilesInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Consulta las aperturas del parque y del mercado si vas temprano, de noche o en festivo. Galiana tiene pendiente y combina distintos pavimentos.</p>
      <a href="https://turismoaviles.com/wp-content/uploads/2022/06/MAPA_CASCO_HISTORICO.pdf" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Plano oficial del casco histórico ↗</a>
    </section>
  );
}
