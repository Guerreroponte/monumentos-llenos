import RutaSalamancaInteractiva from "./RutaSalamancaInteractiva";

export default function RutaSalamanca() {
  return (
    <section aria-labelledby="ruta-salamanca-titulo" className="mt-8 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">Salamanca a pie · 5 paradas</p>
      <h3 id="ruta-salamanca-titulo" className="mt-2 text-2xl font-bold text-slate-900">De la Plaza Mayor al Puente Romano</h3>
      <p className="mt-3 leading-7 text-slate-600">Recorre el centro histórico por la Casa de las Conchas, el Patio de Escuelas y las catedrales antes de bajar hacia el Tormes. Un paseo para descubrir plazas y fachadas, eligiendo aparte los interiores que quieras visitar.</p>
      <RutaSalamancaInteractiva />
      <p className="mt-5 text-sm leading-6 text-slate-600">El recorrido propone paradas exteriores. Si quieres entrar en la Universidad, las catedrales o sus torres, comprueba los horarios, las entradas y el último acceso. Las visitas interiores requieren tiempo adicional.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">Hay desniveles al bajar hacia el río: lleva calzado cómodo y calcula el regreso al centro. Si necesitas evitar escalones, consulta el itinerario y las condiciones de cada espacio antes de salir. Atiende la señalización y los cruces durante el paseo.</p>
      <a href="https://salamanca.es/que-ver/monumentos" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-orange-700 underline">Descubre los monumentos en Turismo de Salamanca ↗</a>
    </section>
  );
}
