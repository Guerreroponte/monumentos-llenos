"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { usePathname } from "next/navigation";

function suscribirHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}
const leerHash = () => window.location.hash;
const hashServidor = () => "";

export default function HeaderGlobal() {
  const pathname = usePathname();
  const hash = useSyncExternalStore(suscribirHash, leerHash, hashServidor);
  const seccion = pathname === "/"
    ? (["#mapa", "#lugares", "#buscador"].includes(hash) ? `/${hash}` : hash === "#participa" ? "/participa" : "/")
    : pathname.startsWith("/lugar/") ? "/#lugares"
    : ["/eventos", "/que-hacer", "/colaboradores", "/participa", "/buscar"].find(
      (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
    );
  const actual = (ruta: string) => seccion === ruta ? (ruta.includes("#") ? "location" as const : "page" as const) : undefined;
  const estilo = (ruta: string, movil = false) => movil
    ? `rounded-2xl px-4 py-3 text-base transition ${seccion === ruta ? "bg-[#fff7ed] font-bold text-orange-600" : "font-semibold text-[#334155] hover:bg-[#f8fafc]"}`
    : `transition hover:text-orange-600${seccion === ruta ? " text-orange-600" : ""}`;
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
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-2 sm:px-6">
          <a
            href="mailto:contacto@monumentosllenos.com?subject=Contacto%20desde%20la%20web"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold transition hover:bg-white/25"
          >
            ✉️ Contacto
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61572066181086"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Lugares Llenos"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all hover:scale-110 hover:bg-white/25"
          >
            <span className="text-base font-black leading-none">f</span>
          </a>

          <a
            href="https://www.instagram.com/lugaresllenos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Lugares Llenos"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-all hover:scale-110 hover:bg-white/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
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
                src="/icon.png"
                alt="Logo LLL de Lugares Llenos"
                className="h-11 w-11 object-contain sm:h-12 sm:w-12"
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
              <a href="/" className={estilo("/")} aria-current={actual("/")}>
                Inicio
              </a>

              <a href="/#mapa" className={estilo("/#mapa")} aria-current={actual("/#mapa")}>
                Mapa
              </a>

              <a href="/#lugares" className={estilo("/#lugares")} aria-current={actual("/#lugares")}>
                Lugares
              </a>

              <a
                href="/que-hacer"
                className={estilo("/que-hacer")}
               aria-current={actual("/que-hacer")}>
                Qué hacer
              </a>

              <a href="/eventos" className={estilo("/eventos")} aria-current={actual("/eventos")}>
                Eventos
              </a>

              <a
                href="/colaboradores"
                className={estilo("/colaboradores")}
               aria-current={actual("/colaboradores")}>
                Colaboradores
              </a>

              <a href="/buscar" className={estilo("/buscar")} aria-current={actual("/buscar")}>
                Buscar
              </a>

              <a
                href="/participa"
                className={`rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600${seccion === "/participa" ? " ring-2 ring-orange-800 ring-offset-2" : ""}`}
               aria-current={actual("/participa")}>
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
                    className={estilo("/", true)}
                   aria-current={actual("/")}>
                    Inicio
                  </a>

                  <a
                    href="/#mapa"
                    onClick={cerrarMenuMovil}
                    className={estilo("/#mapa", true)}
                   aria-current={actual("/#mapa")}>
                    Mapa
                  </a>

                  <a
                    href="/#lugares"
                    onClick={cerrarMenuMovil}
                    className={estilo("/#lugares", true)}
                   aria-current={actual("/#lugares")}>
                    Lugares
                  </a>

                  <a
                    href="/que-hacer"
                    onClick={cerrarMenuMovil}
                    className={estilo("/que-hacer", true)}
                   aria-current={actual("/que-hacer")}>
                    Qué hacer
                  </a>

                  <a
                    href="/eventos"
                    onClick={cerrarMenuMovil}
                    className={estilo("/eventos", true)}
                   aria-current={actual("/eventos")}>
                    Eventos
                  </a>

                  <a
                    href="/colaboradores"
                    onClick={cerrarMenuMovil}
                    className={estilo("/colaboradores", true)}
                   aria-current={actual("/colaboradores")}>
                    Colaboradores
                  </a>

                  <a
                    href="/buscar"
                    onClick={cerrarMenuMovil}
                    className={estilo("/buscar", true)}
                   aria-current={actual("/buscar")}>
                    Buscar
                  </a>

                  <div className="mt-3 border-t border-[#f1f5f9] pt-3">
                    <a
                      href="/participa"
                      onClick={cerrarMenuMovil}
                      className={`block rounded-full bg-orange-500 px-4 py-3 text-center text-base font-bold text-white transition hover:bg-orange-600${seccion === "/participa" ? " ring-2 ring-orange-800 ring-offset-2" : ""}`}
                     aria-current={actual("/participa")}>
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