import RutaSegoviaInteractiva from "./RutaSegoviaInteractiva";

export default function RutaSegovia() {
  return (
    <section aria-labelledby="ruta-segovia-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Segovia a pie · 4 paradas</p>
      <h3 id="ruta-segovia-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Acueducto al Alcázar</h3>
      <p className="mt-3 leading-7 text-slate-600">Descubre el casco histórico por la Calle Real, la Plaza Mayor y el barrio de las Canonjías. Un paseo para enlazar cuatro de los grandes lugares de Segovia y detenerte donde más te apetezca.</p>
      <RutaSegoviaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El paseo incluye cuestas y pavimento irregular. Las visitas al interior se organizan aparte: consulta horarios y entradas con cada monumento.</p>
      <a href="https://www.turismodesegovia.com/en/node/12698" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Basado en el paseo de Turismo de Segovia ↗</a>
    </section>
  );
}
