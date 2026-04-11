import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

import HeaderGlobal from "@/components/HeaderGlobal"; // 👈 IMPORTANTE

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {/* ✅ HEADER GLOBAL (CLIENT COMPONENT) */}
        <HeaderGlobal />

        {/* CONTENIDO */}
        {children}

        {/* ANALYTICS */}
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