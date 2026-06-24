import Link from "next/link";

export default function FooterGlobal() {
  return (
    <footer className="border-t border-orange-200 bg-[#fff7ed]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Lugares Llenos"
                className="h-14 w-14 rounded-xl bg-white object-contain p-2 shadow-sm"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Comunidad real
                </p>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Lugares Llenos
                </h3>
              </div>
            </div>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Comunidad colaborativa donde descubrir lugares, monumentos,
              conciertos, salas y planes reales por toda España.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-orange-600">
              Información
            </h4>

            <ul className="mt-4 space-y-3 text-base font-semibold text-slate-600">
              <li>
                <Link href="/aviso-legal" className="transition hover:text-orange-600">
                  Aviso Legal
                </Link>
              </li>

              <li>
                <Link href="/politica-privacidad" className="transition hover:text-orange-600">
                  Política de Privacidad
                </Link>
              </li>

              <li>
                <Link href="/politica-cookies" className="transition hover:text-orange-600">
                  Política de Cookies
                </Link>
              </li>

              <li>
                <a
                  href="mailto:contacto@monumentosllenos.com"
                  className="transition hover:text-orange-600"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-orange-200 pt-6 text-center text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} Lugares Llenos · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}