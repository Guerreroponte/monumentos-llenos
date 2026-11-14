import RutaBarakaldoInteractiva from "./RutaBarakaldoInteractiva";
export default function RutaBarakaldo() {
  return <section aria-labelledby="ruta-barakaldo-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Barakaldo a pie · 3 paradas</p>
    <h3 id="ruta-barakaldo-titulo" className="mt-2 text-2xl font-bold text-slate-900">De Munoa al teatro, pasando por el Botánico</h3>
    <p className="mt-3 leading-7 text-slate-600">Una propuesta urbana para combinar patrimonio, naturaleza y cultura. Empieza en Munoa, continúa hacia el Jardín Botánico Ramón Rubial y termina ante el Teatro Barakaldo. Los tramos entre paradas discurren por la ciudad. Calcula unos 4,5 km y algo más de una hora caminando, sin contar las visitas; estimación de Google Maps consultada el 13/11/2026.</p>
    <RutaBarakaldoInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">Consulta los horarios de los jardines y utiliza sus accesos señalizados. Sigue las indicaciones peatonales y los pasos habilitados; el mapa marca las paradas, no un itinerario de accesibilidad garantizada. Revisa en Google Maps la distancia y el tiempo antes de salir. Las visitas interiores y los espectáculos se organizan por separado.</p>
  </section>;
}
