import type { SupabaseClient } from "@supabase/supabase-js";

export async function cargarResenasPublicas(client: SupabaseClient, lugares: string[]) {
  // The security-invoker view examines only the image header, not its payload.
  // It returns the same existing image URLs and honors the table's RLS policies.
  return client.from("resenas_publicas_ligeras")
    .select("id, monumento_id, usuario, comentario, foto, created_at, likes, reportado")
    .in("monumento_id", lugares).order("created_at", { ascending: false });
}
