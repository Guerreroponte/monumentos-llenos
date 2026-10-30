import Link from "next/link";
import RutaCiudadRealInteractiva from "./RutaCiudadRealInteractiva";

export default function RutaCiudadReal() {
  return (
    <section aria-labelledby="ruta-ciudad-real-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Ciudad Real a pie · 4 paradas</p>
      <h3 id="ruta-ciudad-real-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Puerta de Toledo a San Pedro</h3>
      <p className="mt-3 leading-7 text-slate-600">Conecta la puerta medieval con la Catedral y el entorno del Prado antes de pasar por la Plaza Mayor y terminar junto a San Pedro. Un paseo por el centro, eligiendo aparte los interiores que quieras visitar.</p>
      <RutaCiudadRealInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Junto a la Catedral puedes añadir el <Link href="/lugar/museo-lopez-villasenor-ciudad-real" className="font-semibold text-orange-700 underline">Museo López-Villaseñor</Link>. El museo cierra los lunes; comprueba el calendario antes de entrar. Las visitas interiores añaden tiempo al paseo y el culto puede condicionar el acceso a los templos.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Utiliza los cruces señalizados junto a la ronda de Toledo. Lleva agua y protección solar, adapta el paseo al calor y consulta el trayecto y los accesos si necesitas evitar escalones.</p>
      <a href="https://turismo.ciudadreal.es/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Prepara la visita con Turismo de Ciudad Real ↗</a>
    </section>
  );
}
