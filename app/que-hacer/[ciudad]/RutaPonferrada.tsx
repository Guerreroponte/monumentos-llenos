import Link from "next/link";
import RutaPonferradaInteractiva from "./RutaPonferradaInteractiva";

export default function RutaPonferrada() {
  return (
    <section aria-labelledby="ruta-ponferrada-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Ponferrada a pie · 4 paradas</p>
      <h3 id="ruta-ponferrada-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Castillo a la plaza del Ayuntamiento</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre el casco antiguo desde el Castillo de los Templarios hasta la plaza del Ayuntamiento, pasando por la Encina y la Torre del Reloj. Un paseo exterior para elegir tus paradas y organizar aparte las visitas interiores.</p>
      <RutaPonferradaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Junto a la Torre del Reloj puedes añadir el <Link href="/lugar/museo-bierzo-ponferrada" className="font-semibold text-orange-700 underline">Museo del Bierzo</Link>. Comprueba los calendarios del Castillo, el museo y la Encina antes de entrar: las visitas interiores añaden tiempo al paseo.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Lleva calzado cómodo y atiende la señalización del casco antiguo. Si necesitas evitar escalones, consulta el trayecto y los accesos de cada edificio, especialmente las torres y los recorridos elevados.</p>
      <a href="https://www.ponferrada.org/turismo/es/monumentos" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre los monumentos en Turismo de Ponferrada ↗</a>
    </section>
  );
}
