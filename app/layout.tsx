"use client";

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lugares Llenos | Descubre sitios con ambiente en España",
    template: "%s | Lugares Llenos",
  },
  description:
    "Descubre lugares con ambiente en España. Opiniones reales, fotos de visitantes y sitios recomendados por la comunidad.",
  metadataBase: new URL("https://www.monumentosllenos.com"),
  applicationName: "Lugares Llenos",
  keywords: [
    "lugares llenos",
    "lugares con ambiente",
    "sitios recomendados España",
    "opiniones de lugares",
    "fotos de visitantes",
    "playas",
    "pueblos",
    "rutas",
    "miradores",
    "lugares en España",
  ],
  openGraph: {
    title: "Lugares Llenos | Descubre sitios con ambiente en España",
    description:
      "Opiniones reales, fotos de visitantes y sitios recomendados por la comunidad en España.",
    url: "https://www.monumentosllenos.com",
    siteName: "Lugares Llenos",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugares Llenos | Descubre sitios con ambiente en España",
    description:
      "Opiniones reales, fotos de visitantes y sitios recomendados por la comunidad en España.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

function HeaderGlobal() {
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
            <span aria-hidden="true">✉️</span>
            <span>Contacto</span>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <a href="/" onClick={cerrarMenuMovil} className="flex min-w-0 items-center gap-3">
              <img
                src="/logo.png"
                alt="Lugares Llenos"
                className="h-11 w-auto shrink-0 object-contain sm:h-12"
              />

              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-500 sm:text-[11px] sm:tracking-[0.35em]">
                  Comunidad de lugares reales en España
                </p>
                <p className="mt-1 truncate text-xl font-extrabold tracking-tight text-orange-500 sm:text-2xl">
                  Lugares Llenos
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-2 md:flex">
              <nav className="flex flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-700 lg:gap-2">
                <a
                  href="/"
                  className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Inicio
                </a>

                <a
                  href="/#mapa"
                  className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Mapa
                </a>

                <a
                  href="/#lugares"
                  className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Lugares
                </a>

                <a
                  href="/eventos"
                  className="rounded-full bg-orange-50 px-3 py-2 text-orange-600 transition hover:bg-orange-100"
                >
                  Eventos
                </a>

                <a
                  href="/#buscador"
                  className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Buscar
                </a>

                <a
                  href="/#participa"
                  className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:opacity-90"
                >
                  Participa
                </a>
              </nav>
            </div>

            <button
              type="button"
              aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuMovilAbierto}
              onClick={() => setMenuMovilAbierto((prev) => !prev)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-100 bg-white text-slate-900 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 md:hidden"
            >
              <span className="text-2xl leading-none">
                {menuMovilAbierto ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {menuMovilAbierto && (
            <div className="md:hidden">
              <div
                className="fixed inset-0 top-[118px] z-40 bg-black/40"
                onClick={cerrarMenuMovil}
              />

              <div className="relative z-50 mt-4 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl shadow-orange-100">
                <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
                  <p className="text-sm font-semibold text-orange-600">Menú</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Muévete rápido por la web desde el móvil.
                  </p>
                </div>

                <nav className="flex flex-col p-3">
                  <a
                    href="/"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-orange-50"
                  >
                    Inicio
                  </a>

                  <a
                    href="/#mapa"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-orange-50"
                  >
                    Mapa
                  </a>

                  <a
                    href="/#lugares"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-orange-50"
                  >
                    Lugares
                  </a>

                  <a
                    href="/eventos"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-orange-600 transition hover:bg-orange-50"
                  >
                    Eventos
                    <span className="ml-2 rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                      grandes + locales
                    </span>
                  </a>

                  <a
                    href="/#buscador"
                    onClick={cerrarMenuMovil}
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-orange-50"
                  >
                    Buscar
                  </a>

                  <a
                    href="/#participa"
                    onClick={cerrarMenuMovil}
                    className="mt-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-orange-100"
                  >
                    Participa
                  </a>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HeaderGlobal />

        {children}

        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Lugares Llenos",
            alternateName: "monumentosllenos.com",
            url: "https://www.monumentosllenos.com",
            description:
              "Descubre lugares con ambiente en España. Opiniones reales, fotos de visitantes y sitios recomendados por la comunidad.",
            inLanguage: "es",
          })}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K56T07CRK5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K56T07CRK5');
          `}
        </Script>
      </body>
    </html>
  );
}