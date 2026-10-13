import Link from "next/link";

const guias = {
  pamplona: {
    introduccion: "Organiza tu visita a Pamplona entre los jardines, las murallas y el Casco Antiguo. Puedes combinar un paseo con la agenda de música en directo, dejando margen para llegar al recinto y para volver después del concierto.",
    zonas: [
      { titulo: "Ciudadela y Vuelta del Castillo", texto: "Empieza por el entorno verde de la fortificación y añade una exposición si te interesa la programación municipal. Comprueba los horarios del recinto y de las salas antes de ir: el paseo exterior y la visita cultural pueden requerir tiempos distintos.", slug: "ciudadela-pamplona", enlace: "Ver la Ciudadela" },
      { titulo: "Taconera: una pausa en los jardines", texto: "Reserva un tramo para caminar entre árboles, fuentes y esculturas. Puedes acercarte a los antiguos fosos para observar los animales desde las zonas habilitadas. Es una opción para descansar antes de continuar hacia el Casco Antiguo, con juegos infantiles y aseos públicos.", slug: "jardines-taconera-pamplona", enlace: "Ver los Jardines de la Taconera" },
      { titulo: "Casco Antiguo y mirador del Redín", texto: "Combina el entorno de la catedral y la plaza de San José con el Rincón del Caballo Blanco. Allí puedes disfrutar de las murallas y las vistas. Lleva calzado cómodo para el pavimento histórico y adapta el paseo al tiempo. Las consumiciones del establecimiento se organizan aparte.", slug: "rincon-caballo-blanco-pamplona", enlace: "Ver el Rincón del Caballo Blanco" },
      { titulo: "Del paseo al concierto", texto: "Comprueba la dirección del recinto y la apertura de puertas en la ficha del evento. Si necesitas transporte, consulta las opciones de movilidad de Turismo de Pamplona y planifica también el regreso. No apures la visita a los jardines si después tienes una actuación con hora fija.", slug: null, enlace: null },
    ],
    fuentes: [
      { nombre: "Turismo de Pamplona: Ciudadela", url: "https://visitpamplonairuna.com/lugar/ciudadela-y-vuelta-del-castillo/" },
      { nombre: "Taconera", url: "https://visitpamplonairuna.com/lugar/jardines-de-la-taconera/" },
      { nombre: "Caballo Blanco", url: "https://visitpamplonairuna.com/lugar/rincon-del-caballo-blanco/" },
      { nombre: "Planifica tu visita", url: "https://visitpamplonairuna.com/" },
    ],
  },
  zaragoza: {
    introduccion: "En Zaragoza puedes elegir un recorrido por el Pilar y el Ebro, una visita a la Aljafería o una pausa en el Parque Grande. Escoge la zona según el tiempo disponible y la dirección de tu concierto, y calcula los desplazamientos entre cada parte del plan.",
    zonas: [
      { titulo: "El Pilar y el centro histórico", texto: "Empieza por la plaza del Pilar y decide si quieres entrar en la basílica. Consulta los horarios y respeta las celebraciones religiosas. Si quieres subir al ascensor panorámico, revisa su entrada y condiciones propias antes de organizar la visita.", slug: "basilica-pilar-zaragoza", enlace: "Ver la Basílica del Pilar" },
      { titulo: "Puente de Piedra: mirar la ciudad desde el Ebro", texto: "Continúa hacia el puente para conectar el Casco Histórico con el Arrabal y contemplar el Pilar desde la otra orilla. Deja libre el paso al hacer fotos y revisa la previsión: el viento puede condicionar el paseo junto al río.", slug: "puente-piedra-zaragoza", enlace: "Ver el Puente de Piedra" },
      { titulo: "Parque Grande: un recorrido verde", texto: "Dedica parte del día a sus caminos, jardines y fuentes. Elige un tramo acorde a tu tiempo y movilidad, lleva agua en días de calor y calcula la vuelta al centro o al recinto de tu concierto. Los establecimientos del parque tienen sus propios horarios.", slug: "parque-grande-labordeta-zaragoza", enlace: "Ver el Parque Grande" },
      { titulo: "Aljafería y agenda de música", texto: "La Aljafería permite ampliar la ruta de patrimonio de Zaragoza. Revisa las condiciones de acceso en su ficha y organiza esta visita con tiempo suficiente antes de cualquier evento. Comprueba la dirección de la sala y las opciones de regreso para completar el día.", slug: "palacio-de-la-aljaferia-zaragoza", enlace: "Ver la Aljafería" },
    ],
    fuentes: [
      { nombre: "Turismo de Zaragoza: Pilar", url: "https://www.zaragoza.es/sede/portal/turismo/post/el-pilar" },
      { nombre: "Puente de Piedra", url: "https://www.zaragoza.es/sede/portal/turismo/post/puente-de-piedra" },
      { nombre: "Parque Grande", url: "https://www.zaragoza.es/sede/portal/turismo/post/parque-grande-jose-antonio-labordeta" },
    ],
  },
};

export default function GuiaPamplonaZaragoza({ ciudad }: { ciudad: keyof typeof guias }) {
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
