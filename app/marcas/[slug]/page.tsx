import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type MarcaColaboradora = {
  id: string;
  nombre: string;
  slug: string;
  logo_url: string | null;
  web_url: string | null;
  descripcion: string | null;
  descripcion_corta: string | null;
  color: string | null;
  activa: boolean | null;
  destacada: boolean | null;
  orden: number | null;
  created_at: string | null;
};

type MarcaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function MarcaPage({ params }: MarcaPageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("marcas_colaboradoras")
    .select(
      "id, nombre, slug, logo_url, web_url, descripcion, descripcion_corta, color, activa, destacada, orden, created_at"
    )
    .eq("slug", slug)
    .eq("activa", true)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const marca = data as MarcaColaboradora;
  const esVermutZarro = marca.slug === "vermut-zarro";

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href="/"
          className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:text-orange-600"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-lg shadow-orange-100">
          <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 p-8 text-white md:p-12">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.35),transparent_30%)]" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/85">
                  Marca colaboradora oficial
                </p>

                <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
                  {marca.nombre}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
                  {esVermutZarro
                    ? "El vermut de Madrid que se suma a Lugares Llenos para conectar con nuevos públicos a través de planes, ocio y experiencias reales."
                    : marca.descripcion_corta ||
                      "Marca colaboradora de Lugares Llenos."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                    🤝 Marca colaboradora
                  </span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                    📍 Experiencias reales
                  </span>
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                    🍸 Ocio local
                  </span>
                </div>
              </div>

              <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white p-5 shadow-xl ring-1 ring-white/40 md:h-44 md:w-44">
                {marca.logo_url ? (
                  <img
                    src={marca.logo_url}
                    alt={`Logo ${marca.nombre}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-5xl">🤝</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-3xl border border-orange-100 bg-orange-50/60 p-6 md:col-span-2">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                Qué es {marca.nombre}
              </p>

              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                {esVermutZarro
                  ? "Una marca de vermut con tradición madrileña"
                  : `${marca.nombre} se suma a Lugares Llenos`}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {esVermutZarro
                  ? "Vermut Zarro es una marca española nacida en Madrid y especializada en la elaboración de vermut. Su propuesta combina tradición, aperitivo y nuevos momentos de consumo, acercando el vermut a personas que buscan disfrutar de planes auténticos, encuentros con amigos y experiencias con sabor local."
                  : marca.descripcion ||
                    "Esta marca colabora con Lugares Llenos para impulsar experiencias reales, planes locales y nuevas formas de descubrir lugares."}
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {esVermutZarro
                  ? "En Lugares Llenos queremos conectar marcas con lugares, eventos y planes reales. Por eso esta colaboración busca asociar Vermut Zarro con experiencias cercanas, ocio cultural, salas colaboradoras y contenido que los usuarios puedan descubrir y compartir."
                  : "La colaboración permite dar visibilidad a marcas que comparten la filosofía de Lugares Llenos: descubrir sitios reales, apoyar experiencias locales y crear contenido útil para la comunidad."}
              </p>
            </div>

            <aside className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">
                Enlaces
              </p>

              <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                ✅ Colaboración activa
              </div>

              <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700">
                🤝 Marca colaboradora oficial
              </div>

              {marca.web_url && (
                <a
                  href={marca.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-100 transition hover:scale-[1.02]"
                >
                  Visitar web oficial →
                </a>
              )}
            </aside>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <p className="text-3xl">🍷</p>
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              Vermut y aperitivo
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Una marca vinculada al momento del aperitivo, los encuentros y los
              planes que empiezan con una buena conversación.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <p className="text-3xl">📍</p>
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              Lugares con ambiente
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              La colaboración busca conectar la marca con espacios, salas y
              planes locales donde pasan cosas de verdad.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <p className="text-3xl">📸</p>
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              Contenido real
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Contenido pensado para que la comunidad descubra, participe y
              comparta experiencias de forma natural.
            </p>
          </div>
        </div>

        {esVermutZarro && (
          <div className="mt-10 rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-lg shadow-orange-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍸</span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Lugares Llenos × Vermut Zarro
              </h2>
            </div>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Esta colaboración nace para acercar el vermut a nuevos públicos a
              través de planes reales, lugares con personalidad y experiencias
              compartidas por la comunidad.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                  Descubrir
                </p>
                <p className="mt-2 text-slate-700">
                  Dar visibilidad a lugares, planes y momentos donde disfrutar
                  del aperitivo de forma auténtica.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                  Compartir
                </p>
                <p className="mt-2 text-slate-700">
                  Crear contenido que los usuarios puedan compartir en redes y
                  que conecte la marca con experiencias reales.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                  Activar
                </p>
                <p className="mt-2 text-slate-700">
                  Preparar futuras acciones como sorteos, experiencias con salas
                  colaboradoras y contenidos destacados.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-8 shadow-lg shadow-orange-100">
          <h2 className="text-3xl font-bold text-slate-900">
            Próximamente en Lugares Llenos
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Muy pronto este espacio podrá recoger sorteos, contenidos destacados,
            experiencias patrocinadas y acciones conjuntas vinculadas a la marca.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎁 Sorteos
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              📣 Contenido destacado
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎵 Acciones con salas
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🍸 Experiencias patrocinadas
            </span>
          </div>

          <Link
            href="/eventos"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-md shadow-orange-100 transition hover:scale-105"
          >
            Descubrir experiencias →
          </Link>
        </div>
      </section>
    </main>
  );
}