DELIMITER //
CREATE PROCEDURE InsertarDato(
    IN nombre_victima VARCHAR(45),
    IN apellido_victima VARCHAR(45),
    IN direccion_victima VARCHAR(200),
    IN fecha_primera_sospecha DATETIME,
    IN fecha_confirmacion DATETIME,
    IN fecha_muerte_victima DATETIME,
    IN estado_victima VARCHAR(45),
    IN nombre_asociado VARCHAR(45), 
    IN apellido_asociado VARCHAR(45),
    IN fecha_conocio DATETIME,
    IN contacto_fisico VARCHAR(45),
    IN fecha_inicio_contacto DATETIME,
    IN fecha_fin_contacto DATETIME,
    IN nombre_hospital VARCHAR(45),
    IN direccion_hospital VARCHAR(200),
    IN ubicacion_victima VARCHAR(200),
    IN fecha_llegada DATETIME,
    IN fecha_retiro DATETIME,
    IN tratamiento VARCHAR(200),
    IN efectividad int,
    IN fecha_inicio_tratamiento DATETIME,
    IN fecha_fin_tratamiento DATETIME,
    IN efectividad_victima INT 
)

BEGIN
SET @index_victima = 0;
SET @index_tratamiento = 0;
SET @index_asociado = 0;
SET @index_hospital = 0;
SET @index_tipo_contacto = 0;
SET @index_relacion = 0;
SET @index_contacto = 0;
SET @index_localizacion = 0;
SET @index_ficha_medica = 0;
SET @index_proceso_recuperacion = 0;

IF tratamiento IS NOT NULL THEN
    SELECT @index_tratamiento := id_tratamiento FROM Tratamiento WHERE nombre = tratamiento;
    IF @index_tratamiento = 0 THEN
        INSERT INTO Tratamiento (nombre, efectividad)
            VALUES(tratamiento, efectividad);
        SET @last_id_in_Tratamiento = LAST_INSERT_ID();
    ELSE
        SET @last_id_in_Tratamiento = @index_tratamiento;
    END IF;
END IF;

