import type { SupabaseClient } from "@supabase/supabase-js";

// Match exactly the image formats supported by the existing public image route.
const INLINE_PREFIXES = ["png", "jpeg", "jpg", "webp", "gif"].map(
  (format) => `data:image/${format};base64,%`
);

export async function cargarResenasPublicas(client: SupabaseClient, lugares: string[]) {
  const base = await client.from("resenas")
    .select("id, monumento_id, usuario, comentario, created_at, likes, reportado")
    .in("monumento_id", lugares).order("created_at", { ascending: false });
  if (base.error || !base.data?.length) return base;

  const ids = base.data.map((row) => row.id);
  let urls = client.from("resenas").select("id, foto").in("id", ids);
  for (const prefix of INLINE_PREFIXES) urls = urls.not("foto", "ilike", prefix);
  const [external, inline] = await Promise.all([
    urls,
    client.from("resenas").select("id").in("id", ids)
      .or(INLINE_PREFIXES.map((prefix) => `foto.ilike."${prefix}"`).join(",")),
  ]);
  if (external.error || inline.error) {
    return { ...base, data: null, error: external.error || inline.error };
  }
  const photos = new Map<string, string | null>();
  for (const row of external.data || []) photos.set(row.id, row.foto);
  for (const row of inline.data || []) {
    photos.set(row.id, `/api/imagenes-publicas/resenas/${encodeURIComponent(row.id)}`);
  }
  return { ...base, data: base.data.map((row) => ({ ...row, foto: photos.get(row.id) || null })) };
}
