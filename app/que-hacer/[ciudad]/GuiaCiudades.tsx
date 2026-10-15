import Link from "next/link";
import { Fragment } from "react";

const guias = {
  "valladolid": {
    "intro": "En Valladolid puedes combinar el centro histórico, una visita de museo y una pausa en el Campo Grande antes de tu evento. Escoge el recorrido según el tiempo disponible y comprueba dónde está el recinto para organizar el final del día.",
    "sections": [
      [
        "Plaza Mayor, Catedral y La Antigua",
        "Empieza en la [Plaza Mayor](/lugar/plaza-mayor-valladolid) y continúa hacia la [Catedral](/lugar/catedral-valladolid) y [La Antigua](/lugar/iglesia-de-santa-maria-la-antigua-valladolid). Puedes disfrutar de sus exteriores en un paseo por el centro. Si quieres entrar, comprueba los horarios de cada templo y distingue la visita al museo o a la torre."
      ],
      [
        "Una visita al Museo Nacional de Escultura",
        "Reserva un tramo del día para el [Museo Nacional de Escultura](/lugar/museo-nacional-de-escultura-valladolid), en el Colegio de San Gregorio. La fachada y la colección de madera policromada ofrecen dos formas de acercarse al edificio. Revisa qué sedes incluye la entrada y el horario de cierre antes de enlazarlo con otro plan."
      ],
      [
        "Campo Grande: una pausa entre visitas",
        "El [Campo Grande](/lugar/campo-grande-valladolid) permite cambiar las calles por senderos arbolados, fuentes y el entorno del estanque. Elige un paseo corto si después tienes una función; no hace falta recorrer todo el parque para disfrutarlo. Adapta la salida a la meteorología y a los accesos abiertos."
      ],
      [
        "Cómo organizar la llegada al evento",
        "Comprueba la dirección exacta del teatro o sala y calcula el trayecto desde tu última parada. Si necesitas autobús, consulta el servicio del día y la vuelta después del espectáculo. Distingue la apertura de puertas de la hora de inicio y utiliza «Cómo llegar» en la ficha del evento."
      ]
    ],
    "sources": [
      [
        "patrimonio en Turismo de Valladolid",
        "https://info.valladolid.es/disfruta/patrimonio"
      ]
    ]
  },
  "alicante": {
    "intro": "Alicante permite combinar patrimonio y un paseo junto al mar. Puedes dedicar una parte del día al Benacantil y otra al frente marítimo; deja margen para bajar del castillo y desplazarte al recinto de tu evento.",
    "sections": [
      [
        "El Castillo de Santa Bárbara, con tiempo",
        "El [Castillo de Santa Bárbara](/lugar/castillo-de-santa-barbara-alicante) reúne recintos históricos y vistas de la ciudad y el puerto. Comprueba los accesos habilitados y las condiciones del ascensor antes de subir. Lleva agua y protección solar, y evita ajustar la visita al último minuto antes de un concierto."
      ],
      [
        "La Explanada y el puerto",
        "Recorre la [Explanada de España](/lugar/explanada-de-espana-alicante) entre palmeras y su mosaico de ondas. Puedes detenerte a observar la Casa Carbonell y continuar por el frente portuario. La Concha acoge programación cultural, pero conviene consultar la agenda: visitar el paseo no implica encontrar una actuación ese día."
      ],
      [
        "Postiguet y paseo de Gómiz",
        "La [playa del Postiguet](/lugar/playa-del-postiguet-alicante) permite hacer una pausa cerca del centro y al pie del Benacantil. Puedes elegir el arenal o caminar por el paseo de Gómiz. Para bañarte, consulta el estado del mar; los servicios de temporada y las condiciones para mascotas requieren revisar la información municipal."
      ],
      [
        "Cómo moverte y llegar al concierto",
        "Combina el recorrido a pie con autobús o TRAM según la ubicación del recinto. Comprueba la parada más útil y el último servicio de regreso para la fecha del evento. Usa «Cómo llegar» en su ficha y deja margen entre el paseo, la apertura de puertas y el comienzo de la actuación."
      ]
    ],
    "sources": [
      [
        "Explanada y accesos en Alicante City & Beach",
        "https://alicanteturismo.com/jardines/la-explanada-de-espana/"
      ],
      [
        "Castillo en el Ayuntamiento",
        "https://www.alicante.es/es/patrimonio-cultural/castillo-santa-barbara"
      ]
    ]
  },
  "gijon": {
    "intro": "En Gijón puedes alternar el frente marítimo, el cerro de Santa Catalina y una visita al Jardín Botánico. El centro y el Botánico son planes de zonas diferentes: decide cuál encaja mejor con la ubicación y el horario de tu evento.",
    "sections": [
      [
        "Cimavilla y Elogio del Horizonte",
        "Sube hacia el [Elogio del Horizonte](/lugar/elogio-del-horizonte-gijon), la escultura de Chillida en el cerro de Santa Catalina. El paseo combina arte público y vistas del Cantábrico. Ten en cuenta la subida y la exposición al viento para elegir calzado y abrigo; después puedes continuar por las calles de Cimavilla."
      ],
      [
        "San Lorenzo, también para pasear",
        "La [playa de San Lorenzo](/lugar/playa-de-san-lorenzo-gijon) se disfruta desde la arena o desde el paseo marítimo. Escoge un tramo según el tiempo disponible y recuerda que las mareas cambian el espacio de playa. Si vas a bañarte, consulta las banderas y el estado del mar."
      ],
      [
        "El Botánico merece su propio recorrido",
        "El [Jardín Botánico Atlántico](/lugar/jardin-botanico-atlantico-gijon) combina colecciones vegetales, el jardín histórico de La Isla y espacios de bosque. Reserva tiempo para el desplazamiento desde el centro y para caminar por el recinto. Comprueba entradas, cierre y disponibilidad de visitas guiadas antes de acudir."
      ],
      [
        "De la visita al espectáculo",
        "Localiza el recinto antes de cerrar tu ruta: no des por hecho que está junto al paseo marítimo. Comprueba el transporte de ida y vuelta y la apertura de puertas. Si eliges el Botánico ese día, calcula el regreso con margen; el enlace «Cómo llegar» de cada ficha te ayuda a preparar el trayecto."
      ]
    ],
    "sources": [
      [
        "Turismo Asturias: Gijón",
        "https://www.turismoasturias.es/organiza-tu-viaje/donde-ir/comarcas/gijon"
      ],
      [
        "Jardín Botánico municipal",
        "https://drupal.gijon.es/es/jardin-botanico-atlantico-de-gijon"
      ]
    ]
  },
  "vitoria-gasteiz": {
    "intro": "Vitoria-Gasteiz permite enlazar la Plaza de la Virgen Blanca, el casco medieval y una pausa en La Florida. Si quieres visitar la Catedral de Santa María, organiza primero la reserva y ajusta el resto del paseo a esa hora.",
    "sections": [
      [
        "Virgen Blanca: punto de partida",
        "La [Plaza de la Virgen Blanca](/lugar/plaza-de-la-virgen-blanca-vitoria-gasteiz) es un buen lugar para empezar y observar el conjunto urbano y el monumento a la batalla de Vitoria. Desde su entorno puedes continuar hacia las calles del casco histórico. Elige el recorrido según tu ritmo y deja tiempo para las pendientes de la zona medieval."
      ],
      [
        "Santa María y Abierto por Obras",
        "La [Catedral de Santa María](/lugar/catedral-de-santa-maria-vitoria-gasteiz) permite conocer el templo y su recuperación mediante visitas organizadas. Consulta la modalidad, las condiciones de acceso y si incluye torre o pórtico. Reserva con la Fundación y sigue las indicaciones del recorrido, en lugar de contar con entrar libremente a cualquier hora."
      ],
      [
        "Un descanso en La Florida",
        "El [Parque de La Florida](/lugar/parque-de-la-florida-vitoria-gasteiz) ofrece senderos, árboles y rincones de jardín romántico para cambiar de ambiente sin alejarte del centro. Puedes dedicarle un paseo breve o detenerte a observar sus especies. Es una pausa entre visitas que conviene adaptar al tiempo disponible y a la meteorología."
      ],
      [
        "Cómo llegar al evento y volver",
        "Comprueba la ubicación de la sala y decide si el último tramo encaja a pie o requiere transporte público. Revisa el servicio de vuelta y distingue el inicio del espectáculo de la apertura de puertas. Usa «Cómo llegar» en la ficha y evita encadenar una visita guiada con un evento sin margen entre ambos."
      ]
    ],
    "sources": [
      [
        "visitas a Santa María en Turismo de Vitoria-Gasteiz",
        "https://www.vitoria-gasteiz.org/wb021/was/contenidoAction.do?idioma=es&uid=a810c37_125fceffe0c__7ff0"
      ],
      [
        "Parque de La Florida",
        "https://www.vitoria-gasteiz.org/wb021/was/contenidoAction.do?idioma=es&uid=entuo_6_1_18"
      ]
    ]
  },
  "leon": {
    "intro": "En León puedes organizar una ruta por la Catedral, San Isidoro y Casa Botines, y dejar después tiempo para tu evento. Elige qué interiores quieres visitar y comprueba sus horarios antes de decidir el orden del paseo.",
    "sections": [
      [
        "La Catedral y su entorno",
        "Empieza junto a la [Catedral de León](/lugar/catedral-leon), en la plaza de Regla, para contemplar las portadas y continuar por las calles del casco histórico. Si quieres ver las vidrieras desde dentro, consulta la entrada cultural y su horario. El museo y otros espacios pueden tener condiciones diferentes."
      ],
      [
        "San Isidoro: templo y museo",
        "La [Basílica de San Isidoro](/lugar/basilica-de-san-isidoro-leon) permite acercarse al románico y a la historia leonesa. Distingue la visita al templo de la del museo y el Panteón Real: no tienen por qué compartir acceso ni horario. Revisa la modalidad que te interesa y reserva tiempo para disfrutarla sin prisas."
      ],
      [
        "Gaudí en Casa Botines",
        "La [Casa Botines](/lugar/casa-botines-leon) es una parada para observar las torres de esquina, las ventanas y la figura de San Jorge sobre la entrada. Puedes incluir el exterior en el paseo y, si quieres conocer el museo, consultar sus entradas y recorridos. No necesitas sumar todos los interiores en una sola jornada."
      ],
      [
        "Del casco histórico al concierto",
        "Localiza la sala o teatro antes de terminar el paseo y calcula el desplazamiento desde tu última visita. Consulta transporte y regreso si el recinto queda fuera de tu ruta a pie. Comprueba la apertura de puertas, guarda la entrada y utiliza «Cómo llegar» en la ficha del evento."
      ]
    ],
    "sources": [
      [
        "monumentos en Turismo de León",
        "https://leon.es/que-ver/monumentos-de-leon/"
      ]
    ]
  }
} as const;

