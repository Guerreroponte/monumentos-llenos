import RutaCordobaInteractiva from "./RutaCordobaInteractiva";

export default function RutaCordoba() {
  return (
    <section aria-labelledby="ruta-cordoba-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Córdoba a pie · 5 paradas</p>
      <h3 id="ruta-cordoba-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Puente Romano al Alcázar por la Judería</h3>
      <p className="mt-3 leading-7 text-slate-600">Enlaza el Guadalquivir, la Mezquita-Catedral y las calles de la Judería en un paseo que termina junto al Alcázar de los Reyes Cristianos. Puedes recorrer sus exteriores y reservar las visitas interiores que más te interesen.</p>
      <RutaCordobaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El punto de inicio está junto a la Puerta del Puente: no hace falta cruzar el Puente Romano. Comprueba la señalización y los avisos de obras. Las calles de la Judería incluyen tramos estrechos y pavimento irregular; adapta el paseo a tus necesidades.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">El recorrido de Google Maps enlaza puntos exteriores: la calle Torrijos frente a la Mezquita-Catedral y Campo Santo de los Mártires junto al Alcázar. Las entradas y los horarios de los monumentos se consultan por separado. Verifica los espacios abiertos del Alcázar y las condiciones de visita de la Mezquita-Catedral y la Sinagoga antes de reservar.</p>
      <a href="https://www.turismodecordoba.org/monumentos" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Información de los monumentos en Turismo de Córdoba ↗</a>
    </section>
  );
}
