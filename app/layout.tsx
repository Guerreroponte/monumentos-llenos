import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <a href="/" className="flex min-w-0 items-center gap-3">
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

            <nav className="hidden flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-700 md:flex lg:gap-2">
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
        </header>

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