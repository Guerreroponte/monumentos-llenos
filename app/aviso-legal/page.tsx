export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Información legal
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
          Aviso Legal
        </h1>

        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">
          <p>
            Este Aviso Legal regula el uso del sitio web Lugares Llenos,
            accesible a través de www.monumentosllenos.com.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. Identificación
            </h2>
            <p className="mt-2">
              El responsable de este sitio web es el equipo de Lugares Llenos.
              Para cualquier consulta, puedes escribirnos a:
              contacto@monumentosllenos.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. Objeto de la web
            </h2>
            <p className="mt-2">
              Lugares Llenos es una plataforma colaborativa donde los usuarios
              pueden descubrir lugares, eventos, salas, conciertos y planes
              reales en España, así como compartir comentarios, experiencias e
              información útil para la comunidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. Uso del sitio web
            </h2>
            <p className="mt-2">
              Las personas usuarias se comprometen a utilizar la web de forma
              responsable, respetuosa y conforme a la ley. No está permitido
              publicar contenido ofensivo, falso, ilícito, discriminatorio o que
              vulnere derechos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. Contenidos aportados por usuarios
            </h2>
            <p className="mt-2">
              Lugares Llenos permite que los usuarios compartan información,
              comentarios, fotografías y experiencias. El equipo podrá revisar,
              moderar, ocultar o eliminar contenidos que considere inadecuados,
              incorrectos o contrarios al funcionamiento de la comunidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              5. Enlaces externos
            </h2>
            <p className="mt-2">
              La web puede incluir enlaces a páginas externas, como webs
              oficiales de salas, eventos, plataformas de entradas o servicios de
              terceros. Lugares Llenos no se responsabiliza del contenido,
              disponibilidad o funcionamiento de dichas páginas externas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. Propiedad intelectual
            </h2>
            <p className="mt-2">
              El diseño, textos, estructura y elementos propios de Lugares Llenos
              pertenecen al proyecto, salvo aquellos contenidos, marcas,
              imágenes o logotipos pertenecientes a terceros, que seguirán siendo
              propiedad de sus respectivos titulares.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. Contacto
            </h2>
            <p className="mt-2">
              Para cualquier cuestión relacionada con este Aviso Legal, puedes
              escribirnos a contacto@monumentosllenos.com.
            </p>
          </section>

          <p className="pt-4 text-sm text-slate-500">
            Última actualización: junio de 2026.
          </p>
        </div>
      </section>
    </main>
  );
}