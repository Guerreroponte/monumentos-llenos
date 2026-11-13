const {test}=require('node:test');
const assert=require('node:assert/strict');
const {separarEnlaceCredito}=require('../lib/descripcion-lugar.ts');
test('separa puntuación editorial y preserva paréntesis propios de la URL',()=>{
 assert.deepEqual(separarEnlaceCredito('https://commons.wikimedia.org/wiki/File:Covetes_01.JPG).'),{url:'https://commons.wikimedia.org/wiki/File:Covetes_01.JPG',sufijo:').' });
 assert.deepEqual(separarEnlaceCredito('https://example.org/Obra_(2026)).'),{url:'https://example.org/Obra_(2026)',sufijo:').' });
 assert.deepEqual(separarEnlaceCredito('https://example.org/?a=1&b=2'),{url:'https://example.org/?a=1&b=2',sufijo:''});
});
