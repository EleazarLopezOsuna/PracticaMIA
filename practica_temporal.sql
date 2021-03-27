USE practica_GVE ;

DROP TABLE IF EXISTS practica_GVE.Temporal ;

CREATE TABLE practica_GVE.Temporal (
id_temporal INT NOT NULL AUTO_INCREMENT,
nombre_victima VARCHAR(45),
apellido_victima VARCHAR(45),
direccion_victima VARCHAR(200),
fecha_primera_sospecha DATETIME,
fecha_confirmacion DATETIME,
fecha_muerte DATETIME,
estado_victima VARCHAR(45),
nombre_asociado VARCHAR(45),
apellido_asociado VARCHAR(45),
fecha_conocido DATETIME,
contacto_fisico VARCHAR(45),
fecha_inicio_contacto DATETIME,
fecha_fin_contacto DATETIME,
nombre_hospital VARCHAR(200),
direccion_hospital VARCHAR(200),
ubicacion_victima VARCHAR(200),
fecha_llegada DATETIME,
fecha_retiro DATETIME,
tratamiento VARCHAR(200),
efectividad INT,
fecha_inicio_tratamiento DATETIME,
fecha_fin_tratamiento DATETIME,
efectivida_en_victima INT,
PRIMARY KEY (id_temporal))
ENGINE = InnoDB;