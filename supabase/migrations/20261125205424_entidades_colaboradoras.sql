-- Independent catalogue: no changes to collaborators, brands or event relationships.
create table public.entidades_colaboradoras (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 nombre text not null,
 descripcion text not null,
 descripcion_corta text not null,
 logo_url text not null check (logo_url ~ '^https://'),
 web_url text not null check (web_url ~ '^https://'),
 instagram_url text check (instagram_url ~ '^https://'),
 activa boolean not null default false,
 orden integer not null default 0,
 created_at timestamptz not null default now()
);
alter table public.entidades_colaboradoras enable row level security;
revoke all on public.entidades_colaboradoras from anon, authenticated;
grant select on public.entidades_colaboradoras to anon, authenticated;
grant all on public.entidades_colaboradoras to service_role;
create policy entidades_activas_lectura on public.entidades_colaboradoras
 for select to anon, authenticated using (activa = true);
insert into public.entidades_colaboradoras
(slug,nombre,descripcion,descripcion_corta,logo_url,web_url,instagram_url,activa)
values ('hispania-nostra','Hispania Nostra','Hispania Nostra es una asociación sin ánimo de lucro, declarada de utilidad pública, que trabaja desde el año 1976 en la defensa, promoción y puesta en valor del patrimonio cultural y natural, al que considera como vector de desarrollo social y económico. Tiene como objetivo promover la participación social en las actividades de protección, conservación, difusión y disfrute por los ciudadanos de su herencia cultural y natural. Para ello lleva a cabo programas de vigilancia sobre patrimonio en peligro; de estímulo a las buenas prácticas; promueve la colaboración ciudadana entre instituciones públicas y privadas y participa en actividades de educación y promoción del valor social del patrimonio.',
'Asociación dedicada desde 1976 a la defensa, promoción y puesta en valor del patrimonio cultural y natural.',
'https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/colaboradores/Logo%20HN50_Positivo.png',
'https://www.hispanianostra.org/','https://www.instagram.com/hispanianostra_/',true);
