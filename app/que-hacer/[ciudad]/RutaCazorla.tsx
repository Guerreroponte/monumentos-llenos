import RutaCazorlaInteractiva from "./RutaCazorlaInteractiva";

export default function RutaCazorla() {
  return (
    <section aria-labelledby="ruta-cazorla-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Cazorla a pie · 4 paradas</p>
      <h3 id="ruta-cazorla-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Corredera al Castillo de la Yedra</h3>
      <p className="mt-3 leading-7 text-slate-600">Baja a Santa María desde la Corredera, asómate al Cerezuelo y termina en la fortaleza. Santa María y su bóveda comparten una parada.</p>
      <RutaCazorlaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">La subida al castillo tiene pendiente. Consulta los pases de la bóveda y las condiciones de acceso antes de salir.</p>
      <a href="https://cazorla.es/turismo/monumentos/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar los monumentos de Cazorla ↗</a>
    </section>
  );
}
