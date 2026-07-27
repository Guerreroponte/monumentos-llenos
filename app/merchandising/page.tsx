import Link from "next/link";

const IMAGEN_COLECCION =
  "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/primeros-modelos.png";

export default function MerchandisingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href="/colaboradores"
          className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-orange-600 hover:shadow-md"
        >
          ← Volver a colaboradores
        </Link>

        {/* HERO PRINCIPAL */}
        <section className="mt-8 overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-xl shadow-orange-100">
          <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
                  Merchandising oficial
                </p>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                  Primera colección
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
                Lleva contigo
                <span className="block text-orange-600">Lugares Llenos</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                No es solo merchandising. Es una forma de apoyar una comunidad
                que descubre música en directo, viajes, cultura y lugares únicos
                por toda España.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#camisetas"
                  className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100 transition hover:bg-orange-100 hover:text-orange-700"
                >
                  👕 Camisetas
                </a>

                <a
                  href="#gorras"
                  className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100 transition hover:bg-orange-100 hover:text-orange-700"
                >
                  🧢 Gorras
                </a>

                <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-orange-100">
                  ✨ Diseños exclusivos
                </span>
              </div>
            </div>

            {/* IMAGEN DE LA COLECCIÓN */}
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-orange-50 shadow-xl">
              <div className="absolute left-4 top-4 z-10">
                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 shadow-md backdrop-blur">
                  Colección 01
                </span>
              </div>

              <img
                src={IMAGEN_COLECCION}
                alt="Primeros modelos de camisetas y gorras de Lugares Llenos"
                className="h-auto min-h-[340px] w-full object-contain p-3 pt-16 sm:p-5 sm:pt-16"
              />

              <div className="border-t border-orange-100 bg-white px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                      Primera edición
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                      Ocho primeros modelos inspirados en la música en directo,
                      los viajes y los lugares únicos de España.
                    </p>
                  </div>

                  <span className="inline-flex w-fit shrink-0 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white">
                    Próximamente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCCIÓN A LA COLECCIÓN */}
        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
              La colección
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Diseñada para quienes viven los planes de verdad
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Una primera colección sencilla, reconocible y conectada con la
              identidad de Lugares Llenos. Diseños pensados para acompañarte en
              conciertos, viajes y experiencias especiales.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* CAMISETAS */}
            <article
              id="camisetas"
              className="scroll-mt-28 rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                  👕
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-700 ring-1 ring-orange-100">
                  4 modelos
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                Camisetas
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Diseños limpios y cómodos con el logotipo de Lugares Llenos en
                la parte delantera y una ilustración minimalista en la espalda.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Negra
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Blanca
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Arena
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Verde
                </span>
              </div>

              <div className="mt-7 border-t border-orange-100 pt-5">
                <p className="text-sm font-bold text-orange-600">
                  Modelos individuales próximamente →
                </p>
              </div>
            </article>

            {/* GORRAS */}
            <article
              id="gorras"
              className="scroll-mt-28 rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                  🧢
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-700 ring-1 ring-orange-100">
                  4 modelos
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                Gorras
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Gorras con el logotipo bordado de Lugares Llenos en el frontal,
                un pequeño detalle lateral y el nombre de la comunidad en la
                parte trasera.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Negra
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Beige
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Verde
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                  Blanca
                </span>
              </div>

              <div className="mt-7 border-t border-orange-100 pt-5">
                <p className="text-sm font-bold text-orange-600">
                  Modelos individuales próximamente →
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* VALORES DE LA COLECCIÓN */}
        <section className="mt-16 rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
              Nuestra identidad
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Una colección para llevar la comunidad contigo
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100">
              <p className="text-2xl">🎵</p>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Música en directo
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Inspirada en las salas, conciertos y artistas que llenan de vida
                nuestras ciudades.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100">
              <p className="text-2xl">📍</p>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Lugares únicos
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Una identidad conectada con los espacios y experiencias que
                merece la pena descubrir.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100">
              <p className="text-2xl">🤝</p>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Comunidad real
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Una forma de apoyar y representar a la comunidad de Lugares
                Llenos.
              </p>
            </div>
          </div>
        </section>

        {/* CIERRE */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">
                Muy pronto
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Estamos preparando la primera edición
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Próximamente compartiremos los modelos individuales, las tallas,
                la disponibilidad y toda la información necesaria para
                conseguirlos.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-7 py-6 text-center ring-1 ring-white/15">
              <p className="text-4xl font-black text-orange-300">8</p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                primeros modelos
              </p>

              <p className="mt-2 text-xs text-slate-400">
                4 camisetas · 4 gorras
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}