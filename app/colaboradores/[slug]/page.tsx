import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type CategoriaColaborador =
  | "sala"
  | "promotora"
  | "medio"
  | "proyecto"
  | "festival"
  | "institucion";

type Colaborador = {
  id: string;
  slug: string;
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
  fecha_colaboracion: string | null;
};

type Evento = {
  id: string;
  nombre: string;
  ciudad: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  hora_inicio: string | null;
  precio: string | null;
  imagen: string | null;
  slug: string | null;
  tipo: string | null;
  ubicacion_detalle: string | null;
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

function formatearFecha(fecha: string | null) {
  if (!fecha) return null;

  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getColaborador(slug: string) {
  const { data } = await supabase
    .from("colaboradores")
    .select(`
      id,
      slug,
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
      fecha_colaboracion
    `)
    .eq("slug", slug)
    .maybeSingle();

  return (data || null) as Colaborador | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const colaborador = await getColaborador(slug);

  if (!colaborador) {
    return {
      title: "Colaborador | Lugares Llenos",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const ciudad = colaborador.ciudad ? ` en ${colaborador.ciudad}` : "";
  const title = `${colaborador.nombre}${ciudad} | Lugares Llenos`;
  const description =
    colaborador.descripcion ||
    `Descubre ${colaborador.nombre}${ciudad}, colaborador de Lugares Llenos, y consulta su información y próximos eventos.`;
  const canonical = `https://www.monumentosllenos.com/colaboradores/${colaborador.slug}`;
  const logo = colaborador.logo_url || colaborador.logo || colaborador.imagen || undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      ...(logo ? { images: [{ url: logo }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(logo ? { images: [logo] } : {}),
    },
  };
}

export default async function ColaboradorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const colaborador = await getColaborador(slug);

  if (!colaborador) {
    notFound();
  }

  const hoy = new Date().toISOString().split("T")[0];

  const { data: eventosData } = await supabase
    .from("eventos")
    .select(`
      id,
      nombre,
      ciudad,
      fecha_inicio,
      fecha_fin,
      hora_inicio,
      precio,
      imagen,
      slug,
      tipo,
      ubicacion_detalle
    `)
    .eq("colaborador_id", colaborador.id)
    .eq("reportado", false)
    .gte("fecha_inicio", hoy)
    .order("fecha_inicio", { ascending: true })
    .limit(24);

  const eventos = (eventosData || []) as Evento[];
  const logo = colaborador.logo_url || colaborador.logo;
  const categoria = colaborador.categoria_colaborador || "sala";

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/colaboradores"
            className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:text-orange-600"
          >
            ← Ver colaboradores
          </Link>

          <Link
            href="/"
            className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:text-orange-600"
          >
            Inicio
          </Link>
        </div>

        <article className="mt-8 overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-xl shadow-orange-100/70">
          {colaborador.imagen && (
            <div className="h-56 overflow-hidden sm:h-72">
              <img
                src={colaborador.imagen}
                alt={colaborador.nombre}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[26px] bg-white text-4xl shadow-md ring-1 ring-orange-100">
                {logo ? (
                  <img
                    src={logo}
                    alt={`Logo de ${colaborador.nombre}`}
                    className="h-full w-full object-contain p-3"
                  />
                ) : (
                  colaborador.icono || iconoPorCategoria(categoria)
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
                    {etiquetaCategoria(categoria)}
                  </span>

                  {colaborador.ciudad && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                      📍 {colaborador.ciudad}
                    </span>
                  )}

                  {colaborador.estado && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                      ✓ {colaborador.estado}
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  {colaborador.nombre}
                </h1>

                <p className="mt-2 text-lg font-bold text-orange-700">
                  {colaborador.tipo || "Colaborador de Lugares Llenos"}
                </p>

                {colaborador.descripcion && (
                  <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
                    {colaborador.descripcion}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  {colaborador.web && (
                    <a
                      href={colaborador.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      Web oficial ↗
                    </a>
                  )}

                  {colaborador.instagram && (
                    <a
                      href={colaborador.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-black text-orange-700 transition hover:bg-orange-100"
                    >
                      Instagram ↗
                    </a>
                  )}

                  {eventos.length > 0 && (
                    <a
                      href="#proximos-eventos"
                      className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-orange-200 hover:text-orange-700"
                    >
                      Ver próximos eventos ↓
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        <section id="proximos-eventos" className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                📅 Programación
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Próximos eventos
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Eventos vinculados a {colaborador.nombre} dentro de Lugares Llenos.
              </p>
            </div>

            {eventos.length > 0 && (
              <Link
                href={`/eventos?colaborador=${colaborador.id}`}
                className="inline-flex w-fit rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-black text-orange-700 shadow-sm transition hover:bg-orange-50"
              >
                Ver todos →
              </Link>
            )}
          </div>

          {eventos.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {eventos.map((evento) => {
                const fecha = formatearFecha(evento.fecha_inicio);

                return (
                  <Link
                    key={evento.id}
                    href={evento.slug ? `/eventos/${evento.slug}` : "/eventos"}
                    className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100"
                  >
                    {evento.imagen ? (
                      <div className="h-52 overflow-hidden bg-slate-100">
                        <img
                          src={evento.imagen}
                          alt={`Cartel de ${evento.nombre}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <div className="flex h-52 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50 text-5xl">
                        🎟️
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 text-xs font-bold">
                        {fecha && (
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                            📅 {fecha}
                          </span>
                        )}
                        {evento.tipo && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                            {evento.tipo}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-xl font-black leading-tight text-slate-950 group-hover:text-orange-700">
                        {evento.nombre}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        📍 {evento.ciudad}
                      </p>

                      {(evento.hora_inicio || evento.precio) && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                          {evento.hora_inicio && (
                            <span>🕒 {evento.hora_inicio.slice(0, 5)}</span>
                          )}
                          {evento.precio && <span>🎟️ {evento.precio}</span>}
                        </div>
                      )}

                      <p className="mt-5 text-sm font-black text-orange-600">
                        Ver evento →
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 rounded-[28px] border border-orange-100 bg-white p-7 text-slate-600 shadow-sm">
              Ahora mismo no hay próximos eventos publicados para este colaborador.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
