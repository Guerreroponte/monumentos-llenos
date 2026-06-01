import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Colaborador = {
  id: string;
  nombre: string;
  ciudad: string | null;
  tipo: string | null;
  estado: string | null;
  descripcion: string | null;
  icono: string | null;
  web: string | null;
  instagram: string | null;
  email: string | null;
  destacado: boolean | null;
  logo: string | null;
  imagen: string | null;
  sorteo_activo: boolean | null;
  titulo_sorteo: string | null;
  descripcion_sorteo: string | null;
  fecha_sorteo: string | null;
  programacion_texto: string | null;
  programacion_activa: boolean | null;
  programacion_enlace: string | null;
};

export const dynamic = "force-dynamic";

export default async function ColaboradoresPage() {
  const { data, error } = await supabase
    .from("colaboradores")
    .select(
      "id, nombre, ciudad, tipo, estado, descripcion, icono, web, instagram, email, destacado, logo, imagen, sorteo_activo, titulo_sorteo, descripcion_sorteo, fecha_sorteo, programacion_texto, programacion_activa, programacion_enlace"
    )
    .eq("destacado", true)
    .order("created_at", { ascending: true });

  const locales = ((data || []) as Colaborador[]).filter(Boolean);

  const sorteosActivos = locales.filter(
    (local) => local.sorteo_activo && local.titulo_sorteo
  );

  const programacionesActivas = locales.filter(
    (local) => local.programacion_activa && local.programacion_texto
  );

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

        {error && (
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700">
            No se han podido cargar los colaboradores ahora mismo.
          </div>
        )}

        {sorteosActivos.length > 0 && (
          <div className="mt-10 rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-lg shadow-orange-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎟️</span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Sorteos e invitaciones activas
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {sorteosActivos.map((sorteo) => (
                <div
                  key={sorteo.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                    {sorteo.nombre}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {sorteo.titulo_sorteo}
                  </h3>

                  {sorteo.descripcion_sorteo && (
                    <p className="mt-2 text-slate-600">
                      {sorteo.descripcion_sorteo}
                    </p>
                  )}

                  {sorteo.fecha_sorteo && (
                    <p className="mt-3 font-semibold text-orange-700">
                      📅 {sorteo.fecha_sorteo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {programacionesActivas.length > 0 && (
          <div className="mt-10 rounded-3xl border border-orange-200 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎵</span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Programación destacada de colaboradores
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {programacionesActivas.map((programacion) => (
                <div
                  key={programacion.id}
                  className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                    {programacion.nombre}
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {programacion.programacion_texto}
                  </p>

                  {programacion.programacion_enlace && (
                    <Link
                      href={programacion.programacion_enlace}
                      className="mt-4 inline-flex font-bold text-orange-600 hover:text-orange-700"
                    >
                      Ver evento →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {locales.map((local) => (
            <div
              key={local.id}
              className="overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-lg shadow-orange-100"
            >
              {local.imagen && (
                <img
                  src={local.imagen}
                  alt={local.nombre}
                  className="h-44 w-full object-cover"
                />
              )}

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                    📍 {local.ciudad || "Ciudad"}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    {local.estado || "Colaborador"}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-orange-50 text-3xl shadow-sm">
                    {local.logo ? (
                      <img
                        src={local.logo}
                        alt={local.nombre}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      local.icono || "📍"
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      {local.nombre}
                    </h2>
                    <p className="mt-1 font-semibold text-orange-700">
                      {local.tipo || "Espacio colaborador"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600">
                  {local.descripcion ||
                    "Espacio colaborador de la comunidad Lugares Llenos."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/eventos"
                    className="inline-flex font-bold text-orange-600 hover:text-orange-700"
                  >
                    Ver eventos →
                  </Link>

                  {local.web && (
                    <a
                      href={local.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex font-bold text-slate-600 hover:text-orange-700"
                    >
                      Web oficial →
                    </a>
                  )}

                  {local.instagram && (
                    <a
                      href={local.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex font-bold text-slate-600 hover:text-orange-700"
                    >
                      Instagram →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {locales.length === 0 && !error && (
          <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-6 text-slate-600 shadow-lg shadow-orange-100">
            Todavía no hay colaboradores destacados visibles.
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-orange-100 bg-white/95 p-8 shadow-lg shadow-orange-100">
          <h2 className="text-3xl font-bold text-slate-900">
            ¿Tienes una sala, bar, club o espacio cultural?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            En Lugares Llenos ayudamos a dar visibilidad a espacios con ambiente
            real. Si organizas conciertos, monólogos, directos, tardeos,
            sesiones culturales o cualquier plan interesante, podemos colaborar
            para que más personas los descubran.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            También estamos abiertos a compartir programación, sorteos,
            invitaciones, promociones especiales o eventos destacados para la
            comunidad.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎟️ Sorteos
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎵 Programación
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              🎫 Invitaciones
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