import Link from "next/link";

const guias = {
  "a-coruna": {
    "introduccion": "A Coruña permite combinar el centro y la Ciudad Vieja con un paseo por el Atlántico o una subida a Monte de San Pedro. Elige la ruta según el viento, la visibilidad y el tiempo disponible, y calcula la vuelta si después tienes un concierto.",
    "zonas": [
      {
        "titulo": "María Pita, Ciudad Vieja y Marina",
        "texto": "Empieza por la plaza para contemplar el Ayuntamiento y continúa hacia la Ciudad Vieja o la Marina. Puedes adaptar el recorrido al tiempo disponible. Comprueba posibles montajes en la plaza y los horarios de los espacios en los que quieras entrar.",
        "slug": "plaza-maria-pita-a-coruna",
        "enlace": "Ver la plaza de María Pita"
      },
      {
        "titulo": "Riazor: paseo junto al Atlántico",
        "texto": "Reserva un tramo para caminar por el paseo marítimo junto a Riazor y la ensenada. Adapta la visita al viento y al estado del mar. Si decides bañarte, sigue las banderas y las indicaciones del socorrismo cuando esté operativo.",
        "slug": "playa-riazor-a-coruna",
        "enlace": "Ver la playa de Riazor"
      },
      {
        "titulo": "Monte de San Pedro: subir con un plan de regreso",
        "texto": "El parque ofrece vistas del océano y la ciudad, pero conviene organizar el desplazamiento aparte del paseo por el centro. Turismo municipal señala el ascensor panorámico como cerrado temporalmente: consulta el aviso y planifica otro acceso. Lleva abrigo si hace viento.",
        "slug": "monte-san-pedro-a-coruna",
        "enlace": "Ver Monte de San Pedro"
      },
      {
        "titulo": "Torre de Hércules y música en directo",
        "texto": "La Torre de Hércules completa la ruta de patrimonio y costa. Revisa las condiciones de acceso en su ficha y deja tiempo para llegar al recinto de tu concierto. Comprueba dirección, apertura de puertas y regreso; las salas pueden estar lejos del paseo marítimo.",
        "slug": "torre-de-hercules-a-coruna",
        "enlace": "Ver la Torre de Hércules"
      }
    ],
    "fuentes": [
      {
        "nombre": "Monte de San Pedro",
        "url": "https://www.coruna.gal/tourism/en/what-to-do-in-a-coruna/nature-and-sports/parks-and-gardens/mount-san-pedro"
      },
      {
        "nombre": "Plaza de María Pita",
        "url": "https://www.coruna.gal/tourism/en/what-to-do-in-a-coruna/art-and-culture/equipamientos/detalle-equipamiento/plaza-de-maria-pita/entidad/1374541973201?argIdioma=en"
      },
      {
        "nombre": "Playa de Riazor",
        "url": "https://www.coruna.gal/tourism/en/what-to-do-in-a-coruna/nature-and-sports/beaches/playa/riazor-beach/entidad/1161698911578?argIdioma=en"
      }
    ]
  },
  "granada": {
    "introduccion": "En Granada puedes alternar el centro monumental, los miradores del Albaicín y los jardines del entorno de la Alhambra. Las cuestas y el pavimento histórico influyen en los desplazamientos: organiza la ruta según la movilidad de tu grupo y la hora de tus eventos.",
    "zonas": [
      {
        "titulo": "Albaicín y San Nicolás",
        "texto": "Incluye el mirador para contemplar la Alhambra y recorrer parte del Albaicín. Elige el acceso según tu movilidad y reserva margen para las cuestas. Lleva calzado cómodo y mantén libre el paso cuando te detengas a hacer fotografías.",
        "slug": "mirador-san-nicolas-granada",
        "enlace": "Ver el Mirador de San Nicolás"
      },
      {
        "titulo": "Catedral y centro histórico",
        "texto": "Dedica parte del día a la Catedral y su entorno. Consulta los horarios, las entradas y los espacios incluidos. Si añades la Capilla Real, revisa sus condiciones por separado. No apures la visita si después tienes un concierto con hora fija.",
        "slug": "catedral-granada",
        "enlace": "Ver la Catedral"
      },
      {
        "titulo": "Carmen de los Mártires: jardines en la Sabika",
        "texto": "Reserva una pausa para recorrer los jardines junto al entorno de la Alhambra. Los horarios cambian según la temporada y pueden variar por actividades. Comprueba el acceso antes de salir y calcula la subida desde el centro; el palacete tiene condiciones propias.",
        "slug": "carmen-martires-granada",
        "enlace": "Ver el Carmen de los Mártires"
      },
      {
        "titulo": "Alhambra y agenda cultural",
        "texto": "Si quieres visitar la Alhambra, comprueba con antelación la disponibilidad y el horario de tu entrada. Organiza después el desplazamiento a la sala o recinto del evento. Revisa apertura de puertas y transporte de regreso para combinar patrimonio y música sin prisas.",
        "slug": "alhambra-granada",
        "enlace": "Ver la Alhambra"
      }
    ],
    "fuentes": [
      {
        "nombre": "Mirador de San Nicolás",
        "url": "https://turgranada.es/en/pois/san-nicolas-viewpoint?weather=true"
      },
      {
        "nombre": "Catedral de Granada",
        "url": "https://turgranada.es/es/pois/catedral-de-granada"
      },
      {
        "nombre": "Carmen de los Mártires",
        "url": "https://turismo.granada.org/es/areas-tematicas/bodas-palacios/carmen-martires"
      }
    ]
  }
};

export default function GuiaCorunaGranada({ ciudad }: { ciudad: keyof typeof guias }) {
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
