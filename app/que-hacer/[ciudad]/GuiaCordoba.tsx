const entradasViana = [
  {
    titulo: "12 patios y zona institucional",
    precio: "8,50 €",
    texto: "Incluye el recorrido por los doce patios y la zona institucional de la planta baja. No incluye la visita guiada al interior del palacio.",
  },
  {
    titulo: "Interior del Palacio",
    precio: "9 €",
    texto: "Visita guiada de unos 40 minutos por el interior del edificio. No equivale a la entrada de patios.",
  },
  {
    titulo: "Visita combinada",
    precio: "14 €",
    texto: "Incluye los doce patios, la zona institucional y la visita guiada al interior del Palacio.",
  },
];

export default function GuiaCordoba() {
  return (
    <div className="mt-5 space-y-7 text-base leading-8 text-slate-600">
      <p>
        Córdoba combina patrimonio histórico, patios, calles llenas de
        historia y una animada agenda cultural. Si buscas qué hacer
        en Córdoba, puedes empezar con un paseo gratuito por la
        Judería, visitar su Sinagoga y descubrir los patios del
        Palacio de Viana.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="font-bold text-slate-900">
            Pasear por la Judería de Córdoba
          </h3>
          <p>
            Recorrer libremente las calles y plazas públicas de la
            Judería es gratuito. Puedes explorar la calle Judíos,
            acercarte a la plaza de Tiberíades y contemplar el
            entorno histórico a tu ritmo. Los monumentos y museos
            situados dentro del barrio tienen sus propias
            condiciones de visita.
          </p>
          <a
            className="text-orange-700 underline"
            href="https://www.turismodecordoba.org/la-juderia-de-cordoba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Información turística de la Judería →
          </a>
        </section>

        <section>
          <h3 className="font-bold text-slate-900">
            Visitar la Sinagoga de Córdoba
          </h3>
          <p>
            Situada en la calle Judíos, 20, la Sinagoga es uno de los
            principales testimonios del patrimonio judío medieval de
            Córdoba. La entrada es gratuita, pero se trata de una
            visita independiente del paseo por el barrio.
          </p>
          <p>
            Su horario general es de martes a domingo, de 9:00 a
            15:00. Los grupos de más de seis personas deben reservar
            previamente. Comprueba posibles cambios y festivos antes
            de acudir.
          </p>
          <a
            className="text-orange-700 underline"
            href="https://www.juntadeandalucia.es/aaiicc/enclaves/enclave-monumental-sinagoga-de-cordoba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Horarios y condiciones oficiales →
          </a>
        </section>
      </div>

      <section>
        <h3 className="font-bold text-slate-900">
          Palacio de Viana: patios, interior y entradas
        </h3>
        <p>
          El Palacio de Viana, en la plaza de Don Gome, permite
          descubrir doce patios históricos y diferentes espacios
          de una antigua residencia señorial. No todas las entradas
          incluyen las mismas zonas.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {entradasViana.map((entrada) => (
            <div
              key={entrada.titulo}
              className="rounded-2xl border border-orange-100 p-4"
            >
              <h4 className="font-bold text-slate-900">
                {entrada.titulo}
              </h4>
              <p className="font-semibold text-orange-700">
                {entrada.precio}
              </p>
              <p>{entrada.texto}</p>
            </div>
          ))}
        </div>

        <p className="mt-4">
          De septiembre a diciembre de 2026, el horario general es
          de martes a sábado de 10:00 a 19:00, y domingos y festivos
          de 10:00 a 15:00, con excepciones publicadas. Habitualmente
          cierra los lunes. Existen tarifas reducidas y gratuitas
          según las condiciones del recinto.
        </p>
        <a
          className="text-orange-700 underline"
          href="https://www.palaciodeviana.com/visitas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar precios, horarios y entradas oficiales →
        </a>
      </section>

      <section>
        <h3 className="font-bold text-slate-900">
          Cómo organizar un día en Córdoba
        </h3>
        <p>
          Puedes comenzar por la Judería y la Sinagoga, reservar otra
          parte de la jornada para el Palacio de Viana y terminar
          con una actividad cultural o un concierto. Ten en cuenta
          que Viana se encuentra en otra zona del centro histórico:
          conviene calcular el desplazamiento y comprobar los horarios
          de cada visita.
        </p>
      </section>

      <p className="text-sm">
        Información contrastada con Turismo de Córdoba, la Junta de
        Andalucía y el Palacio de Viana. Tarifas consultadas en
        octubre de 2026. Comprueba siempre las condiciones vigentes
        antes de reservar o desplazarte.
      </p>
    </div>
  );
}
