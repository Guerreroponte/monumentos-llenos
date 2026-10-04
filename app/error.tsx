"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-[50vh] bg-[#fffaf3] px-4 py-16 text-center text-slate-900">
      <h1 className="text-2xl font-bold">No se ha podido mostrar esta página</h1>
      <p className="mt-3">Ha fallado la conexión con los datos. Vuelve a intentarlo.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white">
        Volver a intentar
      </button>
    </main>
  );
}
