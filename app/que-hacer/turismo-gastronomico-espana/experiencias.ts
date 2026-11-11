// ID recuperado de components/ConsentScripts.tsx. Formato documentado en:
// https://partner.getyourguide.support/hc/en-us/articles/13981115676061-Deep-links-101
export const PARTNER_ID = "3B0Y74E";
export const RUTA_GUIA = "/que-hacer/turismo-gastronomico-espana";
export const FECHA_REVISION = "2026-11-11";
export const FUENTE_BITeseeing = "https://www.getyourguide.press/blog/biteseeing";

export function enlaceAfiliado(url: string) {
  const destino = new URL(url);
  if (destino.hostname !== "www.getyourguide.com") throw new Error("Destino de afiliación no permitido");
  destino.searchParams.set("partner_id", PARTNER_ID);
  return destino.toString();
}

export const experiencias = [
  {
    id: "madrid", ciudad: "Madrid", tipo: "Tapas y tabernas", duracion: "3 horas", idioma: "Español e inglés",
    titulo: "Madrid: una ruta de tapas para entender la vida de las tabernas",
    url: "https://www.getyourguide.com/es-es/madrid-l46/vino-y-tapas-en-madrid-tour-de-25-horas-t19687/",
    descripcion: "El recorrido combina cuatro bares tradicionales con al menos doce tapas y una bebida por parada. Pasa por el Barrio de las Letras y termina en el entorno de la Plaza Mayor. El guía explica los platos, el vino y las historias de la ciudad: una manera de relacionar lo que hay en la mesa con lo que acabas de recorrer a pie.",
    consejo: "Encaja como comida o cena, no como un aperitivo antes de otra reserva. Hay opciones de bebida sin alcohol. Confirma las adaptaciones alimentarias con el organizador.",
    detalle: "La ficha indica que no es apto para sillas de ruedas ni menores de cuatro años. El punto de encuentro es la estatua de Federico García Lorca, en la plaza de Santa Ana.",
    guia: "madrid",
  },
  {
    id: "bilbao", ciudad: "Bilbao", tipo: "Pintxos y vinos", duracion: "3 horas", idioma: "Español e inglés",
    titulo: "Bilbao: pintxos, vinos y conversación de barra en barra",
    url: "https://www.getyourguide.com/bilbao-l93/bilbao-basque-food-tour-and-wine-tasting-with-guide-t463114/",
    descripcion: "Este paseo gastronómico propone nueve pintxos y cinco bebidas, con alternativas sin alcohol, junto a un guía que conecta la cocina con la historia local. Su interés está en comparar bocados y combinaciones mientras se cambia de local, en lugar de resolver la visita con una única comida sentada.",
    consejo: "Reserva una franja sin prisas y comunica las restricciones alimentarias antes de acudir. Preguntar por qué se propone un vino con cada pintxo convierte la degustación en un pequeño aprendizaje que podrás repetir después por tu cuenta.",
    detalle: "El encuentro se anuncia en las escaleras de la Diputación de Bizkaia, en Gran Vía, no en el Ayuntamiento. La ficha señala accesibilidad para sillas de ruedas; confirma las necesidades concretas del recorrido.",
    guia: "bilbao",
  },
  {
    id: "valencia", ciudad: "Valencia", tipo: "Mercado y taller", duracion: "3–3,5 horas", idioma: "Inglés",
    titulo: "Valencia: del Mercado Central a tu propia paella",
    url: "https://www.getyourguide.com/valencia-l49/valencia-paella-cooking-class-with-central-market-tour-t607450/",
    descripcion: "La experiencia enlaza la compra de ingredientes con una clase guiada de paella y una comida con tapas, vino y postre. Los puestos de cocina se comparten entre una y tres personas. Resulta especialmente interesante si quieres participar en la elaboración y llevarte una técnica, además del recuerdo de un plato.",
    consejo: "Elige una sesión de mañana de lunes a sábado si quieres incluir el Mercado Central. Los domingos y en el turno de tarde no hay visita al mercado: la actividad pasa de unas tres horas y media a tres horas.",
    detalle: "La ficha consultada anuncia enseñanza en inglés y acceso para sillas de ruedas. Comprueba el punto de encuentro en el bono: la descripción general y el apartado de encuentro mencionan lugares distintos.",
    guia: "valencia",
  },
  {
    id: "barcelona", ciudad: "Barcelona", tipo: "Mercado y cocina", duracion: "3 horas", idioma: "Inglés",
    titulo: "Barcelona: la Boqueria y una cocina que se comparte",
    url: "https://www.getyourguide.com/barcelona-l45/paella-cooking-experience-with-boqueria-market-tour-t44533/",
    descripcion: "La propuesta comienza con una introducción al mercado de la Boqueria y continúa con tapas, paella de marisco y preparación de sangría. Combina demostración del chef con tareas participativas: no equivale a disponer de una paella individual por asistente. Es una opción para quienes disfrutan observando, preguntando y cocinando en grupo.",
    consejo: "La visita al mercado no se realiza los domingos ni los festivos y depende de su horario. Si ese tramo es tu prioridad, compruébalo antes de reservar. Solicita con antelación la opción vegetariana u otras adaptaciones.",
    detalle: "El punto de encuentro publicado es Travel Bar, cerca de Las Ramblas. La experiencia se imparte en inglés; no deduzcas el idioma del taller porque la página de reserva esté traducida al español.",
    guia: "barcelona",
  },
  {
    id: "sevilla", ciudad: "Sevilla", tipo: "Triana y taller", duracion: "3,5 horas", idioma: "Inglés",
    titulo: "Sevilla: conocer Triana desde el mercado y los fogones",
    url: "https://www.getyourguide.com/seville-l48/seville-spanish-cooking-class-and-food-market-tour-t50350/",
    descripcion: "En el Mercado de Triana, la visita a los puestos da paso a una clase colectiva con un chef. El menú combina recetas andaluzas y paella; la selección puede incluir gazpacho o salmorejo y otros platos que varían. El cierre es la comida preparada entre todos, con bebidas incluidas según la ficha.",
    consejo: "Reserva por la mañana para incluir el recorrido por el mercado. La escuela está en los puestos 75–77. Si viajas para aprender una receta concreta, confirma el menú: una clase de cocina española no implica que todos los platos sean originarios de Sevilla.",
    detalle: "La enseñanza se anuncia en inglés. El proveedor contempla dietas vegetarianas, veganas y sin gluten con aviso previo; consulta las condiciones para tu caso antes de pagar.",
    guia: "sevilla",
  },
  {
    id: "jerez", ciudad: "Jerez de la Frontera", tipo: "Bodega y cata", duracion: "80 minutos", idioma: "Español e inglés",
    titulo: "Jerez: una bodega para acercarse a los vinos del Marco",
    url: "https://www.getyourguide.com/en-gb/jerez-de-la-frontera-l413/jerez-guided-winery-tour-with-wine-tasting-t444480/",
    descripcion: "La visita publicada se desarrolla en Cayetano del Pino y combina historia de la bodega, elaboración del vino y una degustación de dos vinos con aperitivos. Permite dedicar un tramo concreto del día a entender el producto sin organizar una excursión de jornada completa.",
    consejo: "Comprueba el nombre de la bodega y las inclusiones de tu opción, no solo el título genérico del anuncio. Una cata breve funciona mejor cuando dejas tiempo para preguntar y no la encajas entre dos visitas con horarios ajustados.",
    detalle: "La dirección indicada es plaza Silos, 3, en Jerez. La descripción actual anuncia dos vinos; algunas opiniones antiguas hablan de otras cantidades. Para reservar, toma como referencia tu modalidad y su confirmación.",
    guia: "jerez-de-la-frontera",
  },
  {
    id: "rioja", ciudad: "Rioja y Laguardia", tipo: "Excursión a bodegas", duracion: "6–8 horas", idioma: "Español e inglés",
    titulo: "Rioja: salir de la ciudad para entender el vino en su paisaje",
    url: "https://www.getyourguide.com/san-sebastian-l94/la-rioja-wine-cellar-visit-and-tasting-t110950/",
    descripcion: "Esta excursión ofrece salidas desde Bilbao, San Sebastián o Vitoria según la opción. Combina bodegas, catas y una parada en Laguardia, en Rioja Alavesa. Es una alternativa para dedicar el día al vino con transporte organizado, en vez de repartir visitas sueltas y desplazamientos por cuenta propia.",
    consejo: "Compara modalidades con cuidado. La opción de grupo bilingüe incluye una bodega y no incluye almuerzo ni recogida en el hotel; otras opciones anuncian dos bodegas, comida y recogida. No reserves guiándote únicamente por la primera fotografía o el precio inicial.",
    detalle: "La ficha establece mínimos de participantes y no la considera apta para movilidad reducida. Confirma ciudad de salida, punto de encuentro y modalidad antes de cerrar el resto de tu jornada.",
    guia: "bilbao",
  },
  {
    id: "tenerife", ciudad: "Tenerife", tipo: "Origen de un ingrediente", duracion: "1,5 horas", idioma: "Comprobar sesión",
    titulo: "Tenerife: descubrir cómo crece la vainilla en un bosque comestible",
    url: "https://www.getyourguide.com/tenerife-l350/tenerife-a-tour-in-a-food-forest-and-a-vanilla-plantation-t946617/",
    descripcion: "Finca La Canopea propone una visita sobre permacultura y cultivo de vainilla en un entorno de plantas comestibles. Es una de las experiencias españolas destacadas en la campaña Biteseeing: el foco está en conocer el proceso y a quien lo desarrolla, no en una comida de varios platos.",
    consejo: "La ficha sitúa la floración entre abril y julio. Ver flores, polinización o determinadas labores depende del momento: no está garantizado durante todo el año. La visita incluida dura una hora y media; no presupongas una degustación porque aparezca en una reseña.",
    detalle: "Se anuncia un máximo de ocho personas y no es apta para menores de doce años ni sillas de ruedas. El texto menciona sesiones por idiomas; revisa cuál está disponible en tu fecha.",
    guia: null,
  },
  {
    id: "lanzarote", ciudad: "Lanzarote", tipo: "Salinas y degustación", duracion: "1,5 horas", idioma: "Español e inglés",
    titulo: "Lanzarote: seguir el camino de la sal en Janubio",
    url: "https://www.getyourguide.com/en-gb/lanzarote-l421/lanzarote-janubio-salt-flats-guided-tour-t405847/",
    descripcion: "La visita a las Salinas de Janubio explica la obtención artesanal de sal marina y el funcionamiento del paisaje salinero. La propuesta anuncia una degustación de sales. También forma parte de la selección Biteseeing de GetYourGuide y pone en primer plano un ingrediente cotidiano que suele pasar desapercibido.",
    consejo: "Lleva calzado cómodo y protección para el sol. Es un recorrido a pie al aire libre, no una cata en una sala cerrada. Reserva margen para llegar: se pide presentar el bono en recepción quince minutos antes.",
    detalle: "La ficha no la considera apta para personas con movilidad reducida o sillas de ruedas. Puede cancelarse por mal tiempo. Compras y café aparecen como extras opcionales, no como parte del precio.",
    guia: null,
  },
] as const;
