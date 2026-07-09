"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ciudadesPopulares = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Málaga",
  "Zaragoza",
  "A Coruña",
  "Vigo",
  "Murcia",
  "Granada",
  "Santander",
];

function slugCiudad(ciudad: string) {
  return ciudad
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function QueHacerPage() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  function buscarCiudad(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ciudad = busqueda.trim();
    if (!ciudad) return;

    router.push(`/que-hacer/${slugCiudad(ciudad)}`);
  }

  return (
    <main className="bg-[#fff7ed] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-orange-600 font-bold uppercase tracking-[0.25em] text-sm">
            Guía por ciudades
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-extrabold text-slate-900">
            ¿Qué hacer?
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600">
            Descubre eventos, lugares especiales y salas colaboradoras en
            cualquier ciudad de España.
          </p>

          <form
            onSubmit={buscarCiudad}
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-orange-200 bg-white p-3 shadow-sm sm:flex-row"
          >
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Escribe una ciudad: Madrid, Barcelona..."
              className="min-w-0 flex-1 rounded-full bg-white px-5 py-4 text-lg font-semibold text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
            />

            <button
              type="submit"
              className="rounded-full bg-orange-600 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-orange-700"
            >
              Buscar →
            </button>
          </form>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900">
            Ciudades populares
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ciudadesPopulares.map((ciudad) => (
              <Link
                key={ciudad}
                href={`/que-hacer/${slugCiudad(ciudad)}`}
                className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  📍 {ciudad}
                </h3>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>🎵 Eventos</p>
                  <p>🏛️ Lugares</p>
                  <p>🤝 Salas colaboradoras</p>
                </div>

                <div className="mt-6 text-orange-600 font-semibold">
                  Descubrir {ciudad} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}