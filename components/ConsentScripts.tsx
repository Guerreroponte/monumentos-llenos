"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ConsentScripts() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const comprobarConsentimiento = () => {
      setAccepted(
        localStorage.getItem("cookie-consent") === "accepted"
      );
    };

    comprobarConsentimiento();

    window.addEventListener(
      "cookie-consent-updated",
      comprobarConsentimiento
    );

    return () => {
      window.removeEventListener(
        "cookie-consent-updated",
        comprobarConsentimiento
      );
    };
  }, []);

  if (!accepted) return null;

  return (
    <>
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

      <Script
        id="getyourguide-analytics"
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        strategy="afterInteractive"
        data-gyg-partner-id="3B0Y74E"
      />
    </>
  );
}