/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { createClient } = require('@supabase/supabase-js');
function load(file) {
 const loaded = {exports:{}};
 new Function('require','module','exports',ts.transpileModule(fs.readFileSync(require.resolve(file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(id=>id==='./ciudad-identidad'?load('../lib/ciudad-identidad.ts'):require(id),loaded,loaded.exports);
 return loaded.exports;
}
const { cargarLugaresDeCiudad } = load('../lib/lugares-ciudad.ts');
function fixture(rows, failDetails=false) {
 const requests=[];
 const db=createClient('https://example.supabase.co','test-key',{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:async(input)=>{
  const url=new URL(input);requests.push(url);
  let result=rows.filter(row=>row.reportado===false);
  assert.equal(url.searchParams.get('reportado'),'eq.false');
  if(url.pathname.endsWith('/Monumentos')) {
   assert.equal(url.searchParams.get('select'),'id,ciudad');
   assert.equal(url.searchParams.get('order'),'created_at.desc,id.asc');
   const offset=Number(url.searchParams.get('offset'));
   result=result.slice(offset,offset+Number(url.searchParams.get('limit'))).map(({id,ciudad})=>({id,ciudad}));
  } else {
   assert.equal(url.pathname,'/rest/v1/lugares_publicos_ligeros');
   if(failDetails) return new Response(JSON.stringify({message:'offline'}),{status:500});
   const ids=url.searchParams.get('id').slice(4,-1).split(',');
   assert(ids.length<=100);
   result=result.filter(row=>ids.includes(row.id)).reverse();
  }
  return new Response(JSON.stringify(result),{headers:{'Content-Type':'application/json'}});
 }}});
 return {db,requests};
}
test('city cards preserve accents, aliases, count, order and eight-card limit without fetching other photos',async()=>{
 const rows=Array.from({length:12},(_,i)=>({id:String(i),ciudad:i%2?'Palma de Mallorca':'Palma',reportado:false,imagen:'photo.jpg',rating:0}));
 rows.splice(2,0,{id:'other',ciudad:'Las Palmas de Gran Canaria',reportado:false},{id:'hidden',ciudad:'Palma',reportado:true},{id:'legacy',ciudad:'Palma',reportado:null});
 const {db,requests}=fixture(rows);
 const result=await cargarLugaresDeCiudad(db,'palma');
 assert.equal(result.total,12);
 assert.deepEqual(result.items.map(x=>x.id),['0','1','2','3','4','5','6','7']);
 assert.equal(result.items[0].rating,0);
 assert.equal(requests.length,2);
 assert.equal(requests[1].searchParams.get('id'),'in.(0,1,2,3,4,5,6,7)');
 const accents=fixture([{id:'a',ciudad:'Málaga',reportado:false},{id:'b',ciudad:'M%C3%A1laga',reportado:false},{id:'c',ciudad:'Malagón',reportado:false}]);
 assert.deepEqual((await cargarLugaresDeCiudad(accents.db,'malaga')).items.map(x=>x.id),['a','b']);
});
test('show all scans past 1,000 identities and fetches bounded matching batches in stable order',async()=>{
 const rows=[...Array.from({length:1005},(_,i)=>({id:'other'+i,ciudad:'Madrid',reportado:false})),...Array.from({length:205},(_,i)=>({id:String(i),ciudad:'Vigo',reportado:false}))];
 const {db,requests}=fixture(rows);
 const result=await cargarLugaresDeCiudad(db,'vigo',true);
 assert.equal(result.total,205);assert.deepEqual(result.items.map(x=>x.id),Array.from({length:205},(_,i)=>String(i)));
 assert.equal(requests.length,5);
});
test('empty city avoids detail requests and query failures remain observable',async()=>{
 const {db,requests}=fixture([{id:'a',ciudad:'Madrid',reportado:false}]);
 assert.deepEqual(await cargarLugaresDeCiudad(db,'barcelona'),{items:[],total:0});assert.equal(requests.length,1);
 const failing=fixture([{id:'a',ciudad:'Madrid',reportado:false}],true);
 await assert.rejects(cargarLugaresDeCiudad(failing.db,'madrid'),{message:'offline'});
});
