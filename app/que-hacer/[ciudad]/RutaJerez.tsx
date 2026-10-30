import RutaJerezInteractiva from "./RutaJerezInteractiva";

export default function RutaJerez() {
  return (
    <section aria-labelledby="ruta-jerez-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Jerez a pie · 5 paradas</p>
      <h3 id="ruta-jerez-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Catedral a las plazas de Jerez</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre el entorno del Alcázar y San Miguel antes de pasar por el Arenal y terminar junto al Cabildo Antiguo, en la plaza de la Asunción. Un paseo por el centro para elegir tus paradas y organizar aparte las visitas interiores.</p>
      <RutaJerezInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El mapa enlaza paradas exteriores. Entrar al Alcázar o a los templos requiere comprobar horarios, entradas y último acceso; las visitas interiores añaden tiempo al paseo. La Catedral anuncia suspendidas temporalmente las visitas a su torre.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Lleva agua y protección solar y adapta el paseo al calor. Hay desniveles en el casco histórico: consulta el trayecto y los accesos si necesitas evitar escalones y atiende la señalización durante el recorrido.</p>
      <a href="https://www.turismojerez.com/plaza-en-plaza" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre las plazas en Turismo de Jerez ↗</a>
    </section>
  );
}
