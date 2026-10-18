const {test}=require('node:test');
const assert=require('node:assert/strict');
const {enlaceUber,destinoDesdeMaps}=require('../lib/transporte.ts');

test('transporte preserves coordinates and accented destination without adding pickup or booking',()=>{
 const u=new URL(enlaceUber('37.5988522,-0.9853417','Museo & Teatro #1, Cartagena'));
 assert.equal(u.origin,'https://m.uber.com');
 assert.deepEqual(JSON.parse(u.searchParams.get('drop[0]')),{latitude:37.5988522,longitude:-0.9853417,addressLine1:'Museo & Teatro #1, Cartagena'});
 assert.equal(u.searchParams.size,1);
 assert.equal(JSON.parse(new URL(enlaceUber('0,0','Destino')).searchParams.get('drop[0]')).latitude,0);
});
test('transporte does not invent coordinates for addresses or invalid values',()=>{
 for(const value of ['Sala Eslava, Madrid','91,0','0,181','NaN,3','']) assert.equal(new URL(enlaceUber(value,'Lugar')).searchParams.size,0);
});
test('transporte only accepts the existing Google Maps destination',()=>{
 assert.equal(destinoDesdeMaps(null),null);
 assert.equal(destinoDesdeMaps('javascript:alert(1)'),null);
 assert.equal(destinoDesdeMaps('https://example.com/maps/dir/?destination=Madrid'),null);
 assert.equal(destinoDesdeMaps('https://www.google.com/maps/dir/?api=1&destination='),null);
 assert.equal(destinoDesdeMaps('https://www.google.com/maps/dir/?api=1&destination=Sala%20A%20%26%20B%2C%20Le%C3%B3n'),'Sala A & B, León');
});
