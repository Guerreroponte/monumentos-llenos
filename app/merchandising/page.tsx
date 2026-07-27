import Link from "next/link";

export default function MerchandisingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href="/colaboradores"
          className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:text-orange-600"
        >
          ← Volver a colaboradores
        </Link>

        <div className="mt-8 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Merchandising oficial
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            La primera colección de Lugares Llenos
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Camisetas y gorras inspiradas en la música en directo, los viajes
            y los lugares que merece la pena descubrir.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-orange-200 bg-white p-8 shadow-lg shadow-orange-100">
          <p className="text-lg font-bold text-slate-900">
            Próximamente
          </p>

          <p className="mt-3 text-slate-600">
            Estamos preparando la primera colección oficial de Lugares Llenos.
          </p>
        </div>
      </section>
    </main>
  );
}