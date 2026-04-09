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
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Monumentos Llenos</h1>
            <p className="text-sm text-slate-600">
              Descubre, valora y comparte monumentos de España
            </p>
          </div>

          <nav className="flex gap-4 text-sm">
            <a href="#">Inicio</a>
            <a href="#monumentos">Monumentos</a>
            <a href="#buscador">Buscar</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-bold md:text-5xl">
          El sitio para descubrir monumentos en España
        </h2>

        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Consulta opiniones, precios, mascotas y aparcamiento cercano. Busca
          por monumento o ciudad y añade nuevos lugares a la comunidad.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#monumentos"
            className="rounded bg-black px-5 py-3 text-white"
          >
            Explorar monumentos
          </a>

          <button
            onClick={() => setMostrarFormulario((prev) => !prev)}
            className="rounded border px-5 py-3"
          >
            {mostrarFormulario ? "Cerrar formulario" : "Añadir monumento"}
          </button>
        </div>
      </section>

      <section
        id="buscador"
        className="mx-auto max-w-6xl px-6 pb-12"
      >
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold">Buscar monumentos</h3>
          <p className="mt-2 text-sm text-slate-600">
            Filtra por nombre del monumento o por ciudad.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Buscar por monumento
              </label>
              <input
                type="text"
                value={busquedaNombre}
                onChange={(e) => setBusquedaNombre(e.target.value)}
                placeholder="Ej. Alhambra"
                className="w-full rounded-lg border px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Buscar por ciudad
              </label>
              <input
                type="text"
                value={busquedaCiudad}
                onChange={(e) => setBusquedaCiudad(e.target.value)}
                placeholder="Ej. Granada"
                className="w-full rounded-lg border px-4 py-3 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {mostrarFormulario && (
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold">Añadir nuevo monumento</h3>
            <p className="mt-2 text-sm text-slate-600">
              Rellena los datos del monumento y guárdalo en la lista.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nombre del monumento
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Catedral de Burgos"
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Ciudad</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ej. Burgos"
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Valoración (0 a 5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Ej. 4.6"
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Precio</label>
                <input
                  type="text"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej. Gratis o Desde 12€"
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  ¿Admite mascotas?
                </label>
                <select
                  value={mascotas}
                  onChange={(e) => setMascotas(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                >
                  <option value="Sí mascotas">Sí mascotas</option>
                  <option value="No mascotas">No mascotas</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  ¿Hay sitio cerca para aparcar?
                </label>
                <select
                  value={aparcamiento}
                  onChange={(e) => setAparcamiento(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none"
                >
                  <option value="Sí aparcamiento cerca">
                    Sí aparcamiento cerca
                  </option>
                  <option value="No aparcamiento cerca">
                    No aparcamiento cerca
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={añadirMonumento}
                className="rounded bg-black px-5 py-3 text-white"
              >
                Guardar monumento
              </button>

              <button
                onClick={() => setMostrarFormulario(false)}
                className="rounded border px-5 py-3"
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}

      <section
        id="monumentos"
        className="mx-auto max-w-6xl px-6 pb-20"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold">Monumentos destacados</h3>
          <p className="text-sm text-slate-500">
            {monumentosFiltrados.length} resultado(s)
          </p>
        </div>

        {monumentosFiltrados.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-slate-600">
            No se han encontrado monumentos con esa búsqueda.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {monumentosFiltrados.map((m, index) => (
              <div
                key={`${m.nombre}-${index}`}
                className="rounded-xl border bg-white p-4"
              >
                <h4 className="font-bold">{m.nombre}</h4>
                <p className="text-sm text-gray-600">{m.ciudad}</p>
                <p className="mt-2">⭐ {m.rating}</p>
                <p>💶 {m.precio}</p>
                <p>🐶 {m.mascotas}</p>
                <p>🚗 {m.aparcamiento}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}