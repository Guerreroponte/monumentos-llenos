-- Aplicado mediante la migración add_place_rating_provenance.
ALTER TABLE public."Monumentos"
  ADD COLUMN IF NOT EXISTS rating_fuente text,
  ADD COLUMN IF NOT EXISTS rating_url text,
  ADD COLUMN IF NOT EXISTS rating_consultada_el date;