export function tieneGuiaCiudad(ciudad: string): ciudad is keyof typeof guias {
  return Object.hasOwn(guias, ciudad);
}

function TextoConEnlaces({ texto }: { texto: string }) {
  return texto.split(/(\[[^\]]+\]\(\/lugar\/[^)]+\))/g).map((parte, index) => {
    const enlace = parte.match(/^\[([^\]]+)\]\((\/lugar\/[^)]+)\)$/);
    return enlace ? <Link key={index} className="text-orange-700 underline" href={enlace[2]}>{enlace[1]}</Link> : <Fragment key={index}>{parte}</Fragment>;
  });
}

export default function GuiaCiudades({ ciudad }: { ciudad: keyof typeof guias }) {
  const guia = guias[ciudad];
  return (
    <div className="mt-5 space-y-6 text-base leading-8 text-slate-600">
      <p>{guia.intro}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {guia.sections.map(([titulo, texto]) => (
          <div key={titulo}>
            <h3 className="font-bold text-slate-900">{titulo}</h3>
            <p><TextoConEnlaces texto={texto} /></p>
          </div>
        ))}
      </div>
      <p className="text-sm">Información práctica: {guia.sources.map(([nombre, url], index) => (
        <Fragment key={url}>{index > 0 ? " y " : ""}<a className="text-orange-700 underline" href={url} target="_blank" rel="noopener noreferrer">{nombre}</a></Fragment>
      ))}. Horarios y condiciones pueden cambiar; compruébalos antes de salir.</p>
    </div>
  );
}
