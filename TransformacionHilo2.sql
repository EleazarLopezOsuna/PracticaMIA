DELIMITER //
CREATE PROCEDURE `TransformacionHilo2`()
BEGIN
SET @nombre_victima = NULL;
SET @apellido_victima = NULL; 
SET @direccion_victima = NULL;
SET @fecha_primera_sospecha = NULL;
SET @fecha_confirmacion = NULL;
SET @fecha_muerte = NULL;
SET @estado_victima = NULL;
SET @nombre_asociado = NULL;
SET @apellido_asociado = NULL;
SET @fecha_conocio = NULL;
SET @contacto_fisico = NULL;
SET @fecha_inicio_contacto = NULL;
SET @fecha_fin_contacto = NULL;
SET @nombre_hospital = NULL;
SET @direccion_hospital = NULL;
SET @ubicacion_victima = NULL;
SET @fecha_llegada = NULL;
SET @fecha_retiro = NULL;
SET @tratamiento = NULL;
SET @efectividad = NULL;
SET @fecha_inicio_tratamiento = NULL;
SET @fecha_fin_tratamiento = NULL;
SET @efectividad_en_victima = NULL;
SET @iterador = 3509;

WHILE @iterador <= 7016 DO
    SELECT @nombre_victima:=nombre_victima, 
        @apellido_victima:=apellido_victima, 
        @direccion_victima:=direccion_victima,
        @fecha_primera_sospecha:=fecha_primera_sospecha,
        @fecha_confirmacion:=fecha_confirmacion,
        @fecha_muerte:=fecha_muerte,
        @estado_victima:=estado_victima,
        @nombre_asociado:=nombre_asociado,
        @apellido_asociado:=apellido_asociado,
        @fecha_conocio:=fecha_conocido,
        @contacto_fisico:=contacto_fisico,
        @fecha_inicio_contacto:=fecha_inicio_contacto,
        @fecha_fin_contacto:=fecha_fin_contacto, 
        @nombre_hospital:=nombre_hospital,
        @direccion_hospital:=direccion_hospital,
        @ubicacion_victima:=ubicacion_victima,
        @fecha_llegada:=fecha_llegada,
        @fecha_retiro:=fecha_retiro,
        @tratamiento:=tratamiento,
        @efectividad:=efectividad,
        @fecha_inicio_tratamiento:=fecha_inicio_tratamiento ,
        @fecha_fin_tratamiento:=fecha_fin_tratamiento ,
        @efectividad_en_victima:=efectivida_en_victima 
    FROM Temporal WHERE id_temporal= @iterador;
    
    CALL InsertarDato(
        @nombre_victima,@apellido_victima,@direccion_victima,@fecha_primera_sospecha,
        @fecha_confirmacion,@fecha_muerte,@estado_victima,@nombre_asociado,@apellido_asociado,
        @fecha_conocio,@contacto_fisico,@fecha_inicio_contacto,@fecha_fin_contacto,@nombre_hospital,
        @direccion_hospital,@ubicacion_victima,@fecha_llegada,@fecha_retiro,@tratamiento,
        @efectividad,@fecha_inicio_tratamiento,@fecha_fin_tratamiento,@efectividad_en_victima
    );
    SET @iterador = @iterador + 1;
    END WHILE;
END //
DELIMITER ;
