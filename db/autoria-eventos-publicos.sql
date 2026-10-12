BEGIN;
CREATE OR REPLACE FUNCTION public.crear_evento_con_token(p_nombre text, p_ciudad text, p_provincia text, p_comunidad_autonoma text, p_tipo text, p_categoria_evento text, p_subtipo text, p_fecha_inicio date, p_fecha_fin date, p_hora_inicio time without time zone, p_hora_fin time without time zone, p_ubicacion_detalle text, p_descripcion text, p_precio text, p_ambiente text, p_imagen text, p_video_url text, p_enlace text, p_creado_por text, p_colaborador_id uuid, p_slug text, p_dificil_bebida boolean, p_parking boolean, p_recomendable boolean)
 RETURNS TABLE(evento_id uuid, edit_token uuid)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_evento_id uuid;
  v_edit_token uuid;
begin
  insert into public.eventos (
    nombre,
    ciudad,
    provincia,
    comunidad_autonoma,
    tipo,
    categoria_evento,
    subtipo,
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin,
    ubicacion_detalle,
    descripcion,
    precio,
    ambiente,
    imagen,
    video_url,
    enlace,
    creado_por,
    colaborador_id,
    slug,
    dificil_bebida,
    parking,
    recomendable,
    destacado
  )
  values (
    p_nombre,
    p_ciudad,
    p_provincia,
    p_comunidad_autonoma,
    p_tipo,
    p_categoria_evento,
    p_subtipo,
    p_fecha_inicio,
    p_fecha_fin,
    p_hora_inicio,
    p_hora_fin,
    p_ubicacion_detalle,
    p_descripcion,
    p_precio,
    p_ambiente,
    p_imagen,
    p_video_url,
    p_enlace,
    'Comunidad',
    null,
    p_slug,
    p_dificil_bebida,
    p_parking,
    p_recomendable,
    false
  )
  returning id into v_evento_id;

  insert into public.eventos_edit_tokens (
    evento_id
  )
  values (
    v_evento_id
  )
  returning eventos_edit_tokens.edit_token into v_edit_token;

  return query
  select
    v_evento_id,
    v_edit_token;
end;
$function$;

CREATE OR REPLACE FUNCTION public.editar_evento_por_token(p_edit_token uuid, p_nombre text, p_ciudad text, p_provincia text, p_comunidad_autonoma text, p_tipo text, p_categoria_evento text, p_subtipo text, p_fecha_inicio date, p_fecha_fin date, p_hora_inicio time without time zone, p_hora_fin time without time zone, p_ubicacion_detalle text, p_descripcion text, p_precio text, p_ambiente text, p_imagen text, p_video_url text, p_enlace text, p_creado_por text, p_colaborador_id uuid, p_slug text, p_dificil_bebida boolean, p_parking boolean, p_recomendable boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  filas_actualizadas integer;
begin
  update public.eventos
  set
    nombre = p_nombre,
    ciudad = p_ciudad,
    provincia = p_provincia,
    comunidad_autonoma = p_comunidad_autonoma,
    tipo = p_tipo,
    categoria_evento = p_categoria_evento,
    subtipo = p_subtipo,
    fecha_inicio = p_fecha_inicio,
    fecha_fin = p_fecha_fin,
    hora_inicio = p_hora_inicio,
    hora_fin = p_hora_fin,
    ubicacion_detalle = p_ubicacion_detalle,
    descripcion = p_descripcion,
    precio = p_precio,
    ambiente = p_ambiente,
    imagen = p_imagen,
    video_url = p_video_url,
    enlace = p_enlace,
    slug = p_slug,
    dificil_bebida = p_dificil_bebida,
    parking = p_parking,
    recomendable = p_recomendable
  where id = (
    select evento_id
    from public.eventos_edit_tokens
    where edit_token = p_edit_token
  );

  get diagnostics filas_actualizadas = row_count;

  return filas_actualizadas = 1;
end;
$function$;

CREATE OR REPLACE FUNCTION public.proteger_autoria_evento_publico()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  IF current_user IN ('anon','authenticated') THEN
    IF TG_OP = 'INSERT' THEN
      NEW.colaborador_id := NULL;
      NEW.creado_por := 'Comunidad';
    ELSE
      NEW.colaborador_id := OLD.colaborador_id;
      NEW.creado_por := OLD.creado_por;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.proteger_autoria_evento_publico() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER proteger_autoria_evento_publico
BEFORE INSERT OR UPDATE ON public.eventos
FOR EACH ROW EXECUTE FUNCTION public.proteger_autoria_evento_publico();
COMMIT;
