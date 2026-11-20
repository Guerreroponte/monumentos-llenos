import RutaElcheInteractiva from "./RutaElcheInteractiva";
export default function RutaElche() {
  return <section aria-labelledby="ruta-elche-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Elche a pie · 3 paradas</p>
    <h3 id="ruta-elche-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Palmeral a Santa María, pasando por Altamira</h3>
    <p className="mt-3 leading-7 text-slate-600">Un paseo por el centro de Elche que combina los jardines del Parque Municipal, el antiguo alcázar y la plaza de Santa María. Recorre primero los senderos del parque y continúa hacia el Palacio de Altamira antes de terminar junto a la basílica. Puedes ampliar el plan con las visitas interiores, organizándolas por separado.</p>
    <RutaElcheInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">Comprueba la apertura del parque y utiliza los accesos señalizados y los pasos peatonales. Los puntos del mapa indican las paradas; Google Maps muestra las indicaciones a pie y su estimación de distancia y tiempo. El paseo dentro del jardín y las visitas interiores requieren tiempo adicional. La torre tiene escaleras y sus condiciones son distintas de las del templo. Adapta el recorrido al calor, al culto y a posibles obras o restricciones.</p>
  </section>;
}
