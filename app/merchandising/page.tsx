import Link from "next/link";

const IMAGEN_COLECCION =
  "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/primeros-modelos.png";

type Producto = {
  slug: string;
  nombre: string;
  color: string;
  imagen: string;
};

const CAMISETAS: Producto[] = [
  {
    slug: "camiseta-negra",
    nombre: "Camiseta negra",
    color: "Black",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-negra.png",
  },
  {
    slug: "camiseta-blanca",
    nombre: "Camiseta blanca",
    color: "White",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-blanca.png",
  },
  {
    slug: "camiseta-sand",
    nombre: "Camiseta sand",
    color: "Sand",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-sand.png",
  },
  {
    slug: "camiseta-forest-green",
    nombre: "Camiseta forest green",
    color: "Forest Green",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-forest-green.png",
  },
];

const GORRAS: Producto[] = [
  {
    slug: "gorra-negra",
    nombre: "Gorra negra",
    color: "Negra",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-negra.png",
  },
  {
    slug: "gorra-beige",
    nombre: "Gorra beige",
    color: "Beige",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-beige.png",
  },
  {
    slug: "gorra-verde-botella",
    nombre: "Gorra verde botella",
    color: "Verde botella",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-verde-botella.png",
  },
  {
    slug: "gorra-blanca",
    nombre: "Gorra blanca",
    color: "Blanca",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-blanca.png",
  },
];

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

        {/* INTRODUCCIÓN */}
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
              identidad de Lugares Llenos. Selecciona cualquier modelo para
              descubrir todos sus detalles.
            </p>
          </div>
        </section>

        {/* CAMISETAS */}
        <section id="camisetas" className="mt-16 scroll-mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                  👕
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                  Cuatro modelos
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                Camisetas
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Logotipo delantero y una ilustración diferente en la espalda de
                cada modelo.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100">
              100 % algodón · Corte unisex
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAMISETAS.map((producto) => (
              <Link
                key={producto.slug}
                href={`/merchandising/${producto.slug}`}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 p-3">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600 shadow-sm">
                    Próximamente
                  </span>

                  <img
                    src={producto.imagen}
                    alt={`${producto.nombre} de Lugares Llenos`}
                    className="h-full w-full rounded-2xl object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="border-t border-orange-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                    Camiseta oficial
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                    {producto.nombre}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Color: {producto.color}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-4">
                    <span className="text-sm font-bold text-orange-600">
                      Ver modelo
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* GORRAS */}
        <section id="gorras" className="mt-20 scroll-mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                  🧢
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                  Cuatro modelos
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                Gorras
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Bordado frontal, detalle lateral y el nombre de Lugares Llenos
                en la parte trasera.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100">
              Ajustables · Bordado 3D · Unisex
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GORRAS.map((producto) => (
              <Link
                key={producto.slug}
                href={`/merchandising/${producto.slug}`}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 p-3">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600 shadow-sm">
                    Próximamente
                  </span>

                  <img
                    src={producto.imagen}
                    alt={`${producto.nombre} de Lugares Llenos`}
                    className="h-full w-full rounded-2xl object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="border-t border-orange-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                    Gorra oficial
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                    {producto.nombre}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Color: {producto.color}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-4">
                    <span className="text-sm font-bold text-orange-600">
                      Ver modelo
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 font-bold text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VALORES DE LA COLECCIÓN */}
        <section className="mt-20 rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100 sm:p-10">
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
                Ya puedes descubrir individualmente los ocho primeros modelos.
                Próximamente compartiremos las tallas, la disponibilidad y toda
                la información necesaria para conseguirlos.
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