import RutaTrujilloInteractiva from "./RutaTrujilloInteractiva";

export default function RutaTrujillo() {
  return (
    <section aria-labelledby="ruta-trujillo-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Trujillo a pie · 4 paradas</p>
      <h3 id="ruta-trujillo-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Plaza Mayor al castillo</h3>
      <p className="mt-3 leading-7 text-slate-600">Cruza el casco histórico desde la Plaza Mayor, pasando por el Palacio de la Conquista y Santa María la Mayor.</p>
      <RutaTrujilloInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El casco antiguo tiene cuestas y tramos empedrados. Consulta los horarios del templo y el castillo si quieres entrar en ambos.</p>
      <a href="https://trujilloteespera.com/planificar/horarios-tarifas/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar horarios y tarifas ↗</a>
    </section>
  );
}
