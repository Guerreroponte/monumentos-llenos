import RutaArandaInteractiva from "./RutaArandaInteractiva";

export default function RutaAranda() {
  return (
    <section aria-labelledby="ruta-aranda-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Aranda de Duero a pie · 5 paradas</p>
      <h3 id="ruta-aranda-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del casco histórico al puente de las Tenerías</h3>
      <p className="mt-3 leading-7 text-slate-600">Desde la Plaza Mayor, descubre Santa María, los museos de la plaza de San Juan y el paso medieval sobre el Bañuelos.</p>
      <RutaArandaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Puedes recorrer los exteriores y reservar tiempo adicional para los museos. Consulta sus horarios antes de salir; las visitas a bodegas subterráneas se organizan por separado.</p>
      <a href="https://turismo.arandadeduero.es/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
