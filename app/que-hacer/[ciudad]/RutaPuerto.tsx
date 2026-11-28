import RutaPuertoInteractiva from "./RutaPuertoInteractiva";
export default function RutaPuerto() {
  return <section aria-labelledby="ruta-puerto-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">El Puerto de Santa María a pie · 3 paradas</p>
    <h3 id="ruta-puerto-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Castillo de San Marcos a La Placilla</h3>
    <p className="mt-3 leading-7 text-slate-600">Comienza junto al castillo, continúa por el centro hacia la Plaza de España y la Iglesia Mayor Prioral y termina en la Casa de los Leones, en La Placilla. Es una propuesta por libre para combinar fachadas, plazas y una pausa para comer. Reserva más tiempo si quieres entrar en los monumentos.</p>
    <RutaPuertoInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">El mapa muestra las paradas, no un trazado de navegación. Abre Google Maps para comprobar las calles, distancia y tiempo a pie. Las visitas interiores se consultan y reservan por separado cuando corresponda. Revisa accesos con cada gestor si necesitas un recorrido sin escalones.</p>
  </section>;
}
