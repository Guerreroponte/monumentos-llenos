export default function GuiaValencia() {
  return (
    <div className="mt-5 space-y-6 text-base leading-8 text-slate-600">
      <p>En Valencia puedes organizar el día por zonas y dejar el concierto para la noche. El centro histórico, el Jardín del Turia y los barrios junto al mar ofrecen recorridos distintos: elige una zona para el paseo y comprueba después dónde está la sala de tu evento.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-bold text-slate-900">Centro histórico: mercado y Serranos</h3>
          <p>Combina el <a className="text-orange-700 underline" href="/lugar/mercado-central-valencia">Mercado Central</a> con un paseo por Ciutat Vella y las <a className="text-orange-700 underline" href="/lugar/torres-de-serranos-valencia">Torres de Serranos</a>. El mercado es un plan de mañana; confirma apertura en domingos y festivos. Subir a las torres implica escaleras y requiere consultar el horario del monumento.</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Un tramo del Turia, a tu ritmo</h3>
          <p>El <a className="text-orange-700 underline" href="/lugar/jardin-del-turia-valencia">Jardín del Turia</a> permite enlazar un paseo con distintos espacios culturales. Escoge un tramo concreto: Serranos para combinarlo con el centro, o el entorno de la Ciudad de las Artes para ver sus exteriores. Lleva agua y protección solar.</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Cabanyal o Albufera: otro tipo de salida</h3>
          <p>Para acercarte al litoral, reserva tiempo para El Cabanyal y el paseo marítimo. La Albufera es una salida distinta: calcula el desplazamiento y la vuelta antes de combinarla con un concierto. Los paseos en barca tienen sus propias condiciones y precios.</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Cómo moverte y llegar al concierto</h3>
          <p>Combina trayectos a pie con EMT, Metrovalencia o tranvía según la zona. Comprueba la dirección exacta de la sala, la apertura de puertas y el último servicio de vuelta; algunos recintos del área de Valencia están fuera del centro. Usa el enlace «Cómo llegar» de cada ficha.</p>
        </div>
      </div>
      <p className="text-sm">Información práctica: <a className="text-orange-700 underline" href="https://www.visitvalencia.com/planifica-tu-viaje-a-valencia/como-moverse" target="_blank" rel="noopener noreferrer">transporte en Visit València</a> y <a className="text-orange-700 underline" href="https://www.valencia.es/es/-/infociudad-torres-de-serranos" target="_blank" rel="noopener noreferrer">Torres de Serranos en el Ayuntamiento</a>. Horarios y condiciones pueden cambiar; compruébalos antes de salir.</p>
    </div>
  );
}

