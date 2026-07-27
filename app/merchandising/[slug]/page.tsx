import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type TipoProducto = "camiseta" | "gorra";

type Producto = {
  slug: string;
  nombre: string;
  nombreCorto: string;
  color: string;
  tipo: TipoProducto;
  imagen: string;
  descripcion: string;
  detalles: string[];
  coloresRelacionados: string;
};

const PRODUCTOS: Record<string, Producto> = {
  "camiseta-negra": {
    slug: "camiseta-negra",
    nombre: "Camiseta Lugares Llenos Negra",
    nombreCorto: "Camiseta negra",
    color: "Negra",
    tipo: "camiseta",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-negra.png",
    descripcion:
      "Camiseta negra de la primera colección oficial de Lugares Llenos. Incluye el logotipo en la parte delantera y una ilustración inspirada en la música en directo en la espalda.",
    detalles: [
      "100 % algodón",
      "Corte unisex",
      "Logotipo delantero",
      "Diseño de escenario en la espalda",
    ],
    coloresRelacionados: "Negro y blanco",
  },

  "camiseta-blanca": {
    slug: "camiseta-blanca",
    nombre: "Camiseta Lugares Llenos Blanca",
    nombreCorto: "Camiseta blanca",
    color: "Blanca",
    tipo: "camiseta",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-blanca.png",
    descripcion:
      "Camiseta blanca de la primera colección oficial de Lugares Llenos. El diseño combina el logotipo naranja en el pecho con un mapa de España y diferentes puntos por descubrir en la espalda.",
    detalles: [
      "100 % algodón",
      "Corte unisex",
      "Logotipo naranja delantero",
      "Mapa de España en la espalda",
    ],
    coloresRelacionados: "Blanco, negro y naranja",
  },

  "camiseta-sand": {
    slug: "camiseta-sand",
    nombre: "Camiseta Lugares Llenos Sand",
    nombreCorto: "Camiseta sand",
    color: "Sand",
    tipo: "camiseta",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-sand.png",
    descripcion:
      "Camiseta color sand de la primera colección oficial de Lugares Llenos. Presenta el logotipo en el pecho y una ilustración minimalista de paisaje, patrimonio y lugares únicos en la espalda.",
    detalles: [
      "100 % algodón",
      "Corte unisex",
      "Logotipo delantero",
      "Ilustración de paisaje y patrimonio",
    ],
    coloresRelacionados: "Arena y negro",
  },

  "camiseta-forest-green": {
    slug: "camiseta-forest-green",
    nombre: "Camiseta Lugares Llenos Forest Green",
    nombreCorto: "Camiseta forest green",
    color: "Forest Green",
    tipo: "camiseta",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/camiseta-forest-green.png",
    descripcion:
      "Camiseta forest green de la primera colección oficial de Lugares Llenos. Incluye el logotipo en la parte delantera y un diseño de ubicación musical en la espalda.",
    detalles: [
      "100 % algodón",
      "Corte unisex",
      "Logotipo delantero",
      "Diseño musical en la espalda",
    ],
    coloresRelacionados: "Verde botella y beige",
  },

  "gorra-negra": {
    slug: "gorra-negra",
    nombre: "Gorra Lugares Llenos Negra",
    nombreCorto: "Gorra negra",
    color: "Negra",
    tipo: "gorra",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-negra.png",
    descripcion:
      "Gorra negra ajustable de la primera colección oficial de Lugares Llenos. Cuenta con el logotipo bordado en el frontal, un pequeño detalle lateral y el nombre de la comunidad en la parte trasera.",
    detalles: [
      "Talla única ajustable",
      "Bordado frontal en 3D",
      "Detalle bordado lateral",
      "Lugares Llenos en la parte trasera",
    ],
    coloresRelacionados: "Negro y blanco",
  },

  "gorra-beige": {
    slug: "gorra-beige",
    nombre: "Gorra Lugares Llenos Beige",
    nombreCorto: "Gorra beige",
    color: "Beige",
    tipo: "gorra",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-beige.png",
    descripcion:
      "Gorra beige ajustable de la primera colección oficial de Lugares Llenos. Un diseño versátil con el logotipo bordado en el frontal, detalle lateral y nombre bordado en la parte trasera.",
    detalles: [
      "Talla única ajustable",
      "Bordado frontal en 3D",
      "Detalle bordado lateral",
      "Lugares Llenos en la parte trasera",
    ],
    coloresRelacionados: "Beige y negro",
  },

  "gorra-verde-botella": {
    slug: "gorra-verde-botella",
    nombre: "Gorra Lugares Llenos Verde Botella",
    nombreCorto: "Gorra verde botella",
    color: "Verde botella",
    tipo: "gorra",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-verde-botella.png",
    descripcion:
      "Gorra verde botella ajustable de la primera colección oficial de Lugares Llenos. Incluye bordado frontal, detalle lateral y el nombre de la comunidad en la parte trasera.",
    detalles: [
      "Talla única ajustable",
      "Bordado frontal en 3D",
      "Detalle bordado lateral",
      "Lugares Llenos en la parte trasera",
    ],
    coloresRelacionados: "Verde botella y beige",
  },

  "gorra-blanca": {
    slug: "gorra-blanca",
    nombre: "Gorra Lugares Llenos Blanca",
    nombreCorto: "Gorra blanca",
    color: "Blanca",
    tipo: "gorra",
    imagen:
      "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/merchandising/gorra-blanca.png",
    descripcion:
      "Gorra blanca ajustable de la primera colección oficial de Lugares Llenos. El bordado naranja aporta el toque característico de la marca en el frontal, el lateral y la parte trasera.",
    detalles: [
      "Talla única ajustable",
      "Bordado frontal en 3D",
      "Detalle bordado lateral",
      "Lugares Llenos en la parte trasera",
    ],
    coloresRelacionados: "Blanco y naranja",
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PRODUCTOS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const producto = PRODUCTOS[slug];

  if (!producto) {
    return {
      title: "Producto no encontrado | Lugares Llenos",
    };
  }

  return {
    title: `${producto.nombre} | Lugares Llenos`,
    description: producto.descripcion,
    alternates: {
      canonical: `/merchandising/${producto.slug}`,
    },
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion,
      type: "website",
      images: [
        {
          url: producto.imagen,
          alt: producto.nombre,
        },
      ],
    },
  };
}

