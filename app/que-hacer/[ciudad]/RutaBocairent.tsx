import RutaBocairentInteractiva from "./RutaBocairentInteractiva";

export default function RutaBocairent() {
  return (
    <section aria-labelledby="ruta-bocairent-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Bocairent a pie · 4 paradas</p>
      <h3 id="ruta-bocairent-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del barrio medieval a las Covetes dels Moros</h3>
      <p className="mt-3 leading-7 text-slate-600">Descubre las calles del casco antiguo, las Covetes del Colomer y la Cava de Sant Blai antes de acercarte al Barranc de la Fos.</p>
      <RutaBocairentInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El paseo tiene cuestas y escaleras. La visita interior a las Covetes dels Moros requiere reserva y esfuerzo físico, con pasos estrechos y tramos gateando. Consulta las restricciones, el calzado exigido y los horarios antes de salir.</p>
      <a href="https://entradas.bocairent.org/list/otherProducts?lang=es" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
