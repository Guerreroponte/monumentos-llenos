import Link from "next/link";
import { Fragment } from "react";

const guias = {
  "benavente": {
    "intro": "Benavente permite enlazar patrimonio religioso y arquitectura civil por el centro antes de un evento. Organiza las visitas interiores según su apertura y deja el paseo por las plazas para el resto del recorrido.",
    "sections": [
        [
            "Santa María del Azogue: empezar por la plaza",
            "La [iglesia de Santa María del Azogue](/lugar/iglesia-santa-maria-del-azogue-benavente) es una primera parada para observar el exterior y decidir si entrar. Comprueba el horario turístico de tu día; las celebraciones religiosas pueden alterar el acceso."
        ],
        [
            "San Juan del Mercado: otra mirada al románico",
            "Continúa hacia [San Juan del Mercado](/lugar/iglesia-san-juan-del-mercado-benavente) y fíjate en su portada de la Epifanía. Consulta la entrada conjunta de las dos iglesias y confirma las condiciones antes de organizar las visitas."
        ],
        [
            "Casa del Cervato y plaza del Grano",
            "La [Casa del Cervato](/lugar/casa-del-cervato-benavente) aporta una parada de arquitectura civil: balcones, miradores y una veleta singular. Esta propuesta se centra en la fachada; el acceso al interior requiere confirmación."
        ],
        [
            "Llegar al evento con margen",
            "Comprueba la dirección del recinto y la apertura de puertas en la ficha del evento. Si viajas en coche, organiza el aparcamiento por separado: no se ha confirmado una plaza de estacionamiento asociada a estos monumentos. Para dudas sobre visitas y festivos, contacta con Turismo de Benavente, 980 634 211."
        ]
    ],
    "sources": [
        [
            "horarios de Turismo de Benavente",
            "https://turismobenavente.es/prepara-tu-visita/horarios/"
        ],
        [
            "visita a San Juan del Mercado en Turismo de Castilla y León",
            "https://www.turismocastillayleon.com/es/patrimonio-cultura/iglesias-ermitas/iglesia-san-juan-mercado"
        ]
    ]
},
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
  },
  "oviedo": {
    "intro": "En Oviedo puedes combinar el casco antiguo y el Campo de San Francisco en un paseo por el centro. El Naranco merece un plan aparte: calcula el desplazamiento y la vuelta antes de enlazarlo con un concierto o una función.",
    "sections": [
      [
        "La Catedral y las calles del casco antiguo",
        "Empieza junto a la [Catedral de San Salvador](/lugar/catedral-de-san-salvador-oviedo) y recorre las calles de su entorno. La plaza permite disfrutar del exterior; si quieres entrar al templo o conocer la Cámara Santa, revisa las modalidades de visita y reserva tiempo para el recorrido. Respeta los horarios de culto."
      ],
      [
        "Una pausa en el Campo de San Francisco",
        "El [Campo de San Francisco](/lugar/campo-de-san-francisco-oviedo) permite cambiar las calles por paseos arbolados sin salir del centro. Puedes buscar la escultura de Mafalda o elegir un recorrido corto entre sus jardines. Es una parada cómoda para descansar antes de continuar con la agenda cultural."
      ],
      [
        "Santa María del Naranco, con margen",
        "La visita a [Santa María del Naranco](/lugar/santa-maria-del-naranco-oviedo) lleva a la ladera del monte y al patrimonio prerrománico asturiano. Comprueba cómo llegar y las condiciones para visitar el interior. Evita ajustar el regreso a la hora de apertura de puertas de tu evento; el desplazamiento forma parte del plan."
      ],
      [
        "Del paseo a tu evento",
        "Comprueba si el recinto está en el centro o necesita un desplazamiento adicional. Para moverte en autobús, consulta el servicio del día y la última salida de vuelta. Usa «Cómo llegar» en la ficha del evento y deja tiempo para recoger entradas, acceder al recinto y encontrar tu localidad."
      ]
    ],
    "sources": [
      [
        "Oviedo en Turismo Asturias",
        "https://www.turismoasturias.es/organiza-tu-viaje/donde-ir/comarcas/oviedo"
      ],
      [
        "visita a Santa María del Naranco",
        "https://www.turismoasturias.es/descubre/cultura/prerromanico/santa-maria-del-naranco"
      ]
    ]
  },
  "badajoz": {
    "intro": "Badajoz permite enlazar el patrimonio de su zona alta con un paseo hacia el Guadiana. Organiza la Alcazaba y la Plaza Alta juntas, y reserva otro tramo para Puerta de Palmas antes de dirigirte al recinto de tu evento.",
    "sections": [
      [
        "La Alcazaba y sus accesos",
        "Recorre el entorno de la [Alcazaba de Badajoz](/lugar/alcazaba-de-badajoz) para descubrir puertas, torres y vistas sobre la ciudad. Lleva calzado cómodo para las pendientes y consulta los espacios abiertos al público. En días calurosos, elige las horas más suaves y lleva agua."
      ],
      [
        "Una parada en Plaza Alta",
        "La [Plaza Alta](/lugar/plaza-alta-badajoz) es una continuación natural del paseo por el entorno de la Alcazaba. Detente bajo sus soportales y observa las fachadas decoradas. Puedes disfrutar del espacio exterior y seguir por las calles del casco histórico; si hay una actividad en la plaza, comprueba su programación y accesos."
      ],
      [
        "Puerta de Palmas y el Guadiana",
        "Acércate a la [Puerta de Palmas](/lugar/puerta-de-palmas-badajoz), frente al puente del mismo nombre, para cambiar el paisaje del casco antiguo por el entorno del río. La parada propuesta es exterior. Utiliza las zonas peatonales y los pasos habilitados, y calcula el trayecto de vuelta antes de alargar el paseo."
      ],
      [
        "Cómo organizar la llegada al concierto",
        "La ubicación de cada sala puede cambiar por completo el final de la ruta. Comprueba la dirección exacta, el acceso y la apertura de puertas; si necesitas transporte, revisa también la vuelta. Usa el enlace «Cómo llegar» del evento y deja margen para bajar desde la zona alta de la ciudad."
      ]
    ],
    "sources": [
      [
        "Alcazaba y murallas en Turismo de Badajoz",
        "https://turismo.aytobadajoz.es/alcazaba-y-murallas/"
      ],
      [
        "Puerta de Palmas en el Ayuntamiento",
        "https://www.aytobadajoz.es/es/ayto/monumentos/puerta-de-palmas"
      ]
    ]
  },
  "logrono": {
    "intro": "En Logroño puedes combinar la Concatedral, la historia del vino en Ruavieja y un paseo junto al Ebro. El centro permite enlazar estas paradas, pero conviene consultar primero los horarios de las visitas interiores y la ubicación de tu evento.",
    "sections": [
      [
        "La Redonda y la plaza del Mercado",
        "La [Concatedral de Santa María de la Redonda](/lugar/concatedral-de-santa-maria-de-la-redonda-logrono) es una buena referencia para empezar por el casco antiguo. Contempla sus torres desde la plaza y continúa por las calles cercanas. Para visitar el interior, comprueba el horario del templo y las celebraciones religiosas."
      ],
      [
        "El vino bajo la calle Ruavieja",
        "El [Calado de San Gregorio](/lugar/calado-de-san-gregorio-logrono) acerca al pasado vitivinícola de la ciudad desde una bodega histórica. Consulta las condiciones de acceso y su relación con la visita al Espacio Lagares. No presupongas que cualquier hora del paseo sirve para entrar: los horarios cambian según la temporada."
      ],
      [
        "Una pausa junto al Ebro",
        "El [Parque del Ebro](/lugar/parque-del-ebro-logrono) ofrece un tramo verde cerca del casco antiguo. Elige un recorrido junto al río según el tiempo que tengas, sin necesidad de prolongarlo por toda la ribera. Atiende a la meteorología y a las indicaciones municipales antes de bajar a los paseos."
      ],
      [
        "De la ruta al recinto",
        "Sitúa la sala o el teatro en el mapa antes de decidir dónde terminar el paseo. Comprueba la hora de apertura de puertas y el transporte de regreso, especialmente si el evento acaba tarde. El enlace «Cómo llegar» de cada ficha permite calcular el desplazamiento desde tu última parada."
      ]
    ],
    "sources": [
      [
        "patrimonio en Visit Logroño",
        "https://visitalogrono.com/-/concatedral-de-santa-maria-de-la-redonda"
      ],
      [
        "Calado de San Gregorio en el Ayuntamiento",
        "https://logrono.es/-/calado-de-san-gregorio"
      ]
    ]
  },
  "soria": {
    "intro": "Soria ofrece dos ritmos: el paseo céntrico por La Dehesa y las visitas junto al Duero. Reserva tiempo para desplazarte entre el centro y la ribera, y ajusta la ruta a los horarios de los monumentos y de tu evento.",
    "sections": [
      [
        "San Juan de Duero: mirar sus arcos",
        "El [Monasterio de San Juan de Duero](/lugar/monasterio-de-san-juan-de-duero-soria) conserva una iglesia y un claustro con arcos de formas muy distintas. Recorre sus lados con calma y comprueba el horario de temporada antes de ir. La visita al recinto y el paseo exterior por el río tienen condiciones diferentes."
      ],
      [
        "El paseo hasta San Saturio",
        "La [ermita de San Saturio](/lugar/ermita-de-san-saturio-soria) combina el paisaje del Duero con un recorrido interior entre grutas y salas. Ten en cuenta los desniveles y escaleras, y consulta el último acceso. Calcula tanto la ida como el regreso al centro antes de combinarla con una función."
      ],
      [
        "La Dehesa, sin salir del centro",
        "La [Alameda de Cervantes](/lugar/alameda-de-cervantes-soria), conocida como La Dehesa, permite hacer una pausa cerca de la plaza de Mariano Granados. Sus paseos, fuentes y zonas arboladas encajan en una ruta corta. Elige un recorrido acorde con la estación y el tiempo disponible."
      ],
      [
        "Cómo llegar a tiempo al evento",
        "No calcules el trayecto desde la ribera como si estuvieras ya en el centro. Comprueba la dirección del recinto, la apertura de puertas y el medio de transporte de vuelta. Usa «Cómo llegar» en la ficha y reserva margen para el regreso, especialmente al anochecer o con mal tiempo."
      ]
    ],
    "sources": [
      [
        "San Saturio en Turismo Soria",
        "https://www.turismosoria.es/que-ver/monumentos/ermita-de-san-saturio/"
      ],
      [
        "San Juan de Duero en Turismo de Castilla y León",
        "https://www.turismocastillayleon.com/es/patrimonio-cultura/monasterio-san-juan-duero"
      ]
    ]
  },
  "albacete": {
    "intro": "En Albacete puedes combinar arquitectura del centro, la tradición cuchillera y un paseo por el Parque Abelardo Sánchez. Organiza primero la visita al museo y deja las paradas exteriores para completar el recorrido antes de tu evento.",
    "sections": [
      [
        "Lodares: mirar hacia arriba",
        "El [Pasaje de Lodares](/lugar/pasaje-de-lodares-albacete) invita a detenerse bajo su cubierta de cristal y observar balcones, columnas y detalles decorativos. Es una galería comercial con espacios privados: respeta los accesos y distingue el horario del pasaje del de sus establecimientos."
      ],
      [
        "El oficio que identifica a Albacete",
        "El [Museo de la Cuchillería](/lugar/museo-de-la-cuchilleria-albacete), en la Casa de Hortelano junto a la Catedral, permite conocer herramientas, piezas y técnicas de este oficio. Comprueba las tarifas y los horarios antes de ir. La fachada del edificio también merece una parada en el paseo por el centro."
      ],
      [
        "Descansar en Abelardo Sánchez",
        "El [Parque Abelardo Sánchez](/lugar/parque-abelardo-sanchez-albacete) ofrece senderos arbolados y espacios para hacer una pausa. Puedes elegir un paseo breve o ampliarlo según el tiempo disponible. Si quieres entrar al Museo de Albacete, situado dentro del parque, consulta su horario por separado."
      ],
      [
        "Del centro a la sala",
        "Confirma la dirección exacta del teatro o sala: tener un evento en Albacete no significa que esté junto a estas visitas. Usa «Cómo llegar» en la ficha, comprueba la apertura de puertas y calcula el regreso si dependes del transporte público. Deja margen para terminar el paseo y acceder al recinto."
      ]
    ],
    "sources": [
      [
        "Museo de la Cuchillería",
        "https://www.museocuchilleria.es/"
      ],
      [
        "Pasaje de Lodares en Turismo de Castilla-La Mancha",
        "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/monumentos/albacete/pasaje-de-lodares"
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
