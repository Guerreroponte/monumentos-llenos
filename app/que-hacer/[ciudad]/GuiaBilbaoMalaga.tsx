import Link from "next/link";

const guias = {
  bilbao: {
    introduccion: "Bilbao se presta a organizar el día entre el Casco Viejo, el Ensanche y la ría. Escoge un recorrido y deja margen para llegar a la sala: el paseo y el concierto pueden estar en zonas distintas.",
    zonas: [
      { titulo: "Casco Viejo: Siete Calles y Plaza Nueva", texto: "Empieza por las Siete Calles y combina el paseo con Plaza Nueva y el entorno de San Antón. Es una ruta para descubrir patrimonio y comercios; las visitas a edificios y los pintxos tienen sus propias condiciones. Si llueve, presta atención al pavimento.", slug: "casco-viejo-bilbao", enlace: "Ver el Casco Viejo" },
      { titulo: "Ensanche y una pausa en Doña Casilda", texto: "El parque queda entre el Palacio Euskalduna y el Museo de Bellas Artes. Puedes usarlo como pausa verde en un recorrido por el Ensanche y Abandoibarra, sin necesidad de entrar en un museo. Escoge el tramo de paseo según el tiempo que tengas.", slug: "parque-dona-casilda-bilbao", enlace: "Ver Doña Casilda" },
      { titulo: "Artxanda: subir y volver con tiempo", texto: "El funicular permite acceder al monte Artxanda para disfrutar de vistas y paseos. Consulta tarifas, servicio y tiempo de regreso; si buscas panorámicas, comprueba la previsión y la visibilidad. No apures la vuelta si después tienes una actuación.", slug: "funicular-artxanda-bilbao", enlace: "Ver el funicular de Artxanda" },
      { titulo: "Moverte y llegar a las salas", texto: "Combina trayectos a pie con Metro Bilbao o autobús según el recorrido. Revisa la dirección de Cotton Club o Azkena en su ficha y la apertura de puertas del concierto. Si el recinto está en Barakaldo, calcula ese desplazamiento por separado. Comprueba siempre el último servicio de vuelta.", slug: null, enlace: null },
    ],
    fuentes: [
      { nombre: "Turismo Euskadi", url: "https://turismo.euskadi.eus/es/patrimonio-cultural/casco-viejo-siete-calles/webtur00-content/es/" },
      { nombre: "Funicular de Artxanda", url: "https://funicularartxanda.bilbao.eus/" },
      { nombre: "Metro Bilbao", url: "https://www.metrobilbao.eus/" },
    ],
  },
  malaga: {
    introduccion: "En Málaga puedes combinar el centro histórico con el puerto o reservar parte del día para las fortalezas. Elige el recorrido según el calor, el tiempo disponible y la ubicación de tu concierto; no todas las salas están en el centro.",
    zonas: [
      { titulo: "Centro y Alcazaba: patrimonio con desnivel", texto: "Incluye la Alcazaba si quieres una visita al recinto fortificado junto al centro. Su recorrido tiene cuestas y escalinatas: lleva agua y calzado cómodo y consulta las opciones de acceso si necesitas evitar escalones. Comprueba el horario y las entradas antes de ir.", slug: "alcazaba-malaga", enlace: "Ver la Alcazaba" },
      { titulo: "Gibralfaro: una visita aparte", texto: "Reserva tiempo para desplazarte al castillo y recorrerlo. Aunque combines Gibralfaro con la Alcazaba, planifica ambos accesos por separado y revisa qué incluye la entrada conjunta. En días de calor, organiza el esfuerzo y lleva protección solar.", slug: "castillo-gibralfaro-malaga", enlace: "Ver Gibralfaro" },
      { titulo: "Muelle Uno: paseo junto al puerto", texto: "Si prefieres un recorrido sin visita a un monumento, pasea por Muelle Uno y su entorno portuario. Puedes añadir restauración o una actividad, pero comprueba sus horarios y precios. Consulta la agenda del espacio si buscas una propuesta concreta.", slug: "muelle-uno-malaga", enlace: "Ver Muelle Uno" },
      { titulo: "Transporte y música en directo", texto: "Atarazanas conecta la línea 1 de metro con el centro. Para otros trayectos, consulta Metro Málaga y EMT. Antes de un concierto en La Cochera Cabaret o cualquier otra sala, revisa la dirección exacta y calcula ida y vuelta: no presupongas que queda a un paseo del puerto.", slug: null, enlace: null },
    ],
    fuentes: [
      { nombre: "Alcazaba y Gibralfaro", url: "https://alcazabaygibralfaro.malaga.eu/es/" },
      { nombre: "Muelle Uno", url: "https://www.muelleuno.com/centro-comercial-malaga/" },
      { nombre: "Metro Málaga", url: "https://metromalaga.es/" },
      { nombre: "EMT Málaga", url: "https://www.emtmalaga.es/" },
    ],
  },
};

export default function GuiaBilbaoMalaga({ ciudad }: { ciudad: keyof typeof guias }) {
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
      <p className="text-sm">
        Información oficial: {guia.fuentes.map((fuente, i) => (
          <span key={fuente.url}>{i > 0 ? " · " : ""}<a className="text-orange-700 underline" href={fuente.url} target="_blank" rel="noopener noreferrer">{fuente.nombre}</a></span>
        ))}. Comprueba horarios y condiciones antes de salir.
      </p>
    </div>
  );
}

