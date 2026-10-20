const { test } = require('node:test');
const assert = require('node:assert/strict');
const { eventoJsonLd, serializarJsonLd } = require('../lib/evento-jsonld.ts');
const evento = {nombre:'Concierto',ciudad:'Teruel',ubicacion_detalle:'Teatro Marín',fecha_inicio:'2026-10-24',hora_inicio:'20:30:00'};
test('structured event preserves the visible venue and local time without inventing offers or status', () => {
  const data=eventoJsonLd({...evento,imagen:'/cartel.jpg'},'concierto');
  assert.equal(data.startDate,'2026-10-24T20:30:00');
  assert.equal(data.location.address,'Teatro Marín, Teruel');
  assert.equal(data.image[0],'https://www.monumentosllenos.com/cartel.jpg');
  assert.equal(data.url,'https://www.monumentosllenos.com/eventos/concierto');
  assert.equal(data.eventStatus,'https://schema.org/EventScheduled');
  for (const key of ['offers','organizer','endDate']) assert.equal(data[key],undefined);
});
test('missing required data and invalid dates omit markup without affecting the page', () => {
  for (const patch of [{nombre:null},{ciudad:null},{ubicacion_detalle:null},{ubicacion_detalle:'teruel'},{fecha_inicio:'2026-02-30'},{fecha_inicio:'invalid'}]) {
    assert.equal(eventoJsonLd({...evento,...patch},'evento'),null);
  }
});
test('unknown times remain date-only and inconsistent end dates are omitted', () => {
  assert.equal(eventoJsonLd({...evento,hora_inicio:null},'evento').startDate,'2026-10-24');
  assert.equal(eventoJsonLd({...evento,hora_inicio:'25:00'},'evento').startDate,'2026-10-24');
  for (const patch of [{fecha_fin:'2026-10-23'},{fecha_fin:'2026-10-24',hora_fin:'19:00'}]) assert.equal(eventoJsonLd({...evento,...patch},'evento').endDate,undefined);
  assert.equal(eventoJsonLd({...evento,fecha_fin:'2026-10-25',hora_fin:'01:00'},'evento').endDate,'2026-10-25T01:00');
});
test('untrusted text cannot close the script and unsafe image protocols are omitted', () => {
  const data=eventoJsonLd({...evento,nombre:'</script><script>alert(1)</script>',imagen:'javascript:alert(1)'},'evento');
  const serialized=serializarJsonLd(data);
  assert(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized),data);
  assert.equal(data.image,undefined);
});

test('known end dates survive missing end times and known same-day times fill endDate', () => {
  assert.equal(eventoJsonLd({...evento,fecha_fin: '2026-10-24'},'evento').endDate,'2026-10-24');
  assert.equal(eventoJsonLd({...evento,hora_fin:'22:00:00'},'evento').endDate,'2026-10-24T22:00:00');
  for (const patch of [{hora_fin:'01:00'},{hora_fin:'25:00'},{hora_inicio:null,hora_fin:'22:00'},{fecha_fin:'invalid',hora_fin:'22:00'}]) {
    assert.equal(eventoJsonLd({...evento,...patch},'evento').endDate,undefined);
  }
});
test('content announcing a status change never gets an explicit scheduled status', () => {
  for (const descripcion of ['Evento cancelado','Aplazado hasta nueva fecha','Actuación suspendida','Concierto reprogramado']) {
    assert.equal(eventoJsonLd({...evento,descripcion},'evento').eventStatus,undefined);
  }
});
