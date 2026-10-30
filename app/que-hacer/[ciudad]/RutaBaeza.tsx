import RutaBaezaInteractiva from "./RutaBaezaInteractiva";

export default function RutaBaeza() {
  return (
    <section aria-labelledby="ruta-baeza-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Baeza a pie · 5 paradas</p>
      <h3 id="ruta-baeza-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Pópulo a la Catedral</h3>
      <p className="mt-3 leading-7 text-slate-600">Conecta la Fuente de los Leones con la Antigua Universidad, Jabalquinto y Santa Cruz antes de llegar a la plaza de Santa María. Un paseo por el casco histórico para contemplar los exteriores y elegir aparte las visitas interiores.</p>
      <RutaBaezaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Jabalquinto es una sede universitaria: confirma la visita al patio. La Catedral tiene modalidades de entrada propias y último acceso antes del cierre; comprueba el calendario antes de organizar los interiores.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Lleva calzado cómodo para el empedrado y las pendientes. Si necesitas evitar escalones, consulta el recorrido y los accesos con la Oficina de Turismo; la subida a la torre requiere comprobar sus condiciones por separado.</p>
      <a href="https://turismo.baeza.net/que-ver-en-baeza-imprescindibles/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Prepara la visita con Turismo de Baeza ↗</a>
    </section>
  );
}
