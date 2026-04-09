"use client";

import { useMemo, useState } from "react";

type Monumento = {
  nombre: string;
  ciudad: string;
  rating: number;
  precio: string;
  mascotas: string;
  aparcamiento: string;
};

const monumentosIniciales: Monumento[] = [
  {
    nombre: "Alhambra",
    ciudad: "Granada",
    rating: 4.8,
    precio: "Desde 19€",
    mascotas: "No mascotas",
    aparcamiento: "Sí aparcamiento cerca",
  },
  {
    nombre: "Sagrada Familia",
    ciudad: "Barcelona",
    rating: 4.9,
    precio: "Desde 26€",
    mascotas: "No mascotas",
    aparcamiento: "No aparcamiento cerca",
  },
  {
    nombre: "Acueducto de Segovia",
    ciudad: "Segovia",
    rating: 4.7,
    precio: "Gratis",
    mascotas: "Sí mascotas",
    aparcamiento: "Sí aparcamiento cerca",
  },
  {
    nombre: "Teatro Romano de Mérida",
    ciudad: "Mérida",
    rating: 4.6,
    precio: "Gratis o desde 12€",
    mascotas: "No mascotas",
    aparcamiento: "Sí aparcamiento cerca",
  },
];

export default function Home() {
  const [lista, setLista] = useState<Monumento[]>(monumentosIniciales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaCiudad, setBusquedaCiudad] = useState("");

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rating, setRating] = useState("");
  const [precio, setPrecio] = useState("");
  const [mascotas, setMascotas] = useState("Sí mascotas");
  const [aparcamiento, setAparcamiento] = useState("Sí aparcamiento cerca");

  const monumentosFiltrados = useMemo(() => {
    return lista.filter((m) => {
      const coincideNombre = m.nombre
        .toLowerCase()
        .includes(busquedaNombre.toLowerCase());

      const coincideCiudad = m.ciudad
        .toLowerCase()
        .includes(busquedaCiudad.toLowerCase());

      return coincideNombre && coincideCiudad;
    });
  }, [lista, busquedaNombre, busquedaCiudad]);

  const añadirMonumento = () => {
    if (!nombre.trim() || !ciudad.trim() || !rating.trim() || !precio.trim()) {
      alert("Por favor, completa nombre, ciudad, valoración y precio.");
      return;
    }

    const ratingNumero = Number(rating);

    if (Number.isNaN(ratingNumero) || ratingNumero < 0 || ratingNumero > 5) {
      alert("La valoración debe ser un número entre 0 y 5.");
      return;
    }

    const nuevo: Monumento = {
      nombre: nombre.trim(),
      ciudad: ciudad.trim(),
      rating: ratingNumero,
      precio: precio.trim(),
      mascotas,
      aparcamiento,
    };

    setLista([nuevo, ...lista]);

    setNombre("");
    setCiudad("");
    setRating("");
    setPrecio("");
    setMascotas("Sí mascotas");
    setAparcamiento("Sí aparcamiento cerca");
    setMostrarFormulario(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-500">
              Marca española de monumentos
            </p>
            <h1 className="mt-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              Monumentos Llenos
            </h1>
            <p className="text-sm text-slate-600">
              Descubre, valora y comparte monumentos de España
            </p>
          </div>

          <nav className="flex gap-4 text-sm font-medium text-slate-700">
            <a href="#" className="transition hover:text-orange-600">
              Inicio
            </a>
            <a href="#monumentos" className="transition hover:text-orange-600">
              Monumentos
            </a>
            <a href="#buscador" className="transition hover:text-orange-600">
              Buscar
            </a>
          </nav>

        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />

        <div className="max-w-4xl">

          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Descubre monumentos increíbles de forma fácil, clara y bonita
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Consulta precios, valoraciones, acceso con mascotas y aparcamiento
            cercano. Busca por ciudad o monumento y añade nuevos lugares para
            que la comunidad crezca.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#monumentos"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
            >
              Explorar monumentos
            </a>

            <button
              onClick={() => setMostrarFormulario((prev) => !prev)}
              className="rounded-full border border-orange-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
            >
              {mostrarFormulario ? "Cerrar formulario" : "Añadir monumento"}
            </button>
          </div>

        </div>
      </section>

      <section id="buscador" className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-lg shadow-orange-100">
          <h3 className="text-2xl font-bold text-slate-900">
            Buscar monumentos
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={busquedaNombre}
              onChange={(e) => setBusquedaNombre(e.target.value)}
              placeholder="Buscar monumento..."
              className="w-full rounded-2xl border border-orange-100 px-4 py-3"
            />

            <input
              type="text"
              value={busquedaCiudad}
              onChange={(e) => setBusquedaCiudad(e.target.value)}
              placeholder="Buscar ciudad..."
              className="w-full rounded-2xl border border-orange-100 px-4 py-3"
            />
          </div>
        </div>
      </section>

      <section id="monumentos" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex justify-between">
          <h3 className="text-3xl font-bold">Monumentos</h3>
          <p>{monumentosFiltrados.length} resultados</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {monumentosFiltrados.map((m, index) => (
            <div
              key={index}
              className="rounded-3xl border p-6 shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-bold">{m.nombre}</h4>
              <p className="text-sm text-gray-500">{m.ciudad}</p>
              <p className="mt-2">⭐ {m.rating}</p>
              <p>💶 {m.precio}</p>
              <p>🐶 {m.mascotas}</p>
              <p>🚗 {m.aparcamiento}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}