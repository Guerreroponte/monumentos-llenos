"use client";

import { useEffect, useState } from "react";

export default function HeaderGlobal() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuMovilAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMovilAbierto]);

  const cerrarMenuMovil = () => {
    setMenuMovilAbierto(false);
  };

  return (
    <>
      {/* Barra superior */}
      <div className="border-b border-orange-100 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-2 sm:px-6">
          <a
            href="mailto:contacto@monumentosllenos.com?subject=Contacto%20desde%20la%20web"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold transition hover:bg-white/25"
          >
            ✉️ Contacto
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              onClick={cerrarMenuMovil}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="Lugares Llenos"
                className="h-11 sm:h-12"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-orange-500">
                  Comunidad real
                </p>
                <p className="text-xl font-bold text-orange-500">
                  Lugares Llenos
                </p>
              </div>
            </a>

            {/* Desktop */}
            <nav className="hidden md:flex gap-4 text-sm font-semibold">
              <a href="/" className="hover:text-orange-600">Inicio</a>
              <a href="/#mapa" className="hover:text-orange-600">Mapa</a>
              <a href="/#lugares" className="hover:text-orange-600">Lugares</a>
              <a href="/eventos" className="text-orange-600">Eventos</a>
              <a href="/#buscador" className="hover:text-orange-600">Buscar</a>
              <a
                href="/#participa"
                className="bg-black text-white px-3 py-1 rounded-full"
              >
                Participa
              </a>
            </nav>

            {/* Botón móvil */}
            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              className="md:hidden text-2xl"
            >
              {menuMovilAbierto ? "✕" : "☰"}
            </button>
          </div>

          {/* Menú móvil */}
          {menuMovilAbierto && (
            <>
              {/* Fondo oscuro */}
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={cerrarMenuMovil}
              />

              {/* Caja menú */}
              <div className="absolute left-0 right-0 mt-4 z-50 bg-white rounded-3xl shadow-xl p-4">
                <nav className="flex flex-col gap-2">
                  <a href="/" onClick={cerrarMenuMovil} className="p-3 font-semibold">Inicio</a>
                  <a href="/#mapa" onClick={cerrarMenuMovil} className="p-3 font-semibold">Mapa</a>
                  <a href="/#lugares" onClick={cerrarMenuMovil} className="p-3 font-semibold">Lugares</a>

                  <a
                    href="/eventos"
                    onClick={cerrarMenuMovil}
                    className="p-3 font-semibold text-orange-600"
                  >
                    Eventos
                  </a>

                  <a href="/#buscador" onClick={cerrarMenuMovil} className="p-3 font-semibold">Buscar</a>

                  <a
                    href="/#participa"
                    onClick={cerrarMenuMovil}
                    className="mt-2 bg-orange-500 text-white text-center p-3 rounded-full"
                  >
                    Participa
                  </a>
                </nav>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}