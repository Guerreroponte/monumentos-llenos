export default function FuenteLugar({ fuente }: { fuente: string }) {
  let enlaces = 0;
  return <>{fuente.split(/(https?:\/\/[^\s]+)/g).map((parte, index) => {
    if (!/^https?:\/\//.test(parte)) return <span key={index}>{parte}</span>;
    const etiqueta = enlaces++ === 0 ? "Consultar fuente" : "Ver imagen original";
    return <a key={index} href={parte} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">{etiqueta}</a>;
  })}</>;
}