IF nombre_victima IS NOT NULL THEN
    /*Se comprueba si hay victima, ya que el dato 12475 no tiene victima*/
    SELECT @index_victima := id_victima FROM Victima WHERE nombre = nombre_victima AND apellido = apellido_victima;
    IF nombre_hospital IS NOT NULL THEN
        /*La victima estuvo en el hospital*/
        IF @index_victima = 0  THEN
            INSERT INTO Victima(nombre,apellido,direccion,fecha_muerte,estatus,ingresado) 
                VALUES(nombre_victima,apellido_victima,direccion_victima,fecha_muerte_victima,estado_victima,1);
            SET @last_id_in_Victima = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Victima = @index_victima;
        END IF;

        /*Insercion de Hospital*/
        SELECT @index_hospital := id_hospital FROM Hospital WHERE nombre = nombre_hospital;
        IF @index_hospital = 0 THEN
            INSERT INTO Hospital(nombre, direccion)
                VALUES(nombre_hospital, direccion_hospital);
            SET @last_id_in_Hospital = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Hospital = @index_hospital;
        END IF;

        /*Insercion de Ficha Medica con Hospital*/
        SELECT @index_ficha_medica := id_ficha_medica FROM Ficha_Medica WHERE id_victima = @last_id_in_Victima;
        IF @index_ficha_medica = 0 THEN
            INSERT INTO Ficha_Medica(id_victima, id_hospital, fecha_sospecha, fecha_confirmacion)
                VALUES(@last_id_in_Victima, @last_id_in_Hospital, fecha_primera_sospecha, fecha_confirmacion);
            SET @last_id_in_Ficha_Medica = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Ficha_Medica = @index_ficha_medica;
        END IF;
    ELSE
        /*La victima no estuvo en el hospital*/
        IF @index_victima = 0  THEN
            INSERT INTO Victima(nombre,apellido,direccion,fecha_muerte,estatus,ingresado) 
                VALUES(nombre_victima,apellido_victima,direccion_victima,fecha_muerte_victima,estado_victima,0);
            SET @last_id_in_Victima = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Victima = @index_victima;
        END IF;

        /*Insercion de Ficha Medica sin Hospital*/
        SELECT @index_ficha_medica := id_ficha_medica FROM Ficha_Medica WHERE id_victima = @last_id_in_Victima;
        IF @index_ficha_medica = 0 THEN
            INSERT INTO Ficha_Medica(id_victima, id_hospital, fecha_sospecha, fecha_confirmacion)
                VALUES(@last_id_in_Victima, NULL, fecha_primera_sospecha, fecha_confirmacion);
            SET @last_id_in_Ficha_Medica = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Ficha_Medica = @index_ficha_medica;
        END IF;
    END IF;

    /*Insercion de Proceso Recuperacion*/
    IF tratamiento IS NOT NULL THEN
        SELECT @index_proceso_recuperacion := id_proceso_recuperacion FROM Proceso_Recuperacion WHERE 
            id_ficha_medica = @last_id_in_Ficha_Medica AND id_tratamiento = @last_id_in_Tratamiento AND
            fecha_inicio = fecha_inicio_tratamiento AND fecha_fin = fecha_fin_tratamiento;
        IF @index_proceso_recuperacion = 0 THEN
            INSERT INTO Proceso_Recuperacion(id_ficha_medica, id_tratamiento, fecha_inicio, fecha_fin, efectividad)
                VALUES(@last_id_in_Ficha_Medica, @last_id_in_Tratamiento, fecha_inicio_tratamiento,
                    fecha_fin_tratamiento, efectividad_victima);
        END IF;
    END IF;

    /*Insercion de Localizacion*/
    IF ubicacion_victima IS NOT NULL THEN
        SELECT @index_localizacion := id_localizacion FROM Localizacion WHERE id_victima = @last_id_in_Victima AND
            direccion = ubicacion_victima AND fecha_llegada = fecha_llegada AND fecha_salida = fecha_retiro;
        IF @index_localizacion = 0 THEN
            INSERT INTO Localizacion(id_victima, direccion, fecha_llegada, fecha_salida)
                VALUES(@last_id_in_Victima, ubicacion_victima, fecha_llegada, fecha_retiro);
        END IF;
    END IF;

    /*Insercion de Asociado*/
    IF nombre_asociado IS NOT NULL THEN
        SELECT @index_asociado := id_asociado FROM Asociado WHERE nombre = nombre_asociado AND apellido = apellido_asociado;
        IF @index_asociado = 0 THEN
            INSERT INTO Asociado (nombre, apellido)
                VALUES(nombre_asociado, apellido_asociado);
            SET @last_id_in_Asociado = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Asociado = @index_asociado;
        END IF;

        /*Insercion de Relacion*/
        SELECT @index_relacion := id_relacion FROM Relacion WHERE id_victima = @last_id_in_Victima AND id_asociado = @last_id_in_Asociado;
        IF @index_relacion = 0 THEN
            INSERT INTO Relacion (id_victima, id_asociado, fecha_inicio)
                VALUES(@last_id_in_Victima, @last_id_in_Asociado, fecha_conocio);
            SET @last_id_in_Relacion = LAST_INSERT_ID();
        ELSE
            SET @last_id_in_Relacion = @index_relacion;
        END IF;

        IF contacto_fisico IS NOT NULL THEN
            /*Insercion de Tipo Contacto*/
            SELECT @index_tipo_contacto := id_tipo_contacto FROM Tipo_Contacto WHERE nombre = contacto_fisico;
            IF @index_tipo_contacto = 0 THEN
                INSERT INTO Tipo_Contacto (nombre)
                    VALUES(contacto_fisico);
                SET @last_id_in_tipo_contacto = LAST_INSERT_ID();
            ELSE
                SET @last_id_in_tipo_contacto = @index_tipo_contacto;
            END IF;

            /*Insercion de Contacto*/
            SELECT @index_contacto := id_contacto FROM Contacto WHERE id_relacion = @last_id_in_Relacion AND id_tipo_contacto = @last_id_in_tipo_contacto;
            IF @index_contacto = 0 THEN
                INSERT INTO Contacto (id_relacion, id_tipo_contacto)
                    VALUES(@last_id_in_Relacion, @last_id_in_tipo_contacto);
            END IF;
        END IF;
    END IF;
END IF;

END //

DELIMITER ;
