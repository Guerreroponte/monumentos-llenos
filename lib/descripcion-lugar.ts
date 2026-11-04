export function separarDescripcionLugar(descripcion?: string | null) {
  const texto = descripcion?.trim() ?? "";
  // Las fichas antiguas guardan los créditos y las fuentes al final de la descripción.
  const inicio = texto.search(/(?:^|[.!?]\s+|\n+)(?=(?:Fotografía(?:\s+(?:de|del)\b|:)|Valoración de Google(?: Maps)? consultada a través de\s))/iu);
  if (inicio < 0) return { resumen: texto, creditos: [] };

  const prefijo = texto.slice(inicio).match(/^(?:[.!?]\s+|\n+)/u)?.[0] ?? "";
  const corte = inicio + prefijo.length;
  const creditos = texto.slice(corte).split(/\s+(?=Valoración de Google(?: Maps)? consultada a través de\s)/iu);
  return { resumen: texto.slice(0, corte).trim(), creditos };
}

export function resumenLugar(descripcion?: string | null) {
  return separarDescripcionLugar(descripcion).resumen;
}
