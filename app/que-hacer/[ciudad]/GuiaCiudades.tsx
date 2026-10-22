import Link from "next/link";
import { Fragment } from "react";

const guias = {
  "cordoba": {
    intro: "Córdoba en un día: combina la Mezquita, las calles de la Judería y las plazas de la Axerquía, reservando primero las visitas con horario. Si quieres conocer también los patios de Viana, elige qué interiores te interesan y deja margen para caminar entre zonas. Aquí tienes un recorrido flexible para enlazar patrimonio y los eventos de la agenda.",
    sections: [
      [
        "Mañana entre la Judería y la Mezquita",
        "Empieza por la [Judería de Córdoba](/lugar/juderia-de-cordoba), entre la Puerta de Almodóvar y el entorno de la [Mezquita-Catedral](/lugar/mezquita-catedral-de-cordoba-cordoba). Si quieres entrar en la Sinagoga de la calle Judíos, organiza primero esa parada: su horario ordinario publicado es de martes a domingo de 9:00 a 15:00, con excepciones festivas. Para la Mezquita, consulta el calendario del día y reserva la modalidad de visita que prefieras; la torre y la visita nocturna tienen entradas distintas."
      ],
      [
        "Del Guadalquivir a las plazas",
        "Acércate al [Puente Romano](/lugar/puente-romano-de-cordoba-cordoba) para ver el conjunto del río y la Mezquita. La Junta anunció obras de adecuación en septiembre de 2026: comprueba los avisos y la señalización antes de cruzar. Continúa hacia la [Plaza del Potro](/lugar/plaza-del-potro-cordoba) y la [Corredera](/lugar/plaza-de-la-corredera-cordoba). El paseo por estas plazas es gratuito; los museos y las consumiciones se pagan aparte cuando corresponda."
      ],
      [
        "Una tarde de patios en Viana",
        "El [Palacio de Viana](/lugar/palacio-de-viana-cordoba), en la plaza de Don Gome, permite elegir entre patios, interior o visita combinada. De septiembre a diciembre anuncia apertura de martes a sábado hasta las 19:00 y domingos y festivos hasta las 15:00, con excepciones. Reserva el interior si te interesa y consulta el recorrido adaptado. Sus patios son una visita distinta del Festival de los Patios de mayo."
      ],
      [
        "Completa el día con un concierto o un plan",
        "Consulta los eventos de Córdoba que aparecen en esta página y entra en la ficha para comprobar fecha, sala y entradas. Usa «Cómo llegar» para preparar el trayecto desde tu última visita: deja margen entre una entrada con horario y el comienzo del espectáculo. Antes de reservar, revisa también el transporte de vuelta."
      ]
    ],
    sources: [
      ["visitas de la Mezquita-Catedral", "https://mezquita-catedraldecordoba.es/organiza-la-visita/entradas-y-horarios/"],
      ["Sinagoga de Córdoba", "https://www.juntadeandalucia.es/aaiicc/enclaves/enclave-monumental-sinagoga-de-cordoba"],
      ["visitas al Palacio de Viana", "https://www.palaciodeviana.com/visitas/"],
      ["Turismo de Córdoba", "https://www.turismodecordoba.org/que-visitar"],
      ["aviso de obras del Puente Romano", "https://www.juntadeandalucia.es/organismos/fomentoymovilidad/servicios/actualidad/noticias/detalle/684199.html"]
    ]
  },
  "teruel": {
  "intro": "En Teruel puedes enlazar el mudéjar, la historia de los Amantes y un paseo por el Óvalo sin salir del centro. Organiza primero las entradas con pase horario y deja tiempo entre visitas para disfrutar de la plaza del Torico. Si llegas en tren, ten en cuenta el desnivel entre la estación y el casco histórico.",
  "sections": [
    [
      "Del Óvalo a la Torre de El Salvador",
      "La [Escalinata del Óvalo](/lugar/escalinata-ovalo-teruel) permite entrar al casco histórico disfrutando de su arquitectura neomudéjar. Desde el paseo puedes continuar hacia la [Torre de El Salvador](/lugar/torre-salvador-teruel). La visita a la torre incluye escaleras y requiere tiempo: su web recomienda un mínimo de 45 minutos."
    ],
    [
      "Los Amantes y San Pedro, con la entrada adecuada",
      "Reserva tu visita al [Mausoleo de los Amantes y conjunto de San Pedro](/lugar/mausoleo-amantes-teruel) según el pase disponible. Comprueba qué espacios incluye la modalidad elegida: la torre y el ándito forman parte de la visita completa. Consulta el recorrido accesible con la Fundación si necesitas evitar escalones."
    ],
    [
      "La plaza del Torico por encima y por debajo",
      "Dedica un rato a la plaza del Torico y sus fachadas antes de entrar en los [Aljibes medievales](/lugar/aljibes-medievales-teruel), cuyo acceso está en Ramón y Cajal. La taquilla cierra media hora antes que el recinto; no ajustes la llegada al final del horario. Consulta las excepciones de apertura durante las fiestas."
    ],
    [
      "Cómo llegar a tu evento",
      "Usa «Cómo llegar» en la ficha del evento y comprueba la dirección exacta de la sala: no todos los recintos están dentro del casco histórico. Calcula el trayecto desde tu última visita y distingue apertura de puertas de comienzo del espectáculo. Si dependes de tren o autobús, revisa el regreso y deja margen para los desniveles."
    ]
  ],
  "sources": [
    [
      "visitas a la Torre de El Salvador",
      "https://www.teruelmudejar.com/"
    ],
    [
      "entradas de los Amantes",
      "https://amantesdeteruel.es/entradas/"
    ],
    [
      "horarios de los Aljibes",
      "https://www.aljibemedieval.com/"
    ]
  ]
},
  "zamora": {
  "intro": "Zamora permite combinar la catedral, la fortaleza y la escultura de Baltasar Lobo en una misma zona del casco histórico. Si quieres bajar hacia el Duero, reserva margen para los desniveles y para volver al centro antes de tu evento. Organiza primero las visitas con horario y deja el paseo entre plazas para los huecos del día.",
  "sections": [
    [
      "La catedral y las calles del casco histórico",
      "Empieza por la [Catedral del Salvador](/lugar/catedral-salvador-zamora) y continúa por el [casco histórico](/lugar/casco-historico-zamora-zamora). Comprueba el calendario de la visita cultural y las celebraciones religiosas. La entrada conjunta anunciada incluye el Museo Diocesano, pero está en Santo Tomé y tiene su propio horario; no lo confundas con el Museo Catedralicio."
    ],
    [
      "Castillo y Museo Baltasar Lobo",
      "El [Castillo de Zamora](/lugar/castillo-zamora) y el [Museo Baltasar Lobo](/lugar/museo-baltasar-lobo-zamora) permiten combinar patrimonio y escultura sin cambiar de zona. Puedes añadir un paseo por los jardines. El acceso al recinto y a la Casa de los Gigantes depende del horario: no presupongas que están abiertos porque puedas pasear por el exterior."
    ],
    [
      "El Duero y las Aceñas de Olivares",
      "Las [Aceñas de Olivares](/lugar/acenas-olivares-zamora) muestran la relación de Zamora con los molinos del río. Google Maps indica cierre temporal en la consulta del 19/10/2026: confirma la reapertura antes de planear la visita interior. Para pasear por la ribera, respeta los avisos por el nivel del agua y cuenta con el desnivel de regreso al casco histórico."
    ],
    [
      "Del paseo a tu concierto o espectáculo",
      "Comprueba la dirección exacta del recinto y usa «Cómo llegar» en la ficha del evento. Deja margen entre la última visita y la apertura de puertas, especialmente si bajas al río. Si regresas en transporte público, revisa el último servicio antes de organizar el día; las estaciones y las salas no tienen por qué quedar junto a las visitas del casco histórico."
    ]
  ],
  "sources": [
    [
      "visita a la catedral",
      "https://catedralzamora.com/visita/"
    ],
    [
      "horarios municipales actualizados",
      "https://www.turismo-zamora.com/horarios-y-entradas-a-museos-y-monumentos.html"
    ],
    [
      "Museo Baltasar Lobo",
      "https://museobaltasarlobo.es/visita/"
    ]
  ]
},
  "lugo": {
  "intro": "En Lugo puedes combinar un paseo por la muralla con la catedral y la arqueología del casco histórico antes de un evento. Organiza primero las visitas de interior según su apertura y deja margen para recorrer las plazas y llegar a la sala. La cercanía entre estos lugares permite elegir pocas paradas y disfrutarlas con calma.",
  "sections": [
    [
      "Un tramo de la muralla y la catedral",
      "Empieza por la [Muralla romana](/lugar/muralla-romana-lugo) y escoge un tramo del adarve. Respeta los avisos de conservación y comprueba dónde subir y bajar. Continúa hacia la [Catedral de Santa María](/lugar/catedral-santa-maria-lugo): la visita cultural tiene entrada y calendario propios, y puede variar por las celebraciones religiosas."
    ],
    [
      "La ciudad romana bajo tus pies",
      "La [Domus del Mitreo](/lugar/domus-mitreo-lugo), junto a la catedral, permite conocer restos de una vivienda y un espacio de culto romano. Comprueba el horario y reserva si buscas una visita guiada. Los lunes cierra y los domingos la apertura ordinaria es solo de mañana."
    ],
    [
      "Casa de los Mosaicos: confirma la apertura",
      "La [Casa de los Mosaicos](/lugar/casa-mosaicos-lugo) conserva restos de otra vivienda romana en Rúa Doutor Castro. Google Maps indica cierre temporal en la consulta del 19/10/2026, aunque la web municipal mantiene horarios habituales. Confirma la reapertura antes de incluir la visita interior en tu plan; mientras tanto, puedes pasear por las calles y plazas del casco histórico."
    ],
    [
      "Del casco histórico al evento",
      "Comprueba la dirección exacta del recinto: no todos los eventos se celebran dentro de la muralla. Usa «Cómo llegar» en la ficha para calcular el trayecto desde tu última parada y distingue la apertura de puertas del comienzo del espectáculo. Revisa también el regreso si dependes del autobús, el tren o un taxi."
    ]
  ],
  "sources": [
    [
      "visita cultural a la catedral",
      "https://catedraldelugo.es/horarios-y-precios-de-la-visita/"
    ],
    [
      "horarios de la Domus del Mitreo",
      "https://adomusdomitreo.com/horarios-y-tarifas-2/"
    ],
    [
      "Casa de los Mosaicos en el Concello",
      "https://concellodelugo.gal/es/localizaciones/casa-de-los-mosaicos"
    ]
  ]
},
  "palencia": {
  "intro": "Palencia permite combinar la catedral, las calles del centro y un descanso entre los árboles de Huerta de Guadián antes de un evento. Organiza primero las visitas con horario y reserva margen para pasear entre las distintas zonas, sin ajustar la última entrada a la apertura de puertas de tu concierto o espectáculo.",
  "sections": [
    [
      "Catedral y paseo por el centro",
      "Empieza por la [Catedral de San Antolín](/lugar/catedral-san-antolin-palencia) y su entorno. Para visitar el interior, comprueba el calendario y el último acceso; la visita guiada y la subida al triforio tienen condiciones propias. Continúa después hacia la Calle Mayor y la Plaza Mayor."
    ],
    [
      "San Miguel y la Casa del Cordón",
      "La [Iglesia de San Miguel](/lugar/iglesia-san-miguel-palencia) y el [Museo de Palencia](/lugar/museo-palencia-casa-del-cordon) permiten combinar arquitectura y arqueología. Respeta las celebraciones del templo y organiza el museo según su horario: los domingos la apertura publicada es solo de mañana."
    ],
    [
      "Huerta de Guadián: una pausa entre árboles",
      "El [Parque Huerta de Guadián](/lugar/parque-huerta-guadian-palencia) es una opción para descansar o pasear. En su interior encontrarás la iglesia de San Juan Bautista y el Punto de Información del Románico. Consulta por separado la apertura de ese espacio; el jardín y la visita interior no comparten necesariamente horario."
    ],
    [
      "De la visita al evento",
      "Comprueba la dirección de la sala y usa «Cómo llegar» en la ficha del evento para calcular el trayecto desde tu última parada. Distingue la apertura de puertas del inicio del espectáculo. Si dependes del tren o del autobús, revisa la hora de regreso antes de organizar el recorrido."
    ]
  ],
  "sources": [
    [
      "visitas a la catedral",
      "https://catedraldepalencia.org/"
    ],
    [
      "horarios del Museo de Palencia",
      "https://turismo.aytopalencia.es/es/poi/museo-de-palencia-casa-del-cordon"
    ],
    [
      "Punto de Información del Románico",
      "https://turismo.aytopalencia.es/es/node/punto-de-informacion-del-romanico-en-palencia"
    ]
  ]
},
  "ourense": {
  "intro": "Ourense permite combinar las fuentes de As Burgas, el casco histórico y un paseo junto al Miño antes de un evento. Organiza primero las visitas con horario y deja las paradas al aire libre para completar el recorrido. El baño termal requiere comprobar por separado qué instalaciones están disponibles.",
  "sections": [
    [
      "As Burgas y el casco histórico",
      "Empieza en [As Burgas](/lugar/as-burgas-ourense) y continúa hacia la Praza Maior. Las fuentes y su entorno permiten conocer la ciudad termal; visitar esta zona no garantiza que la piscina esté abierta. Confirma el estado del recinto si tu plan incluye bañarte."
    ],
    [
      "Catedral: reservar tiempo para el interior",
      "La [Catedral de San Martiño](/lugar/catedral-san-martino-ourense) reúne el Pórtico del Paraíso y la Capilla del Santo Cristo. Consulta la visita cultural y accede por el Patín de Juan de Austria. Comprueba el último acceso y distingue la entrada general de las visitas especiales a las cubiertas."
    ],
    [
      "San Francisco y el paseo hasta el Miño",
      "El [Claustro de San Francisco](/lugar/claustro-san-francisco-ourense) merece una parada para observar sus capiteles; verifica el horario antes de subir. Si te queda tiempo, organiza otro tramo hacia [Ponte Vella](/lugar/ponte-vella-ourense) y las orillas del Miño. Calcula los desplazamientos entre ambas zonas."
    ],
    [
      "Llegar al evento con margen",
      "Comprueba la dirección exacta del recinto y la apertura de puertas. Usa «Cómo llegar» en la ficha del evento para calcular el trayecto desde tu última visita. Si llegas a Ourense en tren o autobús, incluye el desplazamiento desde la estación y revisa también las opciones de regreso."
    ]
  ],
  "sources": [
    [
      "visita cultural de la catedral",
      "https://catedralourense.com/tarifas-y-horarios-de-la-visita/"
    ],
    [
      "As Burgas en Turismo de Galicia",
      "https://www.turismo.gal/recurso/-/detalle/17641/as-burgas?langId=es_ES"
    ],
    [
      "Ponte Vella en Turismo de Galicia",
      "https://www.turismo.gal/recurso/-/detalle/7387/ponte-vella?langId=es_ES"
    ]
  ]
},
  "cartagena": {
  "intro": "Cartagena permite combinar arqueología y vistas del puerto antes de un evento. Escoge dos o tres visitas según el tiempo disponible y organiza las entradas por separado: el teatro, el foro, la muralla y el castillo tienen recorridos y condiciones propios.",
  "sections": [
    [
      "Del museo al Teatro Romano",
      "Empieza en el [Museo del Teatro Romano](/lugar/museo-teatro-romano-cartagena), con entrada por la plaza del Ayuntamiento. El recorrido conduce hasta el teatro; reserva tiempo para las salas y comprueba el horario del domingo, que es más corto que el de otros días."
    ],
    [
      "Foro Romano y Muralla Púnica",
      "El [Museo Foro Romano Molinete](/lugar/museo-foro-romano-molinete-cartagena) y la [Muralla Púnica](/lugar/muralla-punica-cartagena) permiten acercarte a dos etapas de la ciudad. Elige el orden según la apertura y tu punto de llegada. Revisa los abonos oficiales si quieres visitar varios centros."
    ],
    [
      "Castillo de la Concepción: prever la subida",
      "El [Castillo de la Concepción](/lugar/castillo-de-la-concepcion-cartagena) añade vistas del puerto y una visita histórica. Distingue la entrada al castillo de la modalidad con ascensor y consulta los avisos del día: el tiempo o una actividad especial pueden modificar el servicio y el cierre."
    ],
    [
      "Del casco histórico al evento",
      "Deja margen entre la última visita y la apertura de puertas. Comprueba la dirección exacta de la sala y usa «Cómo llegar» en la ficha del evento; no todos los recintos están junto al casco histórico. Si dependes de transporte público, revisa también el servicio de regreso."
    ]
  ],
  "sources": [
    [
      "horarios, tarifas y abonos oficiales",
      "https://puertodeculturas.cartagena.es/horarios_tarifas.asp"
    ],
    [
      "visita al Teatro Romano",
      "https://puertodeculturas.cartagena.es/ficha_teatro_romano.asp"
    ],
    [
      "acceso al Castillo de la Concepción",
      "https://puertodeculturas.cartagena.es/ficha_castillo.asp"
    ]
  ]
},
  "barcelona": {
  "intro": "En Barcelona puedes combinar arquitectura de Gaudí, jardines y miradores, pero conviene elegir una zona y reservar las visitas con hora antes de organizar el día. Montjuïc y el Turó de la Rovira son salidas distintas: calcula sus desplazamientos y deja margen para llegar a tu evento.",
  "sections": [
    [
      "Sagrada Família y Park Güell: organizar las reservas",
      "La [Sagrada Família](/lugar/sagrada-familia-barcelona) y el [Park Güell](/lugar/park-guell-barcelona) tienen entradas y condiciones de acceso propias. Reserva en sus webs oficiales y comprueba el día, la franja y la modalidad elegida. No están uno junto al otro: deja tiempo para el traslado y evita encadenar dos reservas demasiado ajustadas."
    ],
    [
      "Montjuïc: jardines de cactus y vistas al mar",
      "Los [jardines de Mossèn Costa i Llobera](/lugar/jardines-de-mossen-costa-i-llobera-el-desierto-con-vistas-al-mar-barcelona) son una opción para dedicar el paseo a la ladera de Montjuïc. Observa la colección de cactus y otras plantas suculentas y el paisaje del puerto. Consulta los accesos y el horario del jardín; lleva agua y adapta el recorrido al calor y a las pendientes."
    ],
    [
      "Turó de la Rovira: historia y vistas con horario",
      "El [Turó de la Rovira](/lugar/bunkers-del-carmel-turo-de-la-rovira-barcelona), conocido por sus antiguas baterías antiaéreas, combina memoria histórica y vistas de la ciudad. Consulta el horario vigente del recinto del MUHBA antes de subir: no es un mirador abierto toda la noche. Respeta las indicaciones y el descanso del vecindario; el atardecer no garantiza que el acceso siga abierto."
    ],
    [
      "Llegar a la sala sin prisas",
      "Comprueba dónde está el recinto y calcula el trayecto desde la última visita, especialmente si estás en una de las colinas. Revisa las conexiones de metro y autobús y el servicio de regreso para el día del evento. Usa «Cómo llegar» en su ficha y distingue la apertura de puertas del inicio del espectáculo."
    ]
  ],
  "sources": [
    [
      "entradas oficiales de la Sagrada Família",
      "https://sagradafamilia.org/es/tickets"
    ],
    [
      "acceso y reservas del Park Güell",
      "https://parkguell.barcelona/index.php/es/planifica-la-visita/faqs"
    ],
    [
      "Turó de la Rovira en el Ayuntamiento",
      "https://ajuntament.barcelona.cat/gracia/es/guia-del-distrito/equipamientos-por-temas/listado/muhba-museu-dhistoria-de-barcelona-turo-de-la-rovira-99400267435"
    ],
    [
      "jardines de Mossèn Costa i Llobera",
      "https://guia.barcelona.cat/ca/detall/jardins-de-mossen-costa-i-llobera_99400181025.html"
    ]
  ]
},
  "madrid": {
  "intro": "Madrid se disfruta mejor escogiendo una zona para cada tramo del día. Puedes combinar jardines, patrimonio y una visita interior antes del concierto, dejando tiempo para llegar al recinto: las distancias entre barrios hacen poco práctico intentar verlo todo en un solo paseo.",
  "sections": [
    [
      "La Latina y los jardines junto al Palacio Real",
      "Haz una parada en el [Jardín del Príncipe de Anglona](/lugar/jardin-del-principe-de-angola-madrid), junto a la plaza de la Paja. Si continúas hacia los [Jardines del Campo del Moro](/lugar/jardines-del-campo-del-moro-madrid), consulta los accesos abiertos y el horario: estar junto al Palacio Real no significa que puedas entrar al jardín por cualquier lado."
    ],
    [
      "La Florida: Goya y un paseo junto al río",
      "La [Ermita de San Antonio de la Florida](/lugar/ermita-de-san-antonio-de-la-florida-madrid) permite acercarte a los frescos de Goya y enlazar la visita con el entorno de Príncipe Pío y el Manzanares. Comprueba la apertura del museo antes de salir y reserva después un tramo para pasear, sin ajustar la visita al comienzo de tu evento."
    ],
    [
      "Debod y Parque del Oeste",
      "El [Templo de Debod](/lugar/templo-de-debod-madrid) y la [Rosaleda del Parque del Oeste](/lugar/rosaleda-del-parque-del-oeste-madrid) ofrecen dos paradas distintas en esta zona. Separa el paseo exterior de la visita al templo, cuyo aforo es limitado y requiere consultar la reserva. La floración de la rosaleda depende de la época; no planifiques la visita esperando encontrarla siempre en flor."
    ],
    [
      "Cómo llegar al concierto y volver",
      "Consulta la dirección exacta de la sala, la apertura de puertas y la hora del espectáculo. Elige el último lugar del paseo en función de ese trayecto y comprueba Metro, Cercanías o autobús para tu fecha, también a la vuelta. Usa «Cómo llegar» en la ficha del evento; los recintos del área de Madrid pueden estar lejos del centro."
    ]
  ],
  "sources": [
    [
      "accesos del Campo del Moro en Turismo de Madrid",
      "https://www.esmadrid.com/informacion-turistica/campo-del-moro"
    ],
    [
      "visita al Templo de Debod",
      "https://citycard.esmadrid.com/business/view/templo-de-debod"
    ],
    [
      "Ermita de San Antonio de la Florida",
      "https://citycard.esmadrid.com/negocio/ver/san-antonio-de-la-florida"
    ]
  ]
},
  "caceres": {
  "intro": "Cáceres permite enlazar plazas y patrimonio en un paseo por el casco histórico antes de tu evento. Empieza por la Plaza Mayor y organiza las visitas interiores según su disponibilidad: Bujaco y el museo tienen avisos de cierre que conviene comprobar antes de salir.",
  "sections": [
    [
      "Plaza Mayor y el exterior de Bujaco",
      "Empieza en la [Plaza Mayor](/lugar/plaza-mayor-caceres), observa los soportales y acércate a la [Torre de Bujaco](/lugar/torre-de-bujaco-caceres). Puedes disfrutar de su exterior; Google Maps indica cierre temporal del interior en la consulta del 17/10/2026. Confirma la reapertura antes de planear la subida."
    ],
    [
      "Santa María: una visita con entrada propia",
      "Continúa hacia la [Concatedral de Santa María](/lugar/concatedral-santa-maria-caceres). Revisa el horario turístico y distingue la visita con audioguía de las modalidades especiales. Las celebraciones religiosas pueden afectar al acceso; comprueba también las condiciones si quieres subir al campanario."
    ],
    [
      "Las Veletas y el museo: comprobar las obras",
      "El [Museo de Cáceres y su aljibe](/lugar/museo-de-caceres) añaden una parada patrimonial al recorrido. Hay avisos de cierre y obras: llama al 927 010 877 para confirmar las salas disponibles y el acceso al aljibe. Si no abre, puedes contemplar el entorno exterior de la plaza de las Veletas."
    ],
    [
      "Del paseo al evento, con margen",
      "Consulta la dirección exacta del recinto y la apertura de puertas antes de elegir tu última parada. Usa «Cómo llegar» en la ficha del evento y reserva tiempo para desplazarte. Si necesitas un itinerario sin escalones, confirma los accesos de los monumentos; no todas las visitas interiores ofrecen las mismas condiciones."
    ]
  ],
  "sources": [
    [
      "patrimonio en Vive Cáceres",
      "https://vivecaceres.com/plaza-mayor-caceres.php"
    ],
    [
      "visitas a la concatedral",
      "https://concatedralcaceres.com/horarios-y-precios-de-la-visita/"
    ],
    [
      "aviso del Museo de Cáceres en Spain.info",
      "https://www.spain.info/es/lugares-interes/museo-caceres/"
    ]
  ]
},
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
