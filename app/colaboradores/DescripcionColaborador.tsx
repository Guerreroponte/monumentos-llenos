export default function DescripcionColaborador({ texto, nombre }: { texto: string; nombre: string }) {
  const estilo = "text-sm leading-6 text-slate-600";

  if (texto.length <= 200) {
    return <p className={`mt-5 ${estilo}`}>{texto}</p>;
  }

  return (
    <div className="mt-5">
      <details className="group">
        <summary
          aria-label={`Descripción de ${nombre}`}
          className="list-none cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700 [&::-webkit-details-marker]:hidden"
        >
          <span className={`line-clamp-3 group-open:hidden ${estilo}`}>{texto}</span>
          <span className="inline-flex min-h-11 items-center py-2 text-sm font-bold text-orange-700">
            <span className="group-open:hidden">Leer más ↓</span>
            <span className="hidden group-open:inline">Leer menos ↑</span>
          </span>
        </summary>
        <p className={estilo}>{texto}</p>
      </details>
    </div>
  );
}
