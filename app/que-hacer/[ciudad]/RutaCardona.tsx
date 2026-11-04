import RutaCardonaInteractiva from "./RutaCardonaInteractiva";

export default function RutaCardona() {
  return (
    <section aria-labelledby="ruta-cardona-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Cardona a pie · 5 paradas</p>
      <h3 id="ruta-cardona-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del mercado medieval al Castell de Cardona</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre las plazas del casco histórico y pasa por el Portal de Graells antes de subir a la fortaleza.</p>
      <RutaCardonaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">La subida al castillo tiene pendiente. Consulta los pases de la visita guiada y reserva tiempo para la colegiata.</p>
      <a href="https://cardonaturisme.cat/es/activitats/visita-guiada-al-castillo-de-cardona/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar la visita al castillo ↗</a>
    </section>
  );
}
