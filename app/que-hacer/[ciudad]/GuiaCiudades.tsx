import Link from "next/link";
import { Fragment } from "react";

const guias = {
"jerez-de-la-frontera": {
  "intro": "Jerez de la Frontera en un día: combina la Catedral, el entorno del Alcázar y las plazas del centro con un paseo por San Miguel. Elige qué interiores quieres visitar y adapta el orden a sus aperturas. Deja margen para una pausa y para llegar al recinto de tu evento.",
  "sections": [
    [
      "La Catedral y el aviso de la torre",
      "Empieza junto a la [Catedral de San Salvador](/lugar/catedral-san-salvador-jerez), en la plaza de la Encarnación. Puedes contemplar el exterior antes de decidir si entrar. La web del gestor anuncia suspendidas temporalmente las visitas a la torre; comprueba ese aviso antes de comprar una modalidad que la incluya. La visita cultural y el culto tienen condiciones distintas."
    ],
    [
      "El Alcázar: organiza primero la visita interior",
      "Continúa hacia la Alameda Vieja y el [Alcázar de Jerez](/lugar/alcazar-de-jerez). Si quieres recorrer la mezquita, los baños y los jardines, prioriza su apertura: la página municipal publica horario de mañana fuera del verano. La Cámara Oscura tiene modalidad propia. Consulta horarios y avisos del Ayuntamiento, porque algunas guías generales ofrecen información diferente."
    ],
    [
      "San Miguel y una pausa en el Arenal",
      "Acércate a la [iglesia de San Miguel](/lugar/iglesia-san-miguel-jerez) y observa su exterior desde la plaza. Si entras, reserva tiempo para el retablo y respeta las celebraciones religiosas. Después puedes parar en la [Plaza del Arenal](/lugar/plaza-arenal-jerez), enlazando el barrio con las calles del centro. El paseo exterior es libre; las entradas y consumiciones se pagan aparte."
    ],
    [
      "La Asunción y el Cabildo Antiguo",
      "Desde el Arenal, continúa por Consistorio hacia el [Cabildo Antiguo](/lugar/cabildo-antiguo-jerez), en la plaza de la Asunción. La propuesta es observar su fachada desde el espacio público. Puedes prolongar el paseo hacia la Yerba y Plateros antes de volver; no presupongas que todos los edificios de las plazas admiten visita interior."
    ],
    [
      "Completa el día con la agenda",
      "Consulta los eventos de esta página y abre la ficha para comprobar la dirección del recinto, la hora y las entradas. Las visitas a bodegas, los espectáculos y otros museos requieren su propia planificación: el mapa no los incluye automáticamente. Lleva agua, busca sombra cuando haga calor y consulta los accesos si necesitas evitar escalones."
    ]
  ],
  "sources": [
    [
      "Turismo de Jerez: plazas del centro",
      "https://www.turismojerez.com/plaza-en-plaza"
    ],
    [
      "Alcázar: horarios municipales",
      "https://www.jerez.es/webs-municipales/conjunto-monumental-del-alcazar/informacion/horarios"
    ],
    [
      "Catedral: visita y avisos",
      "https://catedraldejerez.es/visita/"
    ],
    [
      "Iglesia de San Miguel",
      "https://iglesiadesanmiguel.com/"
    ],
    [
      "Cabildo Antiguo",
      "https://www.turismojerez.com/detalle-fichas/cabildo-antiguo"
    ]
  ]
},
"las-palmas-de-gran-canaria": {
  "intro": "Las Palmas de Gran Canaria en uno o dos días: dedica una primera parte a Vegueta y Triana y reserva otra franja para Las Canteras. El casco histórico y el frente de playa están en zonas distintas; organiza los desplazamientos y elige los interiores según sus horarios, dejando margen para tu evento.",
  "sections": [
    [
      "Vegueta: Santa Ana y la Catedral",
      "Empieza en la [Plaza de Santa Ana](/lugar/plaza-santa-ana-las-palmas), observa los perros de bronce y sitúa la [Catedral de Santa Ana](/lugar/catedral-santa-ana-las-palmas) frente al conjunto de edificios de la plaza. Puedes disfrutar del exterior sin comprar una entrada. Si quieres entrar, distingue la visita cultural, el Museo Diocesano y la torre: consulta qué incluye cada modalidad. La información turística publica una apertura diferente los domingos, centrada en la torre. Respeta las celebraciones religiosas."
    ],
    [
      "Dos museos para elegir con calma",
      "La [Casa de Colón](/lugar/casa-colon-las-palmas), en Colón, 1, combina arquitectura histórica y contenidos sobre Canarias y América. [El Museo Canario](/lugar/museo-canario-las-palmas), en Doctor Verneau, 2, se centra en la población prehispánica y la arqueología. Puedes enlazar sus exteriores con Santa Ana o reservar tiempo para las salas. Para horarios y tarifas, prioriza la información de cada gestor. El Museo Canario avisa de que la adaptación para movilidad reducida depende de finalizar las obras de ampliación; contacta antes si necesitas apoyos."
    ],
    [
      "Continúa por la calle Mayor de Triana",
      "Desde Vegueta puedes prolongar el paseo hacia la [calle Mayor de Triana](/lugar/calle-triana-las-palmas). Recorre un tramo de esta vía peatonal y mira las fachadas modernistas, además de los escaparates. Si tienes tiempo, continúa hacia San Telmo; si después asistes a un espectáculo, termina donde mejor te venga para el trayecto al recinto. El paseo es gratuito; compras, consumiciones y entradas se pagan por separado."
    ],
    [
      "Las Canteras merece su propio tramo del día",
      "Dedica otra franja a la [playa de Las Canteras](/lugar/playa-las-canteras-las-palmas) y su paseo marítimo. Elige entre el entorno de La Puntilla, los tramos centrales o el sector del Auditorio Alfredo Kraus según tu tiempo. No la incluyas como una parada inmediata del paseo por Vegueta: calcula el desplazamiento en guagua, taxi u otro medio y comprueba también la vuelta. Para bañarte, atiende las banderas y las indicaciones del socorrismo; para pasear, lleva agua y protección solar."
    ],
    [
      "Un paseo flexible antes del evento",
      "Para una primera visita por el casco histórico, enlaza El Museo Canario → Santa Ana y Catedral → Casa de Colón → Triana. El orden es una propuesta para caminar y puedes modificarlo según la apertura de los museos. Las visitas interiores requieren tiempo adicional. Consulta en la agenda de esta página la dirección y la hora de tu evento, y prepara el último trayecto desde donde termines el paseo."
    ]
  ],
  "sources": [
    [
      "Turismo de Las Palmas: Catedral y modalidades de visita",
      "https://lpavisit.com/atractivo/catedral-de-santa-ana/"
    ],
    [
      "Casa de Colón: información del Ayuntamiento",
      "https://www.laspalmasgc.es/es/areas-tematicas/cultura/museos-salas-de-exposiciones-y-teatros/casa-de-colon/"
    ],
    [
      "El Museo Canario: horarios, tarifas y accesibilidad",
      "https://elmuseocanario.com/informacion-general/"
    ],
    [
      "calle Triana en LPA Visit",
      "https://lpavisit.com/atractivo/calle-triana/"
    ],
    [
      "Las Canteras en Ciudad de Mar",
      "https://lpamar.laspalmasgc.es/las-playas/las-canteras/"
    ]
  ]
},
"castellon-de-la-plana": {
  "intro": "Castellón de la Plana en uno o dos días: dedica la primera jornada al centro, con la Plaza Mayor, el mercado, el Parque Ribalta y el Museo de Bellas Artes. Reserva otra franja para el Grao y el Planetari, junto al mar. Organiza primero los interiores con horario y deja los paseos al aire libre entre las visitas.",
  "sections": [
    [
      "La Plaza Mayor y El Fadrí",
      "Empieza por la [Concatedral de Santa María](/lugar/concatedral-santa-maria-castellon) y el exterior de [El Fadrí](/lugar/el-fadri-castellon). La torre está separada del templo y es una buena referencia para orientarte por el centro. Antes de subir, confirma la apertura con el MUCC en el 964 735 217: su ficha anuncia visitas de martes a sábado, pero Turismo mantiene un aviso de cierre temporal. La subida tiene unos 200 escalones y no dispone de ascensor. Para la concatedral, adapta la visita a las celebraciones religiosas."
    ],
    [
      "Mercado Central y una pausa en Ribalta",
      "Incluye el [Mercado Central](/lugar/mercado-central-castellon) por la mañana, de lunes a sábado, para ver los puestos en actividad antes de su cierre publicado a las 15:00. Después puedes continuar a pie hacia el [Parque Ribalta](/lugar/parque-ribalta-castellon), con arbolado y estanque. No hace falta convertir el paseo en una ruta rígida: deja margen para comer o descansar. Si llegas en domingo, sustituye el interior del mercado por el recorrido exterior del centro."
    ],
    [
      "Una visita al Museo de Bellas Artes",
      "El [Museo de Bellas Artes de Castellón](/lugar/museo-bellas-artes-castellon) es gratuito y permite conocer colecciones de arqueología, cerámica, etnología y arte. Abre de martes a sábado de 10:00 a 14:00 y de 16:00 a 20:00; los domingos, de 10:00 a 14:00. Elige las salas que más te interesen en vez de intentar verlo todo con prisa. Consulta el calendario de festivos y actividades. En lunes, organiza el día alrededor de los paseos exteriores y deja el museo para otra jornada."
    ],
    [
      "El Grao, el Planetari y el paseo junto al mar",
      "Dedica una franja independiente al [Planetari de Castelló](/lugar/planetari-castello), en el distrito marítimo del Grao: requiere desplazarse desde el centro. Las exposiciones son gratuitas y las proyecciones tienen tarifa general publicada de 4 euros, con reducida de 3 euros para quienes cumplan las condiciones. Reserva la sesión según su idioma y edad recomendada; no se permite entrar una vez iniciada. Cierra los lunes y las tardes de domingos y festivos. Completa el plan con un paseo junto al mar y consulta los horarios de temporada."
    ]
  ],
  "sources": [
    [
      "El Fadrí: visita y accesibilidad del MUCC",
      "https://mucc.castello.es/es/sedes/el-fadri/"
    ],
    [
      "Turismo de Castellón: monumentos y avisos de apertura",
      "https://castellonturismo.org/monumentos/"
    ],
    [
      "Mercado Central: información de visita",
      "https://mercatcentralcastello.es/"
    ],
    [
      "Museo de Bellas Artes: horarios y entrada",
      "https://mbacas.ivc.gva.es/es/el-museo/presentacion"
    ],
    [
      "Planetari: horarios y tarifas",
      "https://www.castello.es/va/planetari-informacio-general"
    ],
    [
      "Planetari: programación de proyecciones",
      "https://www.castello.es/es/proyecciones-astronomia"
    ]
  ]
},
"huelva": {
  "intro": "Huelva en uno o dos días: combina las plazas del centro con el legado británico, el Museo de Huelva y un paseo junto al Odiel. Reserva la subida al santuario de la Cinta para otra franja o para el segundo día. Organiza primero los interiores con horario y deja margen para disfrutar del muelle al atardecer.",
  "sections": [
    [
      "La Merced y San Pedro, antes de recorrer el centro",
      "Empieza por la [Catedral de la Merced](/lugar/catedral-merced-huelva), cuya entrada es gratuita, y continúa hacia la [Parroquia Mayor de San Pedro](/lugar/iglesia-san-pedro-huelva). Para entrar en ambos templos por la mañana, de martes a viernes puedes aprovechar la coincidencia de horarios entre las 11:00 y las 12:00; confirma siempre las celebraciones previstas. Después baja hacia la Plaza de las Monjas y recorre las calles del centro con calma. Hay desniveles en el entorno de San Pedro."
    ],
    [
      "Museo y Barrio Reina Victoria",
      "El [Museo de Huelva](/lugar/museo-de-huelva), en Alameda Sundheim, permite conocer la arqueología y el arte del territorio con entrada gratuita. Cierra habitualmente los lunes y conviene comprobar su calendario, especialmente en verano y festivos. Continúa por el [Barrio Reina Victoria](/lugar/barrio-reina-victoria-huelva): es un conjunto residencial ligado a la compañía minera, con casas y jardines de inspiración británica. Pasea por las calles públicas respetando las viviendas y los espacios privados. Si viajas en lunes, da prioridad al paseo exterior."
    ],
    [
      "El muelle y el atardecer junto al Odiel",
      "Deja el [Muelle de la Compañía de Riotinto](/lugar/muelle-riotinto-huelva) para la última parte del día si encaja con la hora de puesta de sol. Su estructura permite apreciar el pasado industrial de la ciudad y contemplar el río Odiel. Puedes combinarlo con el Paseo de la Ría, sin necesidad de reservar una visita interior. Lleva agua y protección solar, y algo de abrigo para el viento junto al agua. Respeta la señalización y las restricciones puntuales que pudiera haber."
    ],
    [
      "La Cinta y una segunda jornada",
      "Dedica una franja independiente al [Santuario de Nuestra Señora de la Cinta](/lugar/santuario-cinta-huelva), en el Conquero. El patio y el entorno con vistas a las marismas completan la visita religiosa. Está fuera del recorrido compacto del centro y hay pendientes: organiza el desplazamiento según tu movilidad. Confirma los horarios de mañana y tarde y consulta por separado las condiciones del Tesoro de la Cinta. Con dos días puedes repartir museo, iglesias y santuario, y añadir una actividad de la agenda de Huelva."
    ]
  ],
  "sources": [
    [
      "Muelle de la Compañía de Riotinto: información de visita",
      "https://turismo.huelva.es/rutas-y-monumentos/ruta-legado-britanico/muelle-de-la-compania-de-rio-tinto/"
    ],
    [
      "Barrio Reina Victoria (Barrio Obrero): información de visita",
      "https://turismo.huelva.es/rutas-y-monumentos/ruta-legado-britanico/barrio-reina-victoria/"
    ],
    [
      "Catedral de la Merced de Huelva: información de visita",
      "https://turismo.huelva.es/rutas-y-monumentos/ruta-tradicion-original/santa-iglesia-catedral-de-la-merced-de-huelva/"
    ],
    [
      "Santuario de Nuestra Señora de la Cinta: información de visita",
      "https://turismo.huelva.es/rutas-y-monumentos/ruta-tradicion-original/santuario-diocesano-de-nuestra-senora-de-la-cinta/"
    ],
    [
      "Parroquia Mayor de San Pedro de Huelva: información de visita",
      "https://turismo.huelva.es/rutas-y-monumentos/ruta-tradicion-original/parroquia-mayor-de-san-pedro-de-huelva/"
    ],
    [
      "Museo de Huelva: información de visita",
      "https://www.museosdeandalucia.es/web/museodehuelva/informacion-general"
    ]
  ]
},
  "guadalajara": {
  "intro": "Guadalajara en uno o dos días: empieza por el Palacio del Infantado y el torreón de Álvar Fáñez, continúa por la Cotilla y el entorno de Santa María y reserva una franja para el panteón de la condesa de la Vega del Pozo. Para entrar en los monumentos municipales, organiza preferentemente la visita en viernes, fin de semana o festivo y confirma el calendario antes de salir.",
  "sections": [
    [
      "El Infantado y el torreón de Álvar Fáñez",
      "Comienza por el [Palacio del Infantado](/lugar/palacio-infantado-guadalajara), su fachada y el Patio de los Leones. El patio y el claustro superior son gratuitos; el Museo de Guadalajara anuncia entrada temporalmente gratuita, aunque conserva una tarifa ordinaria publicada de 3 euros. Consulta las condiciones vigentes y recuerda que cierra los lunes. Cerca está el [Torreón de Álvar Fáñez](/lugar/torreon-alvar-fanez-guadalajara), con una entrada publicada de 1 euro y apertura turística concentrada en viernes, fines de semana y festivos."
    ],
    [
      "La Cotilla y la capilla de Luis de Lucena",
      "El [Palacio de la Cotilla y su Salón Chino](/lugar/palacio-cotilla-guadalajara) y la [Capilla de Luis de Lucena](/lugar/capilla-luis-lucena-guadalajara) aportan dos interiores muy diferentes: decoración sobre papel de arroz y pinturas en las bóvedas de una capilla del siglo XVI. Cada entrada publicada cuesta 1 euro. Ambos anuncian visitas los viernes y sábados por la mañana y por la tarde, y los domingos y festivos por la mañana. El horario de tarde cambia con la temporada: reserva y confirma la apertura antes de organizar el recorrido."
    ],
    [
      "Santa María y el paseo por el centro",
      "La [Concatedral de Santa María](/lugar/concatedral-santa-maria-guadalajara) permite completar el paseo junto a la capilla de Lucena. La entrada es libre y la disponibilidad depende de las celebraciones religiosas. Deja margen para recorrer las calles del centro y descansar entre visitas. Si viajas de lunes a jueves, no cuentes con entrar en todos los monumentos municipales: combina los exteriores con los espacios cuya apertura hayas confirmado."
    ],
    [
      "El panteón y un segundo día",
      "Dedica otra franja al [Panteón de la condesa de la Vega del Pozo](/lugar/panteon-vega-pozo-guadalajara), también conocido como Panteón de la Duquesa de Sevillano, junto al entorno de San Roque. Su tarifa individual publicada es de 3 euros y los miércoles es gratuito. La reserva gratuita en línea no equivale a entrada gratuita el resto de días: el pago se realiza en el monumento. Consulta los horarios estacionales y las condiciones de acceso, que incluyen escaleras. Con dos días puedes repartir las visitas interiores y añadir un evento de la agenda."
    ]
  ],
  "sources": [
    [
      "Palacio del Infantado: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/palacio-del-infantado/"
    ],
    [
      "Palacio de la Cotilla y Salón Chino: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/palacio-de-la-cotilla-y-salon-chino/"
    ],
    [
      "Capilla de Luis de Lucena: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/capilla-de-luis-de-lucena/"
    ],
    [
      "Concatedral de Santa María de Guadalajara: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/concatedral-de-santa-maria/"
    ],
    [
      "Torreón de Álvar Fáñez: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/torreon-de-alvar-fanez/"
    ],
    [
      "Panteón de la condesa de la Vega del Pozo: información práctica",
      "https://turismo.guadalajara.es/es/organiza-tu-viaje/monumentos/panteon-de-la-condesa-de-la-vega-del-pozo/"
    ],
    [
      "Museo de Guadalajara: horarios y tarifas",
      "https://cultura.castillalamancha.es/index.php/museos/nuestros-museos/museo-de-guadalajara"
    ]
  ]
},
  "lleida": {
  "intro": "Lleida en uno o dos días: empieza por la Seu Vella, recorre el centro entre la Paeria y la Catedral Nueva y elige un museo según tus intereses. Reserva una franja aparte para Gardeny, situado en otra colina. Organiza las visitas con horario antes de completar el paseo y comprueba los cierres estacionales.",
  "sections": [
    [
      "La Seu Vella y las vistas de la ciudad",
      "Dedica la primera parte del día a la [Seu Vella](/lugar/seu-vella-lleida), la antigua catedral sobre el cerro. El claustro y las vistas merecen una visita sin prisas. Lleva calzado cómodo para los desniveles y consulta las condiciones del campanario antes de incluirlo. La entrada general anunciada es de 7 euros y los horarios varían por temporada. Comprueba la apertura si viajas en lunes."
    ],
    [
      "Del Palacio de la Paeria a la Catedral Nueva",
      "Baja al centro para enlazar el [Palacio de la Paeria](/lugar/palacio-paeria-lleida), sede municipal, con la [Catedral Nueva](/lugar/catedral-nueva-lleida). Ambas visitas tienen entrada gratuita. La disponibilidad de las salas del palacio depende de su uso y la catedral mantiene celebraciones religiosas. Aprovecha el recorrido por el eje comercial para hacer una pausa; la catedral del centro y la Seu Vella son dos edificios diferentes."
    ],
    [
      "Dos museos para elegir",
      "El [Museo de Lleida](/lugar/museo-de-lleida), en Sant Crist, 1, ofrece arqueología y arte para entender el territorio. El [MORERA](/lugar/museo-morera-lleida), en Rambla de Ferran, 13, se centra en arte moderno y contemporáneo. La entrada general anunciada es de 5 euros en cada museo. El MORERA ofrece acceso gratuito el primer martes del mes. Consulta la programación y los horarios de cada uno; si solo tienes un día, elige el que mejor encaje con tus intereses."
    ],
    [
      "Gardeny y un segundo día",
      "El [Castillo templario de Gardeny](/lugar/castillo-templario-gardeny) está en una colina distinta a la Seu Vella. Deja margen para desplazarte y conocer su pasado templario. La entrada general es de 3 euros y suele abrir de miércoles a domingo y festivos. Atención al calendario: Turismo de Lleida anuncia cierre del 14 de diciembre de 2026 al 12 de enero de 2027, con condiciones aparte para las visitas guiadas de fin de semana. Confirma la disponibilidad antes de ir. Con dos días puedes repartir las colinas y los museos y añadir algún evento de la agenda."
    ]
  ],
  "sources": [
    [
      "Seu Vella de Lleida: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/patrimoni/conjunt-monumental-de-la-seu-vella-i-castell-del-rei-suda"
    ],
    [
      "Castillo templario de Gardeny: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/patrimoni/castell-templer-de-gardeny"
    ],
    [
      "Catedral Nueva de Lleida: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/patrimoni/la-catedral-nova"
    ],
    [
      "Palacio de la Paeria: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/patrimoni/el-palau-de-la-paeria"
    ],
    [
      "Museo de Lleida: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/museus/museu-de-lleida"
    ],
    [
      "MORERA. Museo de Arte Moderno y Contemporáneo de Lleida: información práctica",
      "https://www.lleidaturisme.cat/ca/visitar/museus/museu-dart-jaume-morera"
    ]
  ]
},
  "almeria": {
  "intro": "Almería en uno o dos días: combina la Alcazaba y la Catedral con el Museo de la Guitarra y un paseo por el Cable Inglés. Deja la Casa del Cine para una franja con tiempo para desplazarte. Los Refugios de la Guerra Civil están cerrados temporalmente: su ficha sirve para conocer el lugar y consultar avisos, pero no los incluyas como visita interior hasta que se anuncie su reapertura.",
  "sections": [
    [
      "La Alcazaba y el casco histórico",
      "Empieza por la [Alcazaba de Almería](/lugar/alcazaba-de-almeria), situada sobre un cerro con vistas a la ciudad y al puerto. Recorre sus jardines y recintos con calzado cómodo y agua, especialmente cuando haga calor. La visita individual no necesita reserva; las visitas guiadas sí. La entrada es gratuita para ciudadanos de la Unión Europea acreditados y cuesta 1,50 euros para visitantes de otros países. El horario cambia por temporada y los lunes suele cerrar, con excepciones festivas. Baja después hacia las calles del centro para continuar el paseo."
    ],
    [
      "Catedral y Museo de la Guitarra",
      "Dedica otra franja a la [Catedral de Almería](/lugar/catedral-de-almeria), una catedral-fortaleza cuya entrada turística está en la calle Velázquez. La entrada general es de 8 euros; comprueba qué incluye cada modalidad y los horarios especiales por culto. Muy cerca está el [Museo de la Guitarra Antonio de Torres](/lugar/museo-guitarra-almeria), que anuncia entrada gratuita. Cierra los lunes y los domingos abre por la mañana. Es una combinación cómoda de arquitectura y música sin grandes desplazamientos entre ambas visitas."
    ],
    [
      "Cable Inglés y aviso sobre los Refugios",
      "Acércate al [Cable Inglés](/lugar/cable-ingles-almeria) para conocer el antiguo cargadero de mineral y disfrutar del mirador junto al mar. El recorrido elevado es gratuito, sujeto a horario y aforo; accede desde el entorno del Parque de la Estación. Los [Refugios de la Guerra Civil](/lugar/refugios-guerra-civil-almeria), en cambio, permanecen cerrados temporalmente. El Ayuntamiento ha anunciado nuevas obras de mejora y no hay una reapertura confirmada en las fuentes consultadas. No reserves tiempo para entrar ni te guíes por horarios antiguos: revisa el aviso oficial antes de organizar una visita futura."
    ],
    [
      "Casa del Cine y un segundo día",
      "La [Casa del Cine](/lugar/casa-del-cine-almeria) está en Camino Romero, fuera del recorrido inmediato por el casco histórico. Reserva tiempo para ir y volver, en lugar de tratarla como una parada contigua a la Catedral. La entrada general es de 3 euros y el museo recuerda los rodajes en Almería y la estancia de John Lennon. Cierra los lunes; consulta los horarios y la reserva de visitas guiadas. Si solo tienes un día, elige los interiores que más te interesen. Con dos días podrás repartirlos con calma y completar la estancia con los eventos de esta página."
    ]
  ],
  "sources": [
    [
      "Alcazaba de Almería: información práctica",
      "https://www.museosdeandalucia.es/web/conjuntomonumentallaalcazabaalmeria/informacion-general"
    ],
    [
      "Catedral de Almería: información práctica",
      "https://catedralalmeria.com/horarios-y-tarifas-de-la-visita/"
    ],
    [
      "Refugios de la Guerra Civil de Almería: información práctica",
      "https://almeriaciudad.es/actualidad/el-ayuntamiento-reactiva-las-obras-de-mejora-de-los-refugios-de-la-guerra-civil-mediante"
    ],
    [
      "Cable Inglés de Almería: información práctica",
      "https://www.turismodealmeria.org/lugar/el-cable-ingles/"
    ],
    [
      "Museo de la Guitarra Antonio de Torres: información práctica",
      "https://www.museosalmeria.com/museo/museo-de-la-guitarra-antonio/"
    ],
    [
      "Casa del Cine de Almería: información práctica",
      "https://www.museosalmeria.com/museo/la-casa-del-cine/"
    ]
  ]
},
  "cadiz": {
  "intro": "Cádiz en uno o dos días: combina el barrio del Pópulo y la Catedral con las vistas de Torre Tavira, los castillos de La Caleta y un paseo por el Parque Genovés. Reserva primero la sesión de la Cámara Oscura y organiza los interiores según sus horarios. El centro histórico se presta a recorrerlo a pie, dejando tiempo para descansar junto al mar.",
  "sections": [
    [
      "Catedral y pasado romano en el Pópulo",
      "Empieza en la plaza de la [Catedral de Cádiz](/lugar/catedral-de-cadiz) y recorre las calles del Pópulo. La entrada cultural general a la Catedral cuesta 12 euros; consulta las condiciones y los horarios propios de la Torre del Reloj y de la Casa de la Contaduría. Los domingos la visita turística al templo empieza a las 13:30. Muy cerca está el [Teatro Romano y su centro de interpretación](/lugar/teatro-romano-cadiz). Actualmente, las obras restringen el acceso al yacimiento, mientras el centro de interpretación permanece abierto en la calle Mesón, 11–13. Confirma la situación antes de ir; la entrada es libre y el aforo limitado."
    ],
    [
      "Torre Tavira con reserva previa",
      "Continúa hacia la [Torre Tavira](/lugar/torre-tavira-cadiz), cerca del Mercado Central y la plaza de las Flores. La visita combina salas, mirador y una sesión guiada de Cámara Oscura que muestra imágenes de la ciudad en tiempo real. La tarifa general es de 8 euros y la visita dura unos 45 minutos. Es imprescindible reservar con antelación: elige el horario y el idioma de la sesión antes de organizar el resto del día. Ten en cuenta que el acceso no está adaptado; consulta las condiciones si alguien del grupo tiene movilidad reducida."
    ],
    [
      "La Caleta y sus dos castillos",
      "Acércate a La Caleta y visita el [Castillo de Santa Catalina](/lugar/castillo-santa-catalina-cadiz), una fortificación que hoy acoge exposiciones y actividades culturales. La entrada habitual es libre, salvo actos anunciados con condiciones propias. El [Castillo de San Sebastián](/lugar/castillo-san-sebastian-cadiz) está en el otro extremo, al final del paseo Fernando Quiñones. Calcula tiempo para caminar hasta él y regresar. Su entrada es gratuita, pero los horarios y el acceso pueden cambiar por la meteorología. Consulta los avisos del día y respeta cualquier cierre del paseo."
    ],
    [
      "Parque Genovés y una pausa junto al mar",
      "Reserva otro tramo para el [Parque Genovés](/lugar/parque-genoves-cadiz), con sus paseos ajardinados, árboles recortados y el entorno del estanque y la cascada. Es una buena pausa entre visitas y permite continuar por el borde marítimo. Su horario cambia en verano y puede modificarse por el tiempo. Si dispones de dos días, reparte las visitas interiores y los paseos para recorrerlos con calma. Consulta la agenda de esta página para completar la escapada con conciertos, teatro u otros planes de Cádiz."
    ]
  ],
  "sources": [
    [
      "Catedral: horarios y tarifas",
      "https://catedraldecadiz.com/horarios-visita-turistica/"
    ],
    [
      "Torre Tavira: reservas y tarifas",
      "https://torretavira.com/horarios-tarifas-y-localizacion"
    ],
    [
      "Teatro Romano: aviso de obras y visita",
      "https://www.juntadeandalucia.es/aaiicc/enclaves/enclave-arqueologico-teatro-romano-de-cadiz"
    ],
    [
      "Castillo de Santa Catalina",
      "https://turismo.cadiz.es/es/rutas-y-visitas-en-cadiz/castillo-de-santa-catalina"
    ],
    [
      "Castillo de San Sebastián",
      "https://turismo.cadiz.es/es/rutas-y-visitas-en-cadiz/castillo-de-san-sebastian"
    ],
    [
      "Parque Genovés",
      "https://turismo.cadiz.es/es/rutas-y-visitas-en-cadiz/parque-genoves"
    ]
  ]
},
  "girona": {
  "intro": "Girona en uno o dos días: descubre el Barri Vell entre la Catedral, el Call y las murallas, y reserva tiempo para los pequeños interiores históricos. Puedes enlazar estas visitas a pie, pero encontrarás escaleras y desniveles. Organiza primero los recintos con horario y deja margen para pasear junto al Onyar.",
  "sections": [
    [
      "Catedral y Sant Feliu con entrada conjunta",
      "Empieza por la [Catedral de Girona](/lugar/catedral-de-girona), con su gran nave gótica, el claustro y el tesoro. La visita cultural tiene horarios estacionales y puede adaptarse a celebraciones religiosas; los domingos comienza más tarde. Continúa hacia la [Basílica de Sant Feliu](/lugar/basilica-sant-feliu-girona), reconocible por su campanario. Antes de comprar, consulta la entrada Girona Monumental, que reúne ambos templos, o Girona Episcopal si también quieres visitar el Museu d’Art. Comprueba qué incluye cada modalidad y evita comprar dos entradas por separado sin comparar."
    ],
    [
      "El Call: calles para recorrer sin prisas",
      "Dedica un tramo del paseo a [El Call, el barrio judío](/lugar/barrio-judio-el-call-girona), en el entorno de la calle de la Força. Sus callejones y escaleras invitan a recorrer el casco antiguo despacio. Pasear por las calles públicas es gratuito; el Museu d’Història dels Jueus es una visita independiente, con su propia entrada y horario. Respeta los accesos privados y no cuentes con entrar en todos los patios. Alterna las calles más estrechas con una pausa en las plazas del centro."
    ],
    [
      "Baños Árabes y Sant Pere de Galligants",
      "Acércate a los [Baños Árabes](/lugar/banos-arabes-girona), un edificio histórico que se visita como monumento: no es un balneario en funcionamiento. La entrada general es de 3 euros; los domingos y festivos el cierre es a las 14:00. Muy cerca está el [Monasterio de Sant Pere de Galligants](/lugar/monasterio-sant-pere-galligants-girona), sede del MAC Girona. El museo anuncia el cierre de su exposición permanente para 2025–2026. Consulta qué espacios del monasterio están abiertos, la tarifa y las actividades antes de organizar esta visita; el aviso no implica por sí solo el cierre de todo el conjunto."
    ],
    [
      "Murallas y vistas sobre Girona",
      "Reserva una franja para recorrer las [Murallas de Girona](/lugar/murallas-de-girona) y observar los tejados y campanarios desde el paseo elevado. Hay escaleras y tramos irregulares, por lo que conviene llevar calzado cómodo y adaptar el recorrido a la movilidad del grupo. Consulta los accesos y horarios municipales del día. Completa la escapada con un paseo junto al Onyar y revisa la agenda de esta página. Si solo tienes un día, prioriza los interiores que más te interesen para disfrutar del recorrido sin prisas."
    ]
  ],
  "sources": [
    [
      "Catedral: visita cultural y entradas",
      "https://catedraldegirona.cat/es/catedral-de-girona-visita-cultural/"
    ],
    [
      "Baños Árabes: horarios y precios",
      "https://www.banysarabs.cat/es/horarios-y-precios/"
    ],
    [
      "Girona Turisme: El Call",
      "https://www.girona.cat/turisme/esp/monuments_call.php"
    ],
    [
      "Girona Turisme: murallas",
      "https://www.girona.cat/turisme/esp/monuments_muralla.php"
    ],
    [
      "MAC Girona: avisos y visita",
      "https://www.macgirona.cat/"
    ]
  ]
},
  "tarragona": {
  "intro": "Tarragona en uno o dos días: combina los restos de Tarraco con la Catedral, las calles de la Part Alta y un paseo junto al Mediterráneo. Organiza primero los recintos con entrada y deja el acueducto de les Ferreres como una salida aparte. Si viajas en lunes, consulta las aperturas antes de cerrar tu recorrido: varios monumentos municipales cierran habitualmente ese día.",
  "sections": [
    [
      "Del anfiteatro al Circo y el Pretorio",
      "Empieza por el [Anfiteatro romano](/lugar/anfiteatro-romano-tarragona), situado junto al mar, y continúa hacia el [Circo romano y el Pretorio](/lugar/circo-romano-pretorio-tarragona). Son visitas distintas que permiten conocer los espacios de espectáculos y el entorno monumental de Tarraco. Las entradas individuales cuestan 5 euros; si vas a recorrer varios recintos, compara la entrada conjunta de 15 euros del Museu d’Història. Consulta qué incluye y las condiciones vigentes antes de comprar."
    ],
    [
      "Catedral y murallas en la Part Alta",
      "Recorre las calles de la Part Alta y acércate a la [Catedral de Tarragona](/lugar/catedral-de-tarragona). Su entrada cultural es independiente de la conjunta municipal; elige la modalidad según los espacios que quieras conocer. Los domingos la visita turística comienza por la tarde. Reserva también tiempo para las [Murallas y el Paseo Arqueológico](/lugar/murallas-paseo-arqueologico-tarragona), un recorrido de pago entre jardines y vestigios de la ciudad romana. Comprueba los horarios estacionales y llega con margen respecto al último acceso."
    ],
    [
      "Una pausa en el Balcón del Mediterráneo",
      "Baja hacia la Rambla Nova y termina el paseo en el [Balcón del Mediterráneo](/lugar/balcon-mediterraneo-tarragona). Este mirador gratuito permite descansar con vistas al mar y acercarse a la barandilla de la tradición de tocar ferro. Puedes continuar por el paseo de les Palmeres. Es una parada flexible para alternar con los interiores y disfrutar de la ciudad sin llenar cada hora de visitas."
    ],
    [
      "Les Ferreres: una salida fuera del centro",
      "El [Acueducto de les Ferreres o Pont del Diable](/lugar/acueducto-ferreres-tarragona) está aproximadamente a cuatro kilómetros de la ciudad, junto al entorno de la N-240. Organiza la ida y la vuelta como un desplazamiento propio: no queda dentro del paseo por la Part Alta. El acceso es libre y gratuito. Lleva agua y calzado cómodo, respeta los caminos señalizados y consulta los avisos locales. Si solo dispones de un día, elige entre esta extensión y más tiempo en los recintos del centro. Consulta la agenda de esta página para completar la escapada."
    ]
  ],
  "sources": [
    [
      "Museu d’Història: horarios",
      "https://www.tarragona.cat/patrimoni/museu-historia/visites/horaris"
    ],
    [
      "Entradas municipales",
      "https://www.tarragona.cat/patrimoni/museu-historia/visites/preus-i-venda-dentrades"
    ],
    [
      "Catedral: planifica la visita",
      "https://catedraldetarragona.com/visita/"
    ],
    [
      "Balcón del Mediterráneo",
      "https://www.tarragonaturisme.cat/es/monumento/balcon-del-mediterraneo"
    ],
    [
      "Acueducto de les Ferreres",
      "https://www.tarragona.cat/patrimoni/museu-historia/monuments/laqueducte-del-francoli"
    ]
  ]
},
  "cuenca": {
  "intro": "Cuenca en uno o dos días: recorre el casco histórico entre miradores, Casas Colgadas y la Catedral, y elige los museos según sus horarios. El Museo Paleontológico queda fuera de este paseo y merece un desplazamiento propio. Lleva calzado cómodo para las cuestas y reserva margen para disfrutar de las vistas sin encadenar visitas con prisas.",
  "sections": [
    [
      "Plaza Mayor y Catedral",
      "Empieza en la Plaza Mayor y visita la [Catedral de Cuenca](/lugar/catedral-de-cuenca) si te interesa conocer su interior gótico. Comprueba qué incluye cada entrada: el triforio y otros espacios tienen modalidades específicas. Consulta el horario del día, porque cambia por temporada y puede adaptarse a celebraciones religiosas. Antes de continuar, dedica un rato a observar la plaza y la fachada del Ayuntamiento."
    ],
    [
      "Casas Colgadas, arte y puente de San Pablo",
      "Acércate a las [Casas Colgadas](/lugar/casas-colgadas-cuenca) y cruza el [Puente de San Pablo](/lugar/puente-san-pablo-cuenca) para contemplar el conjunto sobre la hoz del Huécar. Ver el exterior es gratuito. Dentro de parte de las casas está el [Museo de Arte Abstracto Español](/lugar/museo-arte-abstracto-espanol-cuenca), también gratuito, con obras de la colección de la Fundación Juan March. Organiza esta parada según su apertura: cierra habitualmente los lunes y el domingo abre por la mañana."
    ],
    [
      "Un paseo hasta Mangana",
      "Continúa hacia la [Plaza y Torre de Mangana](/lugar/plaza-torre-mangana-cuenca), donde puedes disfrutar del reloj, los restos históricos y los miradores. La propuesta es recorrer la plaza y contemplar la torre desde fuera; no cuentes con subir a su interior sin una confirmación de apertura. Es una buena pausa entre visitas culturales. Ajusta el recorrido a tu ritmo y ten en cuenta los desniveles del casco antiguo."
    ],
    [
      "Dinosaurios en el MUPA y tiempo para la agenda",
      "Reserva otra franja para el [Museo Paleontológico de Castilla-La Mancha](/lugar/museo-paleontologico-cuenca), en la calle Río Gritos. Calcula la ida y la vuelta: no está junto a la Catedral. Cierra los lunes y los domingos abre solo por la mañana. La entrada general es de 5 euros, con gratuidades sujetas a condiciones; algunas actividades y exposiciones se pagan aparte. Si solo tienes un día, elige los interiores que más te interesen. Consulta la agenda de esta página para completar la escapada con un evento."
    ]
  ],
  "sources": [
    [
      "Catedral: entradas y modalidades",
      "https://www.catedralcuenca.es/es/visitas-turisticas/tarifas"
    ],
    [
      "Casas Colgadas",
      "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/monumentos/cuenca/casas-colgadas-de-cuenca"
    ],
    [
      "Puente de San Pablo",
      "https://descubrecuenca.es/es/enclaves-y-poblaciones/la-capital/cuenca-puente-de-san-pablo-y-hoz-del-rio-huecar-112"
    ],
    [
      "Museo de Arte Abstracto Español",
      "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/museos/cuenca/museo-de-arte-abstracto-espanol"
    ],
    [
      "Torre de Mangana",
      "https://www.turismocastillalamancha.es/es/cultura-y-patrimonio/monumentos/cuenca/torre-de-mangana"
    ],
    [
      "MUPA: horarios y tarifas",
      "https://mupaclm.es/horarios/"
    ]
  ]
},
  "huesca": {
  "intro": "Huesca en un día: combina el casco histórico, una visita cultural y un descanso en el parque Miguel Servet. Elige los interiores según sus horarios y deja el CDAN como una extensión con desplazamiento propio. El Museo Pedagógico permanece cerrado por reformas según el aviso oficial consultado el 25 de octubre de 2026; no cuentes con visitar su interior hasta que anuncie la reapertura.",
  "sections": [
    [
      "Catedral y Museo de Huesca",
      "Empieza por la [Catedral de Huesca](/lugar/catedral-de-huesca), en la parte alta del casco histórico, y comprueba qué incluye la entrada cultural antes de elegir museo o torre. Después puedes acercarte al [Museo de Huesca](/lugar/museo-de-huesca), en la plaza de la Universidad: su entrada es gratuita y reúne arqueología y bellas artes. Revisa las salas disponibles y recuerda que habitualmente cierra los lunes no festivos."
    ],
    [
      "San Pedro el Viejo y las plazas del centro",
      "Continúa hacia el [Monasterio de San Pedro el Viejo](/lugar/monasterio-san-pedro-el-viejo-huesca) para conocer su iglesia, claustro y panteón real. Consulta los horarios y la modalidad conjunta con la Catedral si quieres visitar ambos. Cerca está la plaza Luis López Allué y el [Museo Pedagógico de Aragón](/lugar/museo-pedagogico-aragon-huesca), actualmente cerrado por reformas. Puedes disfrutar del paseo por la plaza, pero deja la visita al museo para cuando confirme su reapertura."
    ],
    [
      "Una pausa en el parque Miguel Servet",
      "El [Parque Miguel Servet](/lugar/parque-miguel-servet-huesca) permite alternar monumentos con un paseo entre árboles. Busca Las Pajaritas de Ramón Acín y el entorno de la casita de Blancanieves. Pasear es gratuito; no presupongas que los servicios o actividades infantiles estén abiertos. Respeta las zonas señalizadas por obras y consulta los avisos municipales si hay meteorología adversa."
    ],
    [
      "CDAN: una extensión fuera del casco histórico",
      "Si te interesa el arte contemporáneo, añade el [CDAN – Centro de Arte y Naturaleza](/lugar/cdan-huesca), en la avenida del Doctor Artero. Organiza la ida y la vuelta como un trayecto aparte. El centro anuncia entrada gratuita y apertura de jueves a domingo: jueves y domingo hasta las 15:00, viernes y sábado hasta las 18:00. No lo reserves automáticamente para el final de la tarde. Comprueba excepciones y actividades, y consulta la agenda de esta página para completar el día."
    ]
  ],
  "sources": [
    [
      "Catedral y San Pedro: visitas",
      "https://www.museodiocesanohuesca.com/inicio"
    ],
    [
      "Museo de Huesca",
      "https://museodehuesca.es/horario/"
    ],
    [
      "Aviso del Museo Pedagógico",
      "https://museopedagogicodearagon.com/"
    ],
    [
      "Parque Miguel Servet",
      "https://turismo.hoyadehuesca.es/la-hoya-de-huesca/con-ninos/10-ideas-para-descubrir-con-ninos/8-los-secretos-del-parque-miguel-servet"
    ],
    [
      "CDAN: horarios",
      "https://www.cdan.es/horario/"
    ]
  ]
},
  "burgos": {
    "intro": "Burgos en uno o dos días: combina la Catedral y el casco histórico con el paseo junto al Arlanzón y el Museo de la Evolución Humana. Si quieres visitar también Las Huelgas y Miraflores, reserva tiempo para sus desplazamientos y organiza primero las entradas con horario. Esta propuesta permite elegir interiores sin renunciar a disfrutar del paseo por la ciudad.",
    "sections": [
        [
            "Catedral y Arco de Santa María",
            "Empieza por la [Catedral de Burgos](/lugar/catedral-de-burgos-burgos) y decide si quieres dedicar la mañana a su visita cultural. Consulta los avisos del día: el culto puede modificar el acceso y la visita nocturna tiene una modalidad distinta. Continúa hacia el [Arco de Santa María](/lugar/arco-santa-maria-burgos), donde la fachada reúne personajes de la historia local. El paseo exterior es libre; comprueba la apertura de sus espacios culturales si quieres entrar."
        ],
        [
            "Del Espolón al Museo de la Evolución",
            "Recorre el [Paseo del Espolón](/lugar/paseo-espolon-burgos), junto al río, y deja tiempo para descansar bajo sus árboles. Después cruza hacia el [Museo de la Evolución Humana](/lugar/museo-evolucion-humana-burgos). El MEH está en la ciudad: la visita a los yacimientos de Atapuerca y al CAREX es diferente y requiere reserva. Revisa el horario y las franjas gratuitas del museo antes de decidir cuándo entrar."
        ],
        [
            "Las Huelgas: reserva tu visita guiada",
            "El [Monasterio de Las Huelgas](/lugar/monasterio-las-huelgas-burgos) merece una parada propia fuera del centro histórico. La visita es guiada y el aforo limitado: elige un pase y calcula el desplazamiento antes de reservar otra actividad. Cierra habitualmente los lunes y el último acceso es anterior a la hora de cierre. Consulta las excepciones del calendario y las condiciones de gratuidad en Patrimonio Nacional."
        ],
        [
            "Miraflores y tiempo para la agenda",
            "La [Cartuja de Miraflores](/lugar/cartuja-miraflores-burgos), hacia Fuentes Blancas, completa la ruta con su retablo y escultura funeraria. Organiza la ida y la vuelta y comprueba los horarios de iglesia y exposiciones; no la plantees como una parada inmediata junto a la Catedral. Si solo dispones de un día, puedes elegir entre Miraflores y Las Huelgas. Para terminar con un concierto u otro plan, consulta los eventos de esta página y deja margen para llegar al recinto."
        ]
    ],
    "sources": [
        [
            "visitas de la Catedral",
            "https://catedraldeburgos.es/visitas"
        ],
        [
            "Arco de Santa María",
            "https://www.vueltaburgos.com/es/project/arco-de-santa-maria-2/"
        ],
        [
            "Paseo del Espolón",
            "https://www.vueltaburgos.com/es/project/paseo-del-espolon/"
        ],
        [
            "visitas al MEH y Atapuerca",
            "https://museoevolucionhumana.com/es/informacion-y-reservas"
        ],
        [
            "Patrimonio Nacional: Las Huelgas",
            "https://www.patrimonionacional.es/visita/monasterio-de-santa-maria-la-real-de-las-huelgas"
        ],
        [
            "Cartuja de Miraflores",
            "https://www.cartuja.org/iglesia-y-exposiciones/"
        ]
    ]
},
  "avila": {
    intro: "Ávila en un día: combina la muralla, el centro histórico y una panorámica desde los Cuatro Postes. Elige primero los interiores que quieres visitar y deja margen para los desplazamientos fuera del recinto amurallado. Puedes disfrutar de las plazas y los paseos exteriores sin comprar entradas para todos los monumentos.",
    sections: [
      [
        "San Vicente y la muralla",
        "Empieza por la [Basílica de San Vicente](/lugar/basilica-san-vicente-avila), con su portada y galería porticada, y acércate a la [Muralla de Ávila](/lugar/muralla-de-avila). Pasear por fuera es distinto de subir al adarve, que tiene entrada y accesos concretos. Comprueba el horario de temporada y el último acceso: en invierno se reduce la apertura y hay cierres los lunes con excepciones. Consulta el tramo adaptado si necesitas evitar escaleras."
      ],
      [
        "Catedral y Mercado Chico",
        "Continúa hacia la [Catedral de Ávila](/lugar/catedral-de-avila): su cabecera forma parte del recinto defensivo. Si quieres entrar, encaja primero el horario de la visita cultural y las posibles celebraciones. Después recorre las calles del centro hasta la [Plaza del Mercado Chico](/lugar/plaza-mercado-chico-avila), donde puedes detenerte bajo los soportales y contemplar la fachada del Ayuntamiento. El paseo por la plaza es gratuito; las consumiciones se pagan aparte."
      ],
      [
        "Una visita con tiempo a Santo Tomás",
        "El [Real Monasterio de Santo Tomás](/lugar/real-monasterio-santo-tomas-avila) amplía la ruta fuera de la muralla con su iglesia y tres claustros. Reserva margen para llegar desde el casco histórico y confirma qué espacios y colecciones incluye la entrada. Si dispones de pocas horas, elige entre esta visita y otros interiores para no convertir el día en una carrera."
      ],
      [
        "Cuatro Postes y un plan para terminar",
        "Acércate al [Mirador de los Cuatro Postes](/lugar/mirador-cuatro-postes-avila), al otro lado del Adaja, para observar la ciudad amurallada. Calcula el desnivel y el regreso si vas andando, especialmente al final del día. Para completar la jornada, consulta los eventos de esta página y comprueba fecha, recinto y entradas en cada ficha; deja tiempo para el trayecto y revisa el transporte de vuelta."
      ]
    ],
    sources: [
      ["Muralla de Ávila: visitas", "https://www.avilaturismo.com/que-ver/la-muralla-de-avila"],
      ["Catedral de Ávila", "https://www.avilaturismo.com/que-ver/catedral-de-avila"],
      ["Basílica de San Vicente", "https://www.avilaturismo.com/que-ver/basilica-de-san-vicente"],
      ["Real Monasterio de Santo Tomás", "https://www.avilaturismo.com/que-ver/real-monaterio-de-santo-tomas"],
      ["Cuatro Postes", "https://www.avilaturismo.com/que-ver/los-cuatro-postes"],
      ["Mercado Chico", "https://www.avilaturismo.com/que-ver/ayuntamiento-y-plaza-del-mercado-chico"]
    ]
  },
  "toledo": {
    intro: "Toledo en un día: enlaza el entorno del Cristo de la Luz, la Catedral y la judería, eligiendo qué interiores quieres visitar. El casco histórico tiene pendientes y calles empedradas: lleva calzado cómodo y deja tiempo entre paradas. Esta ruta es una propuesta flexible para combinar patrimonio y los eventos de la agenda.",
    sections: [
      [
        "Del Cristo de la Luz al centro histórico",
        "Empieza por la [Mezquita del Cristo de la Luz](/lugar/mezquita-cristo-de-la-luz-toledo), donde merece la pena detenerse en sus bóvedas, y continúa hacia Zocodover. Desde allí puedes acercarte a la [Catedral Primada](/lugar/catedral-primada-de-toledo). Si quieres entrar, consulta primero sus horarios y modalidades de visita: el culto puede condicionar el acceso. Ajusta el orden del paseo a las entradas que hayas reservado."
      ],
      [
        "El Greco y la memoria sefardí",
        "Continúa hacia [Santo Tomé](/lugar/iglesia-santo-tome-toledo) para contemplar El entierro del Señor de Orgaz. Después puedes acercarte a la [Sinagoga del Tránsito y Museo Sefardí](/lugar/sinagoga-transito-museo-sefardi-toledo). El museo cierra habitualmente los lunes y publica avisos de cierres parciales: revísalos antes de organizar la jornada. Las entradas individuales se adquieren en taquilla; consulta también las franjas gratuitas y las condiciones de acceso."
      ],
      [
        "Santa María la Blanca y San Juan de los Reyes",
        "Enlaza la visita a [Santa María la Blanca](/lugar/sinagoga-santa-maria-la-blanca-toledo) con el [Monasterio de San Juan de los Reyes](/lugar/monasterio-san-juan-de-los-reyes-toledo). Compara los arcos y la decoración de la antigua sinagoga con las galerías del claustro. Son visitas próximas, pero cada recinto tiene su acceso y último horario de entrada. Si necesitas un recorrido sin escalones, consulta las condiciones de cada espacio y del trayecto antes de salir."
      ],
      [
        "Entradas y tiempo para un evento",
        "Santo Tomé, Cristo de la Luz, Santa María la Blanca y San Juan de los Reyes forman parte de la pulsera de siete monumentos de Toledo Monumental. La Catedral y el Museo Sefardí tienen entradas independientes. Compara el precio de la pulsera con las visitas que realmente quieres hacer y comprueba su validez y qué servicios incluye. Para terminar con un concierto u otro plan, consulta la agenda de esta página y calcula el trayecto al recinto y el transporte de regreso."
      ]
    ],
    sources: [
      ["Turismo de Toledo", "https://turismo.toledo.es/recursos/list5-los-10-imprescindibles-de-toledo.html"],
      ["Toledo Monumental", "https://toledomonumental.com/pulsera-turistica/"],
      ["Museo Sefardí", "https://www.cultura.gob.es/msefardi/visita/"],
      ["Catedral Primada", "https://www.catedralprimada.es/"]
    ]
  },
  "salamanca": {
    intro: "Salamanca en un día: empieza en la Plaza Mayor, recorre el centro universitario y termina junto al Tormes. Elige primero qué interiores quieres visitar y encaja sus horarios antes de añadir un concierto o un plan de la agenda. Puedes disfrutar del paseo exterior sin convertir cada parada en una visita de pago.",
    sections: [
      [
        "De la Plaza Mayor a la Casa de las Conchas",
        "Empieza bajo los soportales de la [Plaza Mayor](/lugar/plaza-mayor-salamanca) y continúa hacia la [Casa de las Conchas](/lugar/casa-de-las-conchas-salamanca). El patio se visita gratuitamente durante su apertura, pero el edificio también funciona como biblioteca: respeta las zonas de lectura. Comprueba el horario del fin de semana y consulta el acceso si necesitas evitar escalones."
      ],
      [
        "Universidad y catedrales: elige tus interiores",
        "Dedica tiempo a la fachada del [Edificio Histórico de la Universidad](/lugar/universidad-salamanca-edificio-historico) antes de decidir si entras. El Cielo de Salamanca es otra visita, gratuita y con horario propio. Continúa hacia las [catedrales Vieja y Nueva](/lugar/catedrales-vieja-nueva-salamanca): la visita cultural reúne ambos templos, mientras que las torres de Ieronimus tienen un recorrido diferente. Revisa qué incluye cada entrada y deja margen para el último acceso."
      ],
      [
        "Casa Lis y el paseo hacia el Tormes",
        "La [Casa Lis](/lugar/casa-lis-museo-salamanca) propone una parada de artes decorativas y vidrieras antes de bajar hacia el [Puente Romano](/lugar/puente-romano-salamanca). El museo tiene horarios estacionales y una franja gratuita los jueves; comprueba la web oficial y sus normas sobre fotografías. Desde el puente puedes continuar por la ribera y observar el perfil monumental de la ciudad. Calcula también el tiempo de regreso al centro."
      ],
      [
        "Cómo combinar la ruta con un evento",
        "Consulta los próximos eventos de Salamanca en esta página y abre la ficha para comprobar fecha, recinto y entradas. Usa «Cómo llegar» para organizar el trayecto desde tu última parada y distingue la apertura de puertas del inicio del espectáculo. Si llegas en transporte público, revisa el horario de vuelta antes de reservar una visita de tarde."
      ]
    ],
    sources: [
      ["Turismo de Salamanca", "https://salamanca.es/que-ver/monumentos"],
      ["visitas a la Universidad", "https://museo.usal.es/estaticas/precios/"],
      ["visita cultural de las catedrales", "https://catedralsalamanca.org/visita-cultural/"],
      ["horarios y normas de Casa Lis", "https://www.museocasalis.org/informacion-general/"]
    ]
  },
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
