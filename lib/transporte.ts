// Formato documentado por Uber para su experiencia web/universal.
export function enlaceUber(destino: string, nombre: string): string {
  const url = new URL("https://m.uber.com/looking");
  const match = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/.exec(destino);
  if (match) {
    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    if (Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180) {
      url.searchParams.set("drop[0]", JSON.stringify({ latitude, longitude, addressLine1: nombre }));
    }
  }
  return url.toString();
}

export function destinoDesdeMaps(enlace: string | null): string | null {
  if (!enlace) return null;
  try {
    const url = new URL(enlace);
    if (url.origin !== "https://www.google.com" || url.pathname !== "/maps/dir/") return null;
    return url.searchParams.get("destination")?.trim() || null;
  } catch { return null; }
}
