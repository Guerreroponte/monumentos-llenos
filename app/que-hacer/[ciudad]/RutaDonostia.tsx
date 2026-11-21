import RutaDonostiaInteractiva from "./RutaDonostiaInteractiva";
export default function RutaDonostia() {
  return <section aria-labelledby="ruta-donostia-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
    <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Donostia-San Sebastián a pie · 3 paradas</p>
    <h3 id="ruta-donostia-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Buen Pastor a los templos de la Parte Vieja</h3>
    <p className="mt-3 leading-7 text-slate-600">Empieza junto al Buen Pastor, cruza el centro hacia el Boulevard y sigue por la calle Mayor hasta Santa María del Coro. Después continúa por las calles de la Parte Vieja hasta San Vicente. Es una propuesta de paseo exterior: añade por separado las visitas interiores que te interesen.</p>
    <RutaDonostiaInteractiva />
    <p className="mt-5 text-sm leading-6 text-slate-600">El mapa sitúa las paradas, no dibuja un itinerario accesible certificado. Consulta el trazado a pie en Google Maps, adapta el paseo a la lluvia y sigue los avisos de obras. Respeta el culto y confirma horarios, entradas y accesos con cada templo.</p>
  </section>;
}
