import RutaAlcoyInteractiva from "./RutaAlcoyInteractiva";

export default function RutaAlcoy() {
  return (
    <section aria-labelledby="ruta-alcoy-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Alcoy a pie · 5 paradas</p>
      <h3 id="ruta-alcoy-titulo" className="mt-2 text-2xl font-bold text-slate-900">Paseo por el Alcoy modernista</h3>
      <p className="mt-3 leading-7 text-slate-600">Del antiguo Parque de Bomberos al Conservatorio, con dos fachadas modernistas en Sant Nicolau y una pausa en la Glorieta.</p>
      <RutaAlcoyInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El paseo enlaza exteriores y calles del centro. Reserva con antelación para visitar la Casa del Pavo y comprueba las condiciones de otros interiores.</p>
      <a href="https://opendata.alcoi.org/data/dataset/ruta-modernista" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Ruta modernista del Ayuntamiento ↗</a>
    </section>
  );
}
