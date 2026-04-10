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