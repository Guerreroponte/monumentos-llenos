import RutaLasPalmasInteractiva from "./RutaLasPalmasInteractiva";

export default function RutaLasPalmas() {
  return (
    <section aria-labelledby="ruta-las-palmas-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Las Palmas a pie · 4 paradas</p>
      <h3 id="ruta-las-palmas-titulo" className="mt-2 text-2xl font-bold text-slate-900">De Vegueta a Triana por Santa Ana y la Casa de Colón</h3>
      <p className="mt-3 leading-7 text-slate-600">Enlaza El Museo Canario, la plaza de Santa Ana y el entorno de la Casa de Colón antes de continuar hacia Triana. Un paseo por el casco histórico para descubrir sus plazas y fachadas, eligiendo aparte los interiores que quieras visitar.</p>
      <RutaLasPalmasInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Las cuatro paradas se pueden enlazar por el exterior. Comprueba los horarios y las condiciones de acceso si quieres entrar en los museos o la Catedral. El Museo Canario anuncia limitaciones de accesibilidad durante sus obras de ampliación.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Las Canteras está en otra zona de la ciudad y no forma parte de este paseo: organiza su desplazamiento por separado. Lleva agua y protección solar y atiende la señalización durante el recorrido.</p>
      <a href="https://www.grancanaria.com/turismo/isla-de-gran-canaria/municipios-de-gran-canaria/las-palmas-de-gran-canaria/recorrervegueta/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre Vegueta en Turismo de Gran Canaria ↗</a>
    </section>
  );
}
