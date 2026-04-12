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

      <header className="sticky top-0 z-50 border-b border-[#f3e8dd] bg-[#fffaf3]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              onClick={cerrarMenuMovil}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="Lugares Llenos"
                className="h-11 w-auto sm:h-12"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-orange-500">
                  Comunidad real
                </p>
                <p className="text-xl font-bold text-[#c2410c]">
                  Lugares Llenos
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-4 text-sm font-semibold text-[#475569] md:flex">
              <a href="/" className="transition hover:text-orange-600">
                Inicio
              </a>
              <a href="/#mapa" className="transition hover:text-orange-600">
                Mapa
              </a>
              <a href="/#lugares" className="transition hover:text-orange-600">
                Lugares
              </a>
              <a href="/eventos" className="text-orange-600">
                Eventos
              </a>
              <a href="/#buscador" className="transition hover:text-orange-600">
                Buscar
              </a>
              <a
                href="/#participa"
                className="rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
              >
                Participa
              </a>
            </nav>

            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#fed7aa] bg-white text-[#c2410c] shadow-sm transition hover:bg-[#fff7ed] md:hidden"
            >
              <span className="text-xl leading-none">
                {menuMovilAbierto ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {menuMovilAbierto && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/45"
                onClick={cerrarMenuMovil}
              />

              <div className="absolute left-4 right-4 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[28px] border border-[#f3e8dd] bg-white shadow-2xl md:hidden">
                <div className="border-b border-[#f3e8dd] bg-[#fff7ed] px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
                    Lugares Llenos
                  </p>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Descubre sitios, eventos y planes reales cerca de ti.
                  </p>
                </div>

                <nav className="flex flex-col p-3">
                  <a
                    href="/"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Inicio
                  </a>

                  <a
                    href="/#mapa"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Mapa
                  </a>

                  <a
                    href="/#lugares"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Lugares
                  </a>

                  <a
                    href="/eventos"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl bg-[#fff7ed] px-4 py-3 text-base font-bold text-orange-600"
                  >
                    Eventos
                  </a>

                  <a
                    href="/#buscador"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Buscar
                  </a>

                  <div className="mt-3 border-t border-[#f1f5f9] pt-3">
                    <a
                      href="/#participa"
                      onClick={cerrarMenuMovil}
                      className="block rounded-full bg-orange-500 px-4 py-3 text-center text-base font-bold text-white transition hover:bg-orange-600"
                    >
                      Participa
                    </a>
                  </div>
                </nav>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}