import RutaToledoInteractiva from "./RutaToledoInteractiva";

export default function RutaToledo() {
  return (
    <section aria-labelledby="ruta-toledo-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Toledo a pie · 5 paradas</p>
      <h3 id="ruta-toledo-titulo" className="mt-2 text-2xl font-bold text-slate-900">Del Cristo de la Luz a San Juan de los Reyes</h3>
      <p className="mt-3 leading-7 text-slate-600">Enlaza el entorno del Cristo de la Luz, la Catedral y Santo Tomé antes de continuar por la judería hacia Santa María la Blanca y San Juan de los Reyes. Un paseo por calles y plazas del casco histórico, eligiendo aparte los interiores que quieras visitar.</p>
      <RutaToledoInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El recorrido propone paradas exteriores. Las bóvedas del Cristo de la Luz, el cuadro de El Greco, los arcos de Santa María la Blanca y el claustro del monasterio forman parte de visitas interiores con horario y entrada. Comprueba cada apertura y deja tiempo adicional si decides entrar.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">El casco histórico tiene cuestas y pavimento empedrado: lleva calzado cómodo y calcula el regreso desde la última parada. Si necesitas evitar escalones, consulta el trayecto y los accesos de cada espacio antes de salir. Atiende la señalización y los cruces durante el paseo.</p>
      <a href="https://turismo.toledo.es/recursos/list5-los-10-imprescindibles-de-toledo.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre los monumentos en Turismo de Toledo ↗</a>
    </section>
  );
}
