"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentimiento = localStorage.getItem("cookie-consent");

    if (!consentimiento) {
      setVisible(true);
    }
  }, []);

  const aceptar = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setVisible(false);
  };

  const rechazar = () => {
    localStorage.setItem("cookie-consent", "rejected");
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999]">
      <div className="mx-auto max-w-5xl rounded-2xl border border-orange-200 bg-[#fffaf3] p-6 shadow-2xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              🍪 Utilizamos cookies
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Utilizamos cookies para mejorar tu experiencia, analizar el uso de
              la web y ofrecer contenido relevante. Puedes aceptar o rechazar
              las cookies en cualquier momento.
            </p>

            <Link
              href="/politica-cookies"
              className="mt-3 inline-block text-sm font-semibold text-orange-600 hover:underline"
            >
              Leer Política de Cookies
            </Link>
          </div>

          <div className="flex gap-3">
            <button
              onClick={rechazar}
              className="rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Rechazar
            </button>

            <button
              onClick={aceptar}
              className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}