const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const agenda=require('../lib/agenda-ui.ts');
const ciudades=require('../lib/ciudad-identidad.ts');
function cargar(fail, paginate=false) {
  const calls=[];
  const client={from(table){
    let columns,offset=0; const filters=[];
    const q={select(value){columns=value;return q},range(from){offset=from;return q},then(resolve,reject){
      calls.push({table,columns,offset,filters});
      const city=columns==='ciudad, fecha_inicio, fecha_fin';
      const key=table+':'+columns;
      if(fail===key && (!paginate || offset>0)) return Promise.resolve({data:null,error:{message:'test failure'}}).then(resolve,reject);
      let data=[];
      if(table==='eventos') data=[
        {slug:'en-curso',ciudad:'Palma de Mallorca',fecha_inicio:'2000-01-01',fecha_fin:'2099-12-31'},
        {slug:'futuro',ciudad:'Palma',fecha_inicio:'2099-12-01',fecha_fin:null},
        {slug:'pasado',ciudad:'Pasada',fecha_inicio:'2000-01-01',fecha_fin:'2000-01-02'},
        {slug:'invalido',ciudad:'Inválida',fecha_inicio:'2099-12-01',fecha_fin:'2000-01-02'}
      ];
      if(table==='Monumentos') data=[{slug:'lugar',ciudad:'Ávila'}];
      if(paginate && key===fail && offset===0) data=Array.from({length:1000},()=>data[0]||{slug:'x'});
      return Promise.resolve({data,error:null}).then(resolve,reject);
    }};
    for(const method of ['eq','not','or','order']) q[method]=(...args)=>{filters.push([method,...args]);return q};
    return q;
  }};
  const output=ts.transpileModule(fs.readFileSync(require.resolve('../app/sitemap.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  const exports={};
  vm.runInNewContext(output,{exports,require(name){return name.endsWith('/supabase')?{supabase:client}:name.endsWith('/agenda-ui')?agenda:ciudades},console:{error(){}},Intl,Date});
  return {run:exports.default,calls};
}
test('sitemap includes ongoing and future events and canonical city aliases, excluding ended or invalid periods',async()=>{
  const {run,calls}=cargar(); const urls=(await run()).map(x=>x.url);
  assert(urls.includes('https://www.monumentosllenos.com/eventos/en-curso'));
  assert(urls.includes('https://www.monumentosllenos.com/eventos/futuro'));
  assert(!urls.some(x=>x.endsWith('/pasado')||x.endsWith('/invalido')||x.endsWith('/pasada')));
  assert.equal(urls.filter(x=>x.endsWith('/que-hacer/palma')).length,1);
  assert(urls.includes('https://www.monumentosllenos.com/que-hacer/avila'));
  const query=calls.find(x=>x.columns==='ciudad, fecha_inicio, fecha_fin');
  assert(query.filters.some(x=>x[0]==='or'&&x[1]===agenda.filtroEventosVigentes()));
});
test('each failed data source rejects the complete sitemap, including a failure after the first page',async()=>{
  for(const source of ['eventos:slug, created_at, fecha_inicio, fecha_fin','Monumentos:slug, created_at','colaboradores:slug, created_at','eventos:ciudad, fecha_inicio, fecha_fin','Monumentos:ciudad']) {
    for(const paginate of [false,true]) await assert.rejects(cargar(source,paginate).run(),/sitemap completo/);
  }
});
