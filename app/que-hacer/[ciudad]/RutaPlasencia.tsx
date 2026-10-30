import RutaPlasenciaInteractiva from "./RutaPlasenciaInteractiva";

export default function RutaPlasencia() {
  return (
    <section aria-labelledby="ruta-plasencia-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Plasencia a pie · 5 paradas</p>
      <h3 id="ruta-plasencia-titulo" className="mt-2 text-2xl font-bold text-slate-900">De Mirabel al Acueducto de San Antón</h3>
      <p className="mt-3 leading-7 text-slate-600">Enlaza el entorno del Palacio de Mirabel y las Catedrales con la Plaza Mayor, Torre Lucía y los arcos de San Antón. Un paseo para conocer el casco histórico y prolongarlo hasta el acueducto, organizando aparte las visitas interiores.</p>
      <RutaPlasenciaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Las paradas se plantean por el exterior. Entrar al palacio, las Catedrales o la muralla requiere comprobar horarios y accesos. La información municipal anuncia cerrado temporalmente el patio del Enlosado, que no forma parte del paseo.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">El acueducto queda fuera del núcleo histórico: calcula el regreso y utiliza los cruces señalizados. Lleva calzado cómodo y consulta el trayecto y los accesos si necesitas evitar escalones; las visitas interiores añaden tiempo al recorrido.</p>
      <a href="https://contenidos.plasencia.es/los-7-imprescindibles/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre los imprescindibles en Destino Plasencia ↗</a>
    </section>
  );
}
