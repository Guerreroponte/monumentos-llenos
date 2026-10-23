-- Applied to Supabase on 2026-10-23 after explicit approval.
-- Migration: add_lightweight_public_reviews.
-- Deploy this additive view before deploying the application change.
-- Existing rows, photos, table permissions and RLS policies are unchanged.
create view public.resenas_publicas_ligeras
with (security_invoker = true)
as select id, monumento_id, usuario, comentario,
  case when left(foto, 32) ~* '^data:image/(png|jpeg|jpg|webp|gif);base64,'
    then '/api/imagenes-publicas/resenas/' || id::text
    else foto end as foto,
  created_at, likes, reportado
from public.resenas;
revoke all on public.resenas_publicas_ligeras from public, anon, authenticated;
grant select on public.resenas_publicas_ligeras to anon, authenticated;
comment on view public.resenas_publicas_ligeras is
  'Read-only review projection; honors underlying RLS and uses existing image endpoints. Original photos remain in resenas.';
-- Rollback: first restore the prior application deployment. The unused view
-- can remain; do not remove it while an active deployment still reads it.
