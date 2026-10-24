const { PGlite } = require('@electric-sql/pglite');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
 const db = new PGlite();
 const root = path.resolve(__dirname, '../..');
 await db.exec(`create role anon; create role authenticated; create role outsider;
 create table public."Monumentos" (id uuid primary key,created_at timestamptz,nombre text,ciudad text,provincia text,comunidad_autonoma text,rating double precision,rating_fuente text,precio text,imagen text,imagen_fullback text,descripcion text,acepta_mascotas boolean,acceso_coche boolean,parking_cerca boolean,latitud double precision,longitud double precision,slug text,fuente text,es_seed boolean,reportado boolean);
 create table public.resenas (id uuid primary key,monumento_id uuid,usuario text,comentario text,foto text,created_at timestamptz,likes integer,reportado boolean,video_url text);
 alter table public."Monumentos" enable row level security;
 alter table public.resenas enable row level security;
 create policy visible_places on public."Monumentos" for select to anon,authenticated using (reportado is not true);
 create policy visible_reviews on public.resenas for select to anon,authenticated using (reportado is not true);
 grant select on public."Monumentos",public.resenas to anon,authenticated;`);
 const photos = ['data:image/png;base64,'+'A'.repeat(2_000_000),'DATA:IMAGE/JPEG;BASE64,AAAA','data:image/jpg;base64,AAAA','data:image/webp;base64,AAAA','data:image/gif;base64,AAAA','https://example.com/p.jpg','',null,'data:image/svg+xml;base64,AAAA'];
 for (let i=0;i<photos.length;i++) {
  const id=`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`;
  await db.query('insert into public."Monumentos"(id,imagen,imagen_fullback,nombre,ciudad,rating,reportado) values($1,$2,$3,$4,$5,0,false)',[id,photos[i],'https://example.com/fallback.jpg','Lugar '+i,'Málaga']);
  await db.query('insert into resenas(id,monumento_id,foto,video_url,comentario,likes,reportado) values($1,$1,$2,$3,$4,7,false)',[id,photos[i],'https://example.com/video.mp4','Reseña '+i]);
 }
 await db.exec(`insert into public."Monumentos"(id,reportado) values('ffffffff-ffff-4fff-8fff-ffffffffffff',true); insert into resenas(id,reportado) values('ffffffff-ffff-4fff-8fff-ffffffffffff',true);`);
 await db.exec(fs.readFileSync(path.join(root,'docs/sql/lightweight-reviews.sql'),'utf8'));
 const before = (await db.query('select * from resenas_publicas_ligeras order by id')).rows;
 await db.exec(fs.readFileSync(path.join(root,'docs/sql/lightweight-places-and-review-videos.sql'),'utf8'));
 const after = (await db.query('select * from resenas_publicas_ligeras order by id')).rows;
 assert.deepEqual(after.map(({video_url,...row})=>row),before);
 for (const role of ['anon','authenticated']) {
  await db.exec(`set role ${role}`);
  const places=(await db.query('select * from lugares_publicos_ligeros order by id')).rows;
  const reviews=(await db.query('select * from resenas_publicas_ligeras order by id')).rows;
  assert.equal(places.length,photos.length); assert.equal(reviews.length,photos.length);
  places.forEach((row,i)=> {assert.equal(row.imagen,i<5?'/api/imagenes-publicas/lugares/'+row.id:photos[i]);assert.equal(row.rating,0);assert.equal(row.imagen_fullback,'https://example.com/fallback.jpg');});
  reviews.forEach((row,i)=> {assert.equal(row.foto,i<5?'/api/imagenes-publicas/resenas/'+row.id:photos[i]);assert.equal(row.video_url,'https://example.com/video.mp4');assert.equal(row.likes,7);});
  for(const view of ['lugares_publicos_ligeros','resenas_publicas_ligeras']) for(const op of ['INSERT','UPDATE','DELETE']) assert.equal((await db.query('select has_table_privilege(current_user,$1,$2) as allowed',[view,op])).rows[0].allowed,false);
  await db.exec('reset role');
 }
 await db.exec('set role outsider');
 await assert.rejects(db.query('select * from lugares_publicos_ligeros'),/permission denied/);
 await db.exec('reset role');
 assert.equal((await db.query('select imagen from public."Monumentos" order by id limit 1')).rows[0].imagen,photos[0]);
 assert.equal((await db.query('select foto from public.resenas order by id limit 1')).rows[0].foto,photos[0]);
 console.log('PASS: SQL executes; old review projection compatible; videos, URLs, nulls, formats, ratings preserved; original bytes unchanged; anon/authenticated RLS enforced; views read-only; outsider denied.');
 await db.close();
})().catch(e=>{console.error(e);process.exitCode=1});
