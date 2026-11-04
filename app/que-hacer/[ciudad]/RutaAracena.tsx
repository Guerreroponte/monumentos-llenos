import RutaAracenaInteractiva from "./RutaAracenaInteractiva";

export default function RutaAracena() {
  return (
    <section aria-labelledby="ruta-aracena-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Aracena a pie · 5 paradas</p>
      <h3 id="ruta-aracena-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Gran Vía al castillo</h3>
      <p className="mt-3 leading-7 text-slate-600">Visita el Museo del Jamón y la entrada de la Gruta de las Maravillas antes de subir por la Plaza Alta y el Cabildo Viejo hacia el castillo.</p>
      <RutaAracenaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Organiza el paseo alrededor de la hora reservada para la gruta. La subida al castillo tiene pendiente y las visitas interiores requieren tiempo adicional.</p>
      <a href="https://turismoaracena.sacatuentrada.es/es/productos/descripcion/gruta-de-las-maravillas" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar entradas de la gruta ↗</a>
    </section>
  );
}
