import RutaMedinaDelCampoInteractiva from "./RutaMedinaDelCampoInteractiva";

export default function RutaMedinaDelCampo() {
  return (
    <section aria-labelledby="ruta-medina-del-campo-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Medina del Campo a pie · 5 paradas</p>
      <h3 id="ruta-medina-del-campo-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Plaza Mayor al Castillo de la Mota</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre la plaza y sus monumentos antes de pasar por las Reales Carnicerías y subir al castillo.</p>
      <RutaMedinaDelCampoInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">La última parte sube hacia el castillo. Reserva tiempo para las visitas interiores y comprueba el recorrido a pie en Google Maps.</p>
      <a href="https://www.spain.info/es/destino/medina-del-campo/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
