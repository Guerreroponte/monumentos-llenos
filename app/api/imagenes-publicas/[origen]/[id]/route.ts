import { publicServer } from "@/lib/supabase-public-server";
import { decodePublicImage } from "@/lib/public-images";

export async function GET(_request: Request, { params }: {
  params: Promise<{ origen: string; id: string }>;
}) {
  const { origen, id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id) || (origen !== "lugares" && origen !== "resenas")) {
    return new Response(null, { status: 404 });
  }
  const tabla = origen === "lugares" ? "Monumentos" : "resenas";
  const columna = origen === "lugares" ? "imagen" : "foto";
  const { data, error } = await publicServer.from(tabla).select(`${columna}, reportado`)
    .eq("id", id).or("reportado.is.null,reportado.eq.false").maybeSingle();
  if (error) return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  const value = (data as Record<string, unknown> | null)?.[columna];
  const image = typeof value === "string" ? decodePublicImage(value) : null;
  if (!image) return new Response(null, { status: 404 });
  return new Response(Buffer.from(image.base64, "base64"), {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=60, s-maxage=60",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
