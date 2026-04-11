import Link from "next/link";

export default function ParticipaPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <header className="sticky top-0 z-50 border-b border-[#f3e8dd] bg-[#fffaf3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#f97316]">
              Lugares Llenos
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Inicio
            </Link>
            <Link
              href="/lugares"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Lugares
            </Link>
            <Link
              href="/mapa"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Mapa
            </Link>
            <Link
              href="/eventos"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Eventos
            </Link>
            <Link
              href="/participa"
              className="rounded-full bg-[#f97316] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ea580c]"
            >
              Participa
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Comunidad de lugares reales en España
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Participa
          </span>
        </div>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
          Participa en la comunidad
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
          Ayuda a que la web crezca añadiendo lugares, eventos y experiencias
          reales. Entre todos podemos hacer una guía mucho más útil y auténtica.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97316]">
              Lugares
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#334155]">
              Añadir un lugar
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#64748b]">
              Comparte un sitio interesante para visitar y ayuda a otros usuarios
              a descubrir rincones con ambiente, encanto o utilidad real.
            </p>

            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex rounded-full bg-[#f97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
              >
                Ir al inicio
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97316]">
              Eventos
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#334155]">
              Añadir un evento
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#64748b]">
              Comparte fiestas, ferias, festivales o eventos que merezca la pena
              conocer para que más gente descubra cuándo hay más ambiente en cada
              ciudad.
            </p>

            <div className="mt-6">
              <Link
                href="/eventos"
                className="inline-flex rounded-full border border-[#fed7aa] px-5 py-3 text-sm font-bold text-[#ea580c] transition hover:bg-[#fff7ed]"
              >
                Ver eventos
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-8">
          <h3 className="text-2xl font-bold text-[#9a3412]">
            Muy pronto podrás añadir contenido directamente
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7c2d12]">
            Estamos preparando esta sección para que puedas subir lugares y
            eventos desde la web de forma rápida y sencilla.
          </p>
        </div>
      </section>
    </main>
  );
}