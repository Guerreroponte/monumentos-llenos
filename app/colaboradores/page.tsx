import Link from "next/link";

const LOCALES = [
  {
    nombre: "Harlem Jazz Club",
    ciudad: "Barcelona",
    tipo: "Jazz y música en directo",
    estado: "Colaborador",
    descripcion:
      "Sala histórica de Barcelona que puede compartir programación, conciertos e invitaciones para la comunidad.",
    icono: "🎷",
  },
  {
    nombre: "Café La Palma",
    ciudad: "Madrid",
    tipo: "Música en directo",
    estado: "Programación",
    descripcion:
      "Sala madrileña con conciertos, sesiones y programación cultural.",
    icono: "🎸",
  },
  {
    nombre: "Loco Club",
    ciudad: "Valencia",
    tipo: "Directos y bandas",
    estado: "Recomendado",
    descripcion:
      "Sala valenciana para descubrir grupos, conciertos y ambiente local.",
    icono: "🎤",
  },
];

export default function ColaboradoresPage() {
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
            Salas y locales colaboradores
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Espacios que ayudan a mover planes reales
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Locales, salas y espacios que comparten programación, sorteos,
            invitaciones o eventos destacados para que más gente descubra planes
            con ambiente.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {LOCALES.map((local) => (
            <div
              key={local.nombre}
              className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                  📍 {local.ciudad}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  {local.estado}
                </span>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-3xl shadow-sm">
                  {local.icono}
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {local.nombre}
                  </h2>
                  <p className="mt-1 font-semibold text-orange-700">
                    {local.tipo}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">
                {local.descripcion}
              </p>

              <Link
                href="/eventos"
                className="mt-6 inline-flex font-bold text-orange-600 hover:text-orange-700"
              >
                Ver eventos →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿Tienes una sala, bar, local o espacio cultural?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Si quieres compartir programación, sorteos, invitaciones o eventos
            destacados con la comunidad, puedes escribirnos y valoramos cómo
            darle visibilidad.
          </p>

          <a
            href="mailto:hola@monumentosllenos.com"
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md shadow-orange-100"
          >
            Quiero colaborar
          </a>
        </div>
      </section>
    </main>
  );
}