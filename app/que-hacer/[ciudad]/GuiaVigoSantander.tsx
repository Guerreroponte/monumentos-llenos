import Link from "next/link";

const guias = {
  "vigo": {
    "introduccion": "En Vigo puedes alternar el Casco Vello y O Castro con una visita a Castrelos o un paseo en Samil. Organiza los trayectos por zonas: el desnivel y la distancia a las playas influyen en el tiempo que necesitas antes de un concierto.",
    "zonas": [
      {
        "titulo": "Casco Vello y la Colegiata",
        "texto": "Empieza por el barrio histórico y contempla la Concatedral de Santa María. Consulta su horario si quieres entrar y respeta las celebraciones. Continúa por las calles y plazas cercanas, teniendo en cuenta las cuestas y el pavimento.",
        "slug": "concatedral-santa-maria-vigo",
        "enlace": "Ver la Concatedral"
      },
      {
        "titulo": "Castrelos: jardines y música",
        "texto": "El parque permite combinar un paseo con el entorno del Pazo Quiñones de León. Si te interesa el museo o el auditorio, revisa sus horarios y programación por separado. Confirma las condiciones de cada concierto y calcula el regreso al centro.",
        "slug": "parque-castrelos-vigo",
        "enlace": "Ver el Parque de Castrelos"
      },
      {
        "titulo": "Samil: tiempo junto al mar",
        "texto": "Reserva un tramo del día para el paseo y la playa. Comprueba el transporte de ida y vuelta y el funcionamiento estacional de los equipamientos. Para bañarte, sigue las banderas y las indicaciones del socorrismo; adapta el plan al tiempo y al estado del mar.",
        "slug": "playa-samil-vigo",
        "enlace": "Ver la playa de Samil"
      },
      {
        "titulo": "O Castro y agenda de conciertos",
        "texto": "O Castro completa la ruta urbana con vistas y patrimonio. Adapta la subida a la movilidad de tu grupo y deja margen para llegar a la sala. Las Cíes requieren una planificación propia: revisa transporte, permisos cuando correspondan y horarios antes de organizar la excursión.",
        "slug": "vigo-el-monte-de-o-castro-vistas-de-infarto-y-castros-vigo",
        "enlace": "Ver O Castro"
      }
    ],
    "fuentes": [
      {
        "nombre": "Parque de Castrelos",
        "url": "https://turismo.vigo.org/node/369"
      },
      {
        "nombre": "Playa de Samil",
        "url": "https://turismo.vigo.org/es/playa-de-samil"
      },
      {
        "nombre": "Concatedral de Santa María de Vigo",
        "url": "https://turismo.vigo.org/es/iglesia-de-santa-maria"
      }
    ]
  },
  "santander": {
    "introduccion": "Santander permite organizar el día entre el centro y la bahía, la península de la Magdalena y El Sardinero. Elige el recorrido según el tiempo, la movilidad de tu grupo y la dirección de tu evento, calculando cada desplazamiento por separado.",
    "zonas": [
      {
        "titulo": "Pereda y Centro Botín",
        "texto": "Combina el paseo por los Jardines de Pereda con la arquitectura del Centro Botín. Si quieres ver las exposiciones, consulta los horarios estacionales, las tarifas y qué incluye la entrada. Las actividades culturales pueden necesitar una reserva adicional.",
        "slug": "centro-botin-santander",
        "enlace": "Ver el Centro Botín"
      },
      {
        "titulo": "Magdalena: paseo y visita al palacio",
        "texto": "Reserva tiempo para recorrer la península y llegar al palacio. Para conocer el interior, confirma la disponibilidad y reserva tu visita. Los eventos pueden modificar los horarios; el paseo exterior y la visita guiada tienen condiciones distintas.",
        "slug": "palacio-magdalena-santander",
        "enlace": "Ver el Palacio de la Magdalena"
      },
      {
        "titulo": "El Sardinero y Piquío",
        "texto": "Recorre el paseo de la Primera Playa y continúa hacia el entorno de Piquío. Adapta el acceso a la arena a la marea y al tiempo. Si vas a bañarte, respeta las banderas y el servicio de socorrismo cuando esté operativo.",
        "slug": "primera-playa-sardinero-santander",
        "enlace": "Ver la Primera Playa del Sardinero"
      },
      {
        "titulo": "Llegar al concierto y volver",
        "texto": "Antes de enlazar la visita con un concierto, comprueba el recinto y su dirección exacta. Consulta la apertura de puertas y calcula el trayecto desde el centro, la Magdalena o El Sardinero. Revisa las opciones de transporte y el último servicio de regreso.",
        "slug": null,
        "enlace": null
      }
    ],
    "fuentes": [
      {
        "nombre": "Palacio de la Magdalena",
        "url": "https://turismo.santander.es/que-hacer/planes-en-santander/visitas-guiadas"
      },
      {
        "nombre": "Primera Playa de El Sardinero",
        "url": "https://turismo.santander.es/primera-playa-de-el-sardinero"
      },
      {
        "nombre": "Centro Botín",
        "url": "https://www.centrobotin.org/visita-2/"
      }
    ]
  }
};

export default function GuiaVigoSantander({ ciudad }: { ciudad: keyof typeof guias }) {
  const guia = guias[ciudad];
  return (
    <div className="mt-5 space-y-6 text-base leading-8 text-slate-600">
      <p>{guia.introduccion}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {guia.zonas.map((zona) => (
          <div key={zona.titulo}>
            <h3 className="font-bold text-slate-900">{zona.titulo}</h3>
            <p>{zona.texto}</p>
            {zona.slug && <Link className="text-orange-700 underline" href={`/lugar/${zona.slug}`}>{zona.enlace} →</Link>}
          </div>
        ))}
      </div>
      <p className="text-sm">Información oficial: {guia.fuentes.map((fuente, i) => (
        <span key={fuente.url}>{i > 0 ? " · " : ""}<a className="text-orange-700 underline" href={fuente.url} target="_blank" rel="noopener noreferrer">{fuente.nombre}</a></span>
      ))}. Comprueba horarios y condiciones antes de salir.</p>
    </div>
  );
}
