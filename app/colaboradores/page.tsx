import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ProgramacionColaborador = {
  id: string;
  titulo: string;
  fecha_texto: string | null;
  url: string | null;
  activa: boolean | null;
  orden: number | null;
};

type CategoriaColaborador =
  | "sala"
  | "promotora"
  | "medio"
  | "proyecto"
  | "festival"
  | "institucion";

type Colaborador = {
  id: string;
  nombre: string;
  ciudad: string | null;
  tipo: string | null;
  categoria_colaborador: CategoriaColaborador | null;
  estado: string | null;
  descripcion: string | null;
  icono: string | null;
  web: string | null;
  instagram: string | null;
  email: string | null;
  destacado: boolean | null;
  logo: string | null;
  logo_url: string | null;
  imagen: string | null;
  sorteo_activo: boolean | null;
  titulo_sorteo: string | null;
  descripcion_sorteo: string | null;
  fecha_sorteo: string | null;
  programacion_texto: string | null;
  programacion_activa: boolean | null;
  programacion_enlace: string | null;
  colaboradores_programacion?: ProgramacionColaborador[];
};

type ColaboradorConProgramacion = Colaborador & {
  programacion: ProgramacionColaborador[];
};

export const dynamic = "force-dynamic";

function etiquetaCategoria(categoria: CategoriaColaborador | null) {
  switch (categoria) {
    case "medio":
      return "📰 Medio colaborador";
    case "proyecto":
      return "🤝 Proyecto colaborador";
    case "promotora":
      return "🎟️ Promotora colaboradora";
    case "festival":
      return "🎪 Festival colaborador";
    case "institucion":
      return "🏛️ Institución colaboradora";
    default:
      return "🎵 Sala colaboradora";
  }
}

function iconoPorCategoria(categoria: CategoriaColaborador | null) {
  switch (categoria) {
    case "medio":
      return "📰";
    case "proyecto":
      return "🤝";
    case "promotora":
      return "🎟️";
    case "festival":
      return "🎪";
    case "institucion":
      return "🏛️";
    default:
      return "🎵";
  }
}

function ColaboradorCard({
  colaborador,
  mostrarEventos = false,
}: {
  colaborador: Colaborador;
  mostrarEventos?: boolean;
}) {
  const categoria = colaborador.categoria_colaborador || "sala";
  const logo = colaborador.logo_url || colaborador.logo;

  return (
    <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-lg shadow-orange-100">
      {colaborador.imagen && (
        <img
          src={colaborador.imagen}
          alt={colaborador.nombre}
          className="h-44 w-full object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
            {etiquetaCategoria(categoria)}
          </span>

          {colaborador.ciudad && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              📍 {colaborador.ciudad}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-orange-100">
            {logo ? (
              <img
                src={logo}
                alt={`Logo de ${colaborador.nombre}`}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              colaborador.icono || iconoPorCategoria(categoria)
            )}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {colaborador.nombre}
            </h2>

            <p className="mt-1 font-semibold text-orange-700">
              {colaborador.tipo || "Colaborador de Lugares Llenos"}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          {colaborador.descripcion ||
            "Colaborador de la comunidad Lugares Llenos."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {mostrarEventos && (
            <Link
              href="/eventos"
              className="inline-flex font-bold text-orange-600 hover:text-orange-700"
            >
              Ver eventos →
            </Link>
          )}

          {colaborador.web && (
            <a
              href={colaborador.web}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-bold text-slate-600 hover:text-orange-700"
            >
              Web oficial →
            </a>
          )}

          {colaborador.instagram && (
            <a
              href={colaborador.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-bold text-slate-600 hover:text-orange-700"
            >
              Instagram →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function ColaboradoresPage() {
  const { data, error } = await supabase
    .from("colaboradores")
    .select(`
      id,
      nombre,
      ciudad,
      tipo,
      categoria_colaborador,
      estado,
      descripcion,
      icono,
      web,
      instagram,
      email,
      destacado,
      logo,
      logo_url,
      imagen,
      sorteo_activo,
      titulo_sorteo,
      descripcion_sorteo,
      fecha_sorteo,
      programacion_texto,
      programacion_activa,
      programacion_enlace,
      colaboradores_programacion (
        id,
        titulo,
        fecha_texto,
        url,
        activa,
        orden
      )
    `)
    .eq("destacado", true)
    .order("created_at", { ascending: true });

  const colaboradores = ((data || []) as Colaborador[]).filter(Boolean);

  const colaboradoresMusicales = colaboradores.filter(
    (colaborador) =>
      !colaborador.categoria_colaborador ||
      colaborador.categoria_colaborador === "sala" ||
      colaborador.categoria_colaborador === "promotora" ||
      colaborador.categoria_colaborador === "festival" ||
      colaborador.categoria_colaborador === "institucion",
  );

  const mediosYProyectos = colaboradores.filter(
    (colaborador) =>
      colaborador.categoria_colaborador === "medio" ||
      colaborador.categoria_colaborador === "proyecto",
  );

  const colaboradoresConProgramacion: ColaboradorConProgramacion[] =
    colaboradoresMusicales
    .map((local) => {
      const programacionNueva = (local.colaboradores_programacion || [])
        .filter((evento) => evento.activa && evento.titulo)
        .sort((a, b) => (a.orden || 0) - (b.orden || 0));

      const programacionAntigua: ProgramacionColaborador[] =
        local.programacion_activa && local.programacion_texto
          ? [
              {
                id: `${local.id}-programacion-antigua`,
                titulo: local.programacion_texto,
                fecha_texto: null,
                url: local.programacion_enlace,
                activa: true,
                orden: 999,
              },
            ]
          : [];

      return {
        ...local,
        programacion: [...programacionNueva, ...programacionAntigua],
      };
    })
    .filter((local) => local.programacion.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href="/"
          className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:text-orange-600"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-8 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Comunidad colaboradora
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            {colaboradores.length} colaboradores que ayudan a mover planes reales
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Salas, medios, proyectos, promotoras y espacios que comparten
            programación, recomendaciones, sorteos o eventos destacados para que
            más personas descubran música y planes con ambiente.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            No se han podido cargar los colaboradores ahora mismo.
          </div>
        )}

        {colaboradoresMusicales.length > 0 && (
          <section className="mt-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                🎵 Colaboradores musicales
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Espacios y organizaciones donde la música sucede
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Salas, ciclos, festivales, promotoras e instituciones que comparten
                conciertos y programación con la comunidad de Lugares Llenos.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {colaboradoresMusicales.map((colaborador) => (
                <ColaboradorCard
                  key={colaborador.id}
                  colaborador={colaborador}
                  mostrarEventos
                />
              ))}
            </div>
          </section>
        )}

        {mediosYProyectos.length > 0 && (
          <section className="mt-16">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                📰 Medios y proyectos colaboradores
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Comunidades que impulsan y recomiendan música
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Medios, comunidades y proyectos que dan visibilidad a artistas,
                festivales, salas y nuevas propuestas musicales.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {mediosYProyectos.map((colaborador) => (
                <ColaboradorCard
                  key={colaborador.id}
                  colaborador={colaborador}
                />
              ))}
            </div>
          </section>
        )}

        {colaboradores.length === 0 && !error && (
          <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-6 text-slate-600 shadow-lg shadow-orange-100">
            Todavía no hay colaboradores destacados visibles.
          </div>
        )}

        <div className="mt-16 rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-lg shadow-orange-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Beneficios exclusivos para la comunidad
            </h2>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Sorteos, entradas, descuentos, merchandising y experiencias
            especiales compartidas por salas, marcas y colaboradores de Lugares
            Llenos.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                🎟️ Entradas
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Entradas, sorteos y experiencias
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Muy pronto lanzaremos sorteos, invitaciones y experiencias
                exclusivas junto a nuestras salas y marcas colaboradoras.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                🎁 Regalos
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Merchandising, descuentos y regalos
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Aquí encontrarás merchandising exclusivo, descuentos, packs,
                regalos e invitaciones especiales de nuestros colaboradores.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                🍸 Marcas
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Acciones con marcas colaboradoras
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Activaciones especiales con marcas que apoyan la música, los
                planes locales y las experiencias reales.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                ⭐ Comunidad
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Concursos y ventajas exclusivas
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Concursos, retos, invitaciones y beneficios pensados para las
                personas que participan en Lugares Llenos.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-100 bg-white/80 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Próximamente con salas, marcas y partners
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                🎵 Salas colaboradoras
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                📰 Medios colaboradores
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                🍸 Vermut Zarro
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                🌍 GetYourGuide
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                🎟️ Entradas
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                👕 Merchandising
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                🎁 Regalos
              </span>
            </div>
          </div>
        </div>

        {colaboradoresConProgramacion.length > 0 && (
          <div className="mt-10 rounded-3xl border border-orange-200 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎵</span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Programación destacada de colaboradores musicales
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {colaboradoresConProgramacion.map((colaborador) => (
                <div
                  key={colaborador.id}
                  className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                    {colaborador.nombre}
                  </p>

                  <div className="mt-3 space-y-4">
                    {colaborador.programacion.map((evento) => (
                      <div
                        key={evento.id}
                        className="rounded-2xl bg-white/80 p-4 shadow-sm"
                      >
                        <p className="text-lg font-bold text-slate-900">
                          {evento.titulo}
                        </p>

                        {evento.fecha_texto && (
                          <p className="mt-1 text-sm font-semibold text-slate-600">
                            📅 {evento.fecha_texto}
                          </p>
                        )}

                        {evento.url && evento.url !== "#" && (
                          <a
                            href={evento.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex font-bold text-orange-600 hover:text-orange-700"
                          >
                            Ver evento →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-8 shadow-lg shadow-orange-100">
          <h2 className="text-3xl font-bold text-slate-900">
            ¿Tienes una sala, promotora, medio o proyecto cultural?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            En Lugares Llenos ayudamos a dar visibilidad a espacios, medios y
            proyectos que impulsan la música, la cultura y los planes reales. Si
            organizas conciertos, compartes recomendaciones o apoyas la escena
            cultural, podemos colaborar para que más personas te descubran.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            También estamos abiertos a compartir programación, sorteos,
            invitaciones, promociones especiales, contenidos y eventos
            destacados para la comunidad.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎟️ Sorteos
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎵 Programación
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              📰 Contenido musical
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎫 Invitaciones
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              👕 Merchandising
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              📣 Promoción de eventos
            </span>
          </div>

          <a
            href="mailto:contacto@monumentosllenos.com?subject=Quiero%20colaborar%20con%20Lugares%20Llenos"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-md shadow-orange-100 transition hover:scale-105"
          >
            Quiero colaborar
          </a>
        </div>
      </section>
    </main>
  );
}