export default async function ProductoMerchandisingPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const producto = PRODUCTOS[slug];

  if (!producto) {
    notFound();
  }

  const esCamiseta = producto.tipo === "camiseta";

  const productosRelacionados = Object.values(PRODUCTOS)
    .filter(
      (productoRelacionado) =>
        productoRelacionado.tipo === producto.tipo &&
        productoRelacionado.slug !== producto.slug,
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        {/* NAVEGACIÓN */}
        <nav
          aria-label="Migas de pan"
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500"
        >
          <Link
            href="/"
            className="transition hover:text-orange-600"
          >
            Inicio
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href="/merchandising"
            className="transition hover:text-orange-600"
          >
            Merchandising
          </Link>

          <span aria-hidden="true">/</span>

          <span className="text-slate-900">{producto.nombreCorto}</span>
        </nav>

        <Link
          href="/merchandising"
          className="mt-6 inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-orange-600 hover:shadow-md"
        >
          ← Volver a la colección
        </Link>

        {/* FICHA PRINCIPAL */}
        <section className="mt-8 overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-xl shadow-orange-100">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* IMAGEN */}
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4 sm:p-8 lg:min-h-[650px]">
              <div className="absolute left-5 top-5 z-10">
                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 shadow-md backdrop-blur">
                  Colección 01
                </span>
              </div>

              <img
                src={producto.imagen}
                alt={`${producto.nombre}, vista delantera y trasera`}
                className="h-auto max-h-[620px] w-full rounded-3xl object-contain"
              />
            </div>

            {/* INFORMACIÓN */}
            <div className="flex flex-col justify-center border-t border-orange-100 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                  {esCamiseta ? "Camiseta oficial" : "Gorra oficial"}
                </p>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                  Primera colección
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                {producto.nombre}
              </h1>

              <p className="mt-4 text-base font-bold text-slate-500">
                Color:{" "}
                <span className="text-slate-900">{producto.color}</span>
              </p>

              <p className="mt-6 text-base leading-7 text-slate-600">
                {producto.descripcion}
              </p>

              {/* TALLAS */}
              <div className="mt-8 border-t border-orange-100 pt-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-900">
                    {esCamiseta ? "Tallas previstas" : "Talla"}
                  </h2>

                  <span className="text-xs font-semibold text-slate-500">
                    Próximamente
                  </span>
                </div>

                {esCamiseta ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((talla) => (
                      <span
                        key={talla}
                        className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-500"
                      >
                        {talla}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700">
                    Talla única ajustable
                  </div>
                )}
              </div>

              {/* ESTADO */}
              <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                      Estado
                    </p>

                    <p className="mt-2 text-xl font-extrabold">
                      Disponible próximamente
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Estamos preparando la primera edición de la colección.
                    </p>
                  </div>

                  <span className="inline-flex w-fit shrink-0 rounded-full bg-orange-400 px-5 py-2.5 text-sm font-extrabold text-slate-950">
                    Próximamente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETALLES DEL PRODUCTO */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
              Características
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              Detalles del modelo
            </h2>

            <ul className="mt-6 space-y-4">
              {producto.detalles.map((detalle) => (
                <li
                  key={detalle}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-700">
                    ✓
                  </span>

                  <span>{detalle}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-orange-100 bg-white p-7 shadow-lg shadow-orange-100">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
              Diseño
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              Inspirada en Lugares Llenos
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Una pieza creada para representar la música en directo, los viajes,
              la cultura y todos esos lugares que merece la pena descubrir y
              compartir.
            </p>

            <div className="mt-6 rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                Colores del diseño
              </p>

              <p className="mt-2 font-bold text-slate-900">
                {producto.coloresRelacionados}
              </p>
            </div>
          </article>
        </section>

        {/* PRODUCTOS RELACIONADOS */}
        <section className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                También te pueden gustar
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                Otros colores de la colección
              </h2>
            </div>

            <Link
              href="/merchandising"
              className="text-sm font-bold text-orange-600 transition hover:text-orange-700"
            >
              Ver toda la colección →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosRelacionados.map((productoRelacionado) => (
              <Link
                key={productoRelacionado.slug}
                href={`/merchandising/${productoRelacionado.slug}`}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-orange-50 p-4">
                  <img
                    src={productoRelacionado.imagen}
                    alt={productoRelacionado.nombre}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="border-t border-orange-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                    {productoRelacionado.tipo === "camiseta"
                      ? "Camiseta"
                      : "Gorra"}
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                    {productoRelacionado.nombreCorto}
                  </h3>

                  <p className="mt-3 text-sm font-bold text-orange-600">
                    Ver modelo →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CIERRE */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-xl sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">
                Primera edición
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Una colección creada para la comunidad
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Muy pronto compartiremos la disponibilidad, las tallas y toda la
                información necesaria para conseguir los primeros modelos de
                Lugares Llenos.
              </p>
            </div>

            <Link
              href="/merchandising"
              className="inline-flex w-fit justify-center rounded-full bg-orange-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-300"
            >
              Ver colección completa
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}