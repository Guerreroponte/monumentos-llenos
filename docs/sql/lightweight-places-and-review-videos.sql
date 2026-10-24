-- Applied to Supabase on 2026-10-24 after explicit approval.
-- Migration: lightweight_places_and_review_videos.
-- Additive, read-only projections: no original images, rows or RLS are changed.
begin;
set local lock_timeout = '3s';
set local statement_timeout = '10s';

create view public.lugares_publicos_ligeros
with (security_invoker = true)
as select id, created_at, nombre, ciudad, provincia, comunidad_autonoma,
  rating, rating_fuente, precio,
  case when left(imagen, 32) ~* '^data:image/(png|jpeg|jpg|webp|gif);base64,'
    then '/api/imagenes-publicas/lugares/' || id::text
    else imagen end as imagen,
  imagen_fullback, descripcion, acepta_mascotas, acceso_coche, parking_cerca,
  latitud, longitud, slug, fuente, es_seed, reportado
from public."Monumentos";
revoke all on public.lugares_publicos_ligeros from public, anon, authenticated;
grant select on public.lugares_publicos_ligeros to anon, authenticated;

-- Append video_url without changing the existing columns or grants.
create or replace view public.resenas_publicas_ligeras
with (security_invoker = true)
as select id, monumento_id, usuario, comentario,
  case when left(foto, 32) ~* '^data:image/(png|jpeg|jpg|webp|gif);base64,'
    then '/api/imagenes-publicas/resenas/' || id::text
    else foto end as foto,
  created_at, likes, reportado, video_url
from public.resenas;

notify pgrst, 'reload schema';
commit;
-- Rollback: restore the previous app first. These compatible projections can
-- remain in place; do not drop views used by active deployments.
