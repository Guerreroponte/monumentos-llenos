import "server-only";
import { createClient } from "@supabase/supabase-js";

// Public reads use the same anonymous permissions as the browser, never a service key.
export const publicServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
);
