import Link from "next/link";

const guias = {
  "sevilla": {
    "introduccion": "Sevilla permite combinar el centro monumental con los jardines de María Luisa y un paseo hacia Triana. Elige el recorrido según el calor, el tiempo disponible y la ubicación de tu concierto; reserva con antelación las visitas que lo requieran.",
    "zonas": [
      {
        "titulo": "Plaza de España y arquitectura de 1929",
        "texto": "Recorre las galerías y los bancos de cerámica y continúa hacia el Parque de María Luisa. Lleva agua y busca las horas más frescas para caminar. Comprueba posibles restricciones por actividades antes de organizar una visita larga.",
        "slug": "plaza-espana-sevilla",
        "enlace": "Ver Plaza de España"
      },
      {
        "titulo": "María Luisa: pausa entre jardines",
        "texto": "Escoge un paseo por las glorietas, fuentes y la plaza de América. Adapta la distancia a tu grupo y deja tiempo para descansar a la sombra. Consulta avisos de cierre por tiempo adverso; las visitas a los museos del entorno tienen condiciones propias.",
        "slug": "parque-maria-luisa-sevilla",
        "enlace": "Ver el Parque de María Luisa"
      },
      {
        "titulo": "Triana y el Guadalquivir",
        "texto": "Cruza el Puente de Triana para continuar hacia el Altozano, el mercado o la calle Betis. Comprueba los horarios si quieres entrar en el mercado. Al hacer fotos sobre el puente, mantén libre el paso de otras personas.",
        "slug": "puente-triana-sevilla",
        "enlace": "Ver el Puente de Triana"
      },
      {
        "titulo": "Centro monumental y música en directo",
        "texto": "Puedes completar el día con el Alcázar o la Catedral, ya disponibles en nuestras fichas. Revisa entradas y horarios y calcula por separado el desplazamiento a la sala de tu concierto. Comprueba la apertura de puertas y el transporte de regreso.",
        "slug": "real-alcazar-de-sevilla-sevilla",
        "enlace": "Ver el Real Alcázar"
      }
    ],
    "fuentes": [
      {
        "nombre": "Plaza de España",
        "url": "https://www.turismosevilla.org/es/que-ver-y-hacer/patrimonio/monuments/plaza-de-espana"
      },
      {
        "nombre": "Parque de María Luisa",
        "url": "https://visitasevilla.es/en/maria-luisa-park/"
      },
      {
        "nombre": "Puente de Triana",
        "url": "https://visitasevilla.es/puente-de-triana/"
      }
    ]
  },
  "murcia": {
    "introduccion": "En Murcia puedes organizar un recorrido por el centro histórico entre la plaza del Cardenal Belluga y Trapería, y añadir una pausa junto al Segura. Deja margen para llegar a los eventos y consulta la dirección exacta del recinto, especialmente si está fuera del centro.",
    "zonas": [
      {
        "titulo": "Catedral y plaza del Cardenal Belluga",
        "texto": "Empieza por la fachada de la Catedral y decide si quieres añadir una visita interior. Revisa por separado las condiciones del templo, el museo y la torre. Respeta las celebraciones y aprovecha el entorno para continuar a pie por el centro.",
        "slug": "catedral-murcia",
        "enlace": "Ver la Catedral de Murcia"
      },
      {
        "titulo": "Trapería y el Real Casino",
        "texto": "Reserva parte de la ruta para visitar el edificio monumental del Real Casino. Consulta la tarifa vigente y lo que incluye la audioguía. Los horarios cambian en agosto; confirma los accesos si necesitas adaptar el recorrido a tu movilidad.",
        "slug": "real-casino-murcia",
        "enlace": "Ver el Real Casino"
      },
      {
        "titulo": "Malecón: del río hacia la huerta",
        "texto": "Desde el Plano de San Francisco, junto al Mercado de Verónicas, puedes acceder al paseo del Malecón y elegir el tramo que te apetezca. Lleva agua, evita las horas de más calor y consulta posibles ocupaciones por ferias o actividades.",
        "slug": "paseo-malecon-murcia",
        "enlace": "Ver el Paseo del Malecón"
      },
      {
        "titulo": "Combinar patrimonio y concierto",
        "texto": "Comprueba la dirección de cada sala antes de reservar tu visita del día. Si el evento está en una pedanía o en otro punto del municipio, calcula ese trayecto aparte. Revisa apertura de puertas, transporte y regreso para no apurar el paseo por el centro.",
        "slug": null,
        "enlace": null
      }
    ],
    "fuentes": [
      {
        "nombre": "Catedral de Murcia",
        "url": "https://www.turismoregiondemurcia.es/es/monumento/catedral-de-murcia-327/"
      },
      {
        "nombre": "Real Casino de Murcia",
        "url": "https://realcasinomurcia.com/visitas/"
      },
      {
        "nombre": "Paseo del Malecón",
        "url": "https://www.turismoregiondemurcia.es/es/jardin/paseo-del-malecon-5120/"
      }
    ]
  }
};

export default function GuiaSevillaMurcia({ ciudad }: { ciudad: keyof typeof guias }) {
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
