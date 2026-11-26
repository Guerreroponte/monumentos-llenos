import RutaLorcaInteractiva from "./RutaLorcaInteractiva";
export default function RutaLorca() {
  return <section aria-labelledby="ruta-lorca-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Lorca a pie · 3 paradas</p>
    <h3 id="ruta-lorca-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Palacio de Guevara a la muralla medieval</h3>
    <p className="mt-3 leading-7 text-slate-600">Comienza en la calle Lope Gisbert, continúa hacia la Plaza de España y San Patricio y sigue por el casco histórico hasta la calle Zapatería y el Porche de San Antonio. Reserva una mañana si quieres combinar el paseo con visitas interiores y una pausa para comer. Es una propuesta por libre inspirada en el itinerario monumental municipal.</p>
    <RutaLorcaInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">El mapa señala las paradas. Consulta en Google Maps el trazado peatonal, la distancia y el tiempo estimado; las visitas interiores requieren tiempo adicional. Hay desniveles y el mirador del Porche tiene escaleras. Confirma accesos, horarios y entradas con cada gestor. El castillo queda fuera de este paseo.</p>
  </section>;
}
