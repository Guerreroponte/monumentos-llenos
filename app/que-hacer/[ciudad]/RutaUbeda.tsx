import RutaUbedaInteractiva from "./RutaUbedaInteractiva";
export default function RutaUbeda() {
  return <section aria-labelledby="ruta-ubeda-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Úbeda a pie · 3 paradas</p>
    <h3 id="ruta-ubeda-titulo" className="mt-2 text-2xl font-bold text-slate-900">De San Pablo a la plaza Vázquez de Molina</h3>
    <p className="mt-3 leading-7 text-slate-600">Un paseo por el casco histórico de Úbeda desde la plaza Primero de Mayo hasta el conjunto monumental de Vázquez de Molina. Enlaza San Pablo, la Capilla del Salvador y Santa María de los Reales Alcázares. Las tres paradas permiten disfrutar de los exteriores; organiza aparte las visitas interiores que te interesen.</p>
    <RutaUbedaInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">Lleva calzado cómodo para las calles empedradas y presta atención a escalones y desniveles. Los puntos del mapa indican las paradas; abre Google Maps para las indicaciones a pie. Consulta horarios y entradas antes de visitar los interiores, respeta el culto y sigue las indicaciones locales ante posibles restricciones.</p>
  </section>;
}
