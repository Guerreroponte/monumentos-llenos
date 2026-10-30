import RutaBurgosInteractiva from "./RutaBurgosInteractiva";

export default function RutaBurgos() {
  return (
    <section aria-labelledby="ruta-burgos-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Burgos a pie · 4 paradas</p>
      <h3 id="ruta-burgos-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Catedral al Museo de la Evolución</h3>
      <p className="mt-3 leading-7 text-slate-600">Enlaza la plaza de Santa María y el arco del mismo nombre con el Paseo del Espolón, antes de cruzar el Arlanzón hacia el Museo de la Evolución Humana. Un paseo para combinar el casco histórico y el río, eligiendo aparte los interiores que quieras visitar.</p>
      <RutaBurgosInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">Las cuatro paradas se enlazan por el exterior. Comprueba los horarios, las entradas y el último acceso si quieres visitar la Catedral o las salas del museo. Las visitas interiores requieren tiempo adicional; el culto puede modificar el acceso al templo.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Las Huelgas y la Cartuja de Miraflores quedan fuera de este paseo. El MEH está en la ciudad; los yacimientos de Atapuerca y el CAREX requieren organizar otro desplazamiento y su propia reserva. Atiende la señalización y los cruces y consulta el trayecto si necesitas evitar escalones.</p>
      <a href="https://museoevolucionhumana.com/es/informacion-y-reservas" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Consulta las visitas al MEH y Atapuerca ↗</a>
    </section>
  );
}
