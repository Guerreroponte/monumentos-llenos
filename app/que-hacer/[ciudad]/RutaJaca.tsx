import RutaJacaInteractiva from "./RutaJacaInteractiva";

export default function RutaJaca() {
  return (
    <section aria-labelledby="ruta-jaca-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Jaca a pie · 4 paradas</p>
      <h3 id="ruta-jaca-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Ciudadela al barrio de Santiago</h3>
      <p className="mt-3 leading-7 text-slate-600">Un paseo por la fortaleza, la catedral románica y las calles del casco antiguo, con cuatro paradas enlazadas.</p>
      <RutaJacaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Recorre los exteriores a tu ritmo y reserva tiempo adicional para entrar a la Ciudadela o al Museo Diocesano. Consulta entradas y horarios por separado; las iglesias mantienen su uso religioso.</p>
      <a href="https://www.jaca.es/turismo/monumentosymuseos.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
