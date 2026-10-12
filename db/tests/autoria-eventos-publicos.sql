BEGIN;
INSERT INTO eventos(id,nombre,ciudad,slug,colaborador_id,creado_por)
VALUES ('f0a37f03-f7f8-4736-bb72-62930254aaa1','Fixture autoría','Madrid','fixture-autoria-rollback','abc1ce2b-009b-4a6e-9392-dc3691a1d212','Autor original');
INSERT INTO eventos_edit_tokens(evento_id,edit_token)
VALUES ('f0a37f03-f7f8-4736-bb72-62930254aaa1','f0a37f03-f7f8-4736-bb72-62930254aaa2');
SET LOCAL ROLE anon;
DO $test$
DECLARE r record; e record;
BEGIN
 SELECT * INTO r FROM crear_evento_con_token(p_nombre => 'Prueba transaccional autoría', p_ciudad => 'Madrid', p_provincia => null, p_comunidad_autonoma => null, p_tipo => 'Concierto', p_categoria_evento => 'local', p_subtipo => 'Concierto', p_fecha_inicio => '2026-11-01'::date, p_fecha_fin => null, p_hora_inicio => null, p_hora_fin => null, p_ubicacion_detalle => null, p_descripcion => 'Prueba rollback', p_precio => null, p_ambiente => null, p_imagen => null, p_video_url => null, p_enlace => null, p_creado_por => 'Sala suplantada', p_colaborador_id => 'abc1ce2b-009b-4a6e-9392-dc3691a1d212'::uuid, p_slug => 'prueba-autoria-transaccional', p_dificil_bebida => false, p_parking => false, p_recomendable => true);
 SELECT colaborador_id,creado_por INTO e FROM eventos WHERE id=r.evento_id;
 IF e.colaborador_id IS NOT NULL OR e.creado_por IS DISTINCT FROM 'Comunidad' OR r.edit_token IS NULL THEN RAISE EXCEPTION 'Public creation failed'; END IF;
 IF NOT editar_evento_por_token(p_edit_token => r.edit_token, p_nombre => 'Prueba transaccional autoría', p_ciudad => 'Madrid', p_provincia => null, p_comunidad_autonoma => null, p_tipo => 'Concierto', p_categoria_evento => 'local', p_subtipo => 'Concierto', p_fecha_inicio => '2026-11-01'::date, p_fecha_fin => null, p_hora_inicio => null, p_hora_fin => null, p_ubicacion_detalle => null, p_descripcion => 'Prueba rollback', p_precio => null, p_ambiente => null, p_imagen => null, p_video_url => null, p_enlace => null, p_creado_por => 'Sala suplantada', p_colaborador_id => 'abc1ce2b-009b-4a6e-9392-dc3691a1d212'::uuid, p_slug => 'prueba-autoria-transaccional', p_dificil_bebida => false, p_parking => false, p_recomendable => true) THEN RAISE EXCEPTION 'Community editing failed'; END IF;
 IF NOT editar_evento_por_token(p_edit_token => 'f0a37f03-f7f8-4736-bb72-62930254aaa2'::uuid, p_nombre => 'Prueba transaccional autoría', p_ciudad => 'Madrid', p_provincia => null, p_comunidad_autonoma => null, p_tipo => 'Concierto', p_categoria_evento => 'local', p_subtipo => 'Concierto', p_fecha_inicio => '2026-11-01'::date, p_fecha_fin => null, p_hora_inicio => null, p_hora_fin => null, p_ubicacion_detalle => null, p_descripcion => 'Prueba rollback', p_precio => null, p_ambiente => null, p_imagen => null, p_video_url => null, p_enlace => null, p_creado_por => 'Sala suplantada', p_colaborador_id => 'abc1ce2b-009b-4a6e-9392-dc3691a1d212'::uuid, p_slug => 'fixture-autoria-rollback', p_dificil_bebida => false, p_parking => false, p_recomendable => true) THEN RAISE EXCEPTION 'Linked editing failed'; END IF;
 SELECT colaborador_id,creado_por INTO e FROM eventos WHERE id='f0a37f03-f7f8-4736-bb72-62930254aaa1';
 IF e.colaborador_id IS DISTINCT FROM 'abc1ce2b-009b-4a6e-9392-dc3691a1d212'::uuid OR e.creado_por IS DISTINCT FROM 'Autor original' THEN RAISE EXCEPTION 'Existing attribution changed'; END IF;
 INSERT INTO eventos(id,nombre,slug,colaborador_id,creado_por) VALUES ('f0a37f03-f7f8-4736-bb72-62930254aaa3','Direct test','direct-autoria-rollback','abc1ce2b-009b-4a6e-9392-dc3691a1d212','Fake sala');
 SELECT colaborador_id,creado_por INTO e FROM eventos WHERE id='f0a37f03-f7f8-4736-bb72-62930254aaa3';
 IF e.colaborador_id IS NOT NULL OR e.creado_por IS DISTINCT FROM 'Comunidad' THEN RAISE EXCEPTION 'Direct insert protection failed'; END IF;
END $test$;
RESET ROLE;
ROLLBACK;
SELECT 'Pruebas de publicación, edición, conservación y escritura directa correctas; rollback completado' as resultado;
