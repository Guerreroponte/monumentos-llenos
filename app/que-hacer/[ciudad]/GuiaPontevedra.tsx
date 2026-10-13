import Link from "next/link";

const zonas = [
  { titulo: "La Peregrina y las plazas del centro", texto: "Empieza por el santuario y continúa hacia el entorno de la Ferraría. Consulta el horario si quieres entrar y respeta las celebraciones. Las plazas permiten adaptar el paseo al tiempo disponible, con paradas para observar el patrimonio y descansar.", slug: "santuario-peregrina-pontevedra", enlace: "Ver la Peregrina" },
  { titulo: "Santa María y el patrimonio histórico", texto: "Incluye la basílica en una ruta por las calles del centro. Contempla la fachada y comprueba las condiciones para entrar al templo o visitar otros espacios. Lleva calzado cómodo y presta atención al pavimento si llueve.", slug: "basilica-santa-maria-pontevedra", enlace: "Ver Santa María la Mayor" },
  { titulo: "Lérez e Isla de las Esculturas", texto: "Reserva una parte del día para caminar junto al río y descubrir las obras de la Illa do Covo. Elige un tramo según la movilidad de tu grupo y el tiempo. Respeta las esculturas y comprueba el estado de los caminos tras episodios de lluvia.", slug: "isla-esculturas-pontevedra", enlace: "Ver la Isla de las Esculturas" },
];

export default function GuiaPontevedra() {
  return (
    <div className="mt-5 space-y-6 text-base leading-8 text-slate-600">
      <p>Pontevedra permite combinar un recorrido por su centro histórico con una pausa junto al Lérez. Organiza el paseo según el tiempo disponible y la ubicación de tu evento, dejando margen para llegar al recinto y volver después.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {zonas.map(zona => <div key={zona.slug}>
          <h3 className="font-bold text-slate-900">{zona.titulo}</h3>
          <p>{zona.texto}</p>
          <Link className="text-orange-700 underline" href={`/lugar/${zona.slug}`}>{zona.enlace} →</Link>
        </div>)}
        <div>
          <h3 className="font-bold text-slate-900">Del paseo al concierto</h3>
          <p>Comprueba la dirección exacta y la apertura de puertas del evento. Si añades una excursión por las Rías Baixas, calcula ese trayecto aparte: Cabo Home está en el municipio de Cangas y requiere desplazamiento desde Pontevedra. Revisa el transporte y las opciones de regreso.</p>
        </div>
      </div>
      <p className="text-sm">Información oficial: <a className="text-orange-700 underline" href="https://www.visit-pontevedra.com/que-ver/imprescindibles/" target="_blank" rel="noopener noreferrer">Visit Pontevedra</a> · <a className="text-orange-700 underline" href="https://www.visit-pontevedra.com/experiencia/isla-de-las-esculturas/" target="_blank" rel="noopener noreferrer">Isla de las Esculturas</a>. Comprueba horarios y condiciones antes de salir.</p>
    </div>
  );
}
