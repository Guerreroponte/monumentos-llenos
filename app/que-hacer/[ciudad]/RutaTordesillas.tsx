import RutaTordesillasInteractiva from "./RutaTordesillasInteractiva";

export default function RutaTordesillas() {
  return (
    <section aria-labelledby="ruta-tordesillas-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Tordesillas a pie · 5 paradas</p>
      <h3 id="ruta-tordesillas-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Plaza Mayor a la ribera del Duero</h3>
      <p className="mt-3 leading-7 text-slate-600">Pasa por las Casas del Tratado y San Antolín antes de visitar Santa Clara y bajar al puente.</p>
      <RutaTordesillasInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">La bajada al río tiene pendiente. Organiza el paseo alrededor del pase de Santa Clara si quieres visitar el monasterio.</p>
      <a href="https://tordesillas.net/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consultar información turística ↗</a>
    </section>
  );
}
