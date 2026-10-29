import RutaPontevedraInteractiva from "./RutaPontevedraInteractiva";

export default function RutaPontevedra() {
  return (
    <section aria-labelledby="ruta-pontevedra-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Pontevedra a pie · 5 paradas</p>
      <h3 id="ruta-pontevedra-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Peregrina a Santa María por las plazas</h3>
      <p className="mt-3 leading-7 text-slate-600">Descubre el casco histórico de Pontevedra enlazando la Peregrina, los soportales de la Ferrería, la plaza de la Leña y los escudos del Teucro. El paseo termina junto a Santa María la Mayor y permite detenerte en las plazas a tu ritmo.</p>
      <RutaPontevedraInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">La ruta enlaza plazas y espacios exteriores: no necesitas entrar en los templos para seguir el paseo. Consulta por separado los horarios de la Peregrina y de Santa María, y respeta las celebraciones religiosas.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Lleva calzado cómodo y presta atención al pavimento de piedra, especialmente si llueve. Sigue la señalización y adapta el recorrido a la movilidad de tu grupo.</p>
      <a href="https://www.visit-pontevedra.com/experiencia/plazas-de-pontevedra/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre las plazas en Visit Pontevedra ↗</a>
    </section>
  );
}
