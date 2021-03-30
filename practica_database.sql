-- -----------------------------------------------------
-- Schema practica_GVE
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS practica_GVE DEFAULT CHARACTER SET utf8 ;
USE practica_GVE ;

DROP TABLE IF EXISTS  practica_GVE.Proceso_Recuperacion;
DROP TABLE IF EXISTS  practica_GVE.Ficha_Medica;
DROP TABLE IF EXISTS  practica_GVE.Contacto;
DROP TABLE IF EXISTS  practica_GVE.Relacion;
DROP TABLE IF EXISTS  practica_GVE.Tratamiento;
DROP TABLE IF EXISTS  practica_GVE.Tipo_Contacto;
DROP TABLE IF EXISTS  practica_GVE.Localizacion;
DROP TABLE IF EXISTS  practica_GVE.Asociado;
DROP TABLE IF EXISTS  practica_GVE.Hospital;
DROP TABLE IF EXISTS  practica_GVE.Victima;
DROP TABLE IF EXISTS  practica_GVE.Estatus;

-- -----------------------------------------------------
-- Table practica_GVE.Tratamiento
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Tratamiento ;

CREATE TABLE IF NOT EXISTS practica_GVE.Tratamiento (
  id_tratamiento INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL,
  efectividad INT NOT NULL,
  PRIMARY KEY (id_tratamiento))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Estatus
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Estatus ;

CREATE TABLE IF NOT EXISTS practica_GVE.Estatus (
  id_estatus INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_estatus))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Asociado
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Asociado ;

CREATE TABLE IF NOT EXISTS practica_GVE.Asociado (
  id_asociado INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_asociado))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Tipo_Contacto
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Tipo_Contacto ;

CREATE TABLE IF NOT EXISTS practica_GVE.Tipo_Contacto (
  id_tipo_contacto INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_tipo_contacto))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Hospital
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Hospital ;

CREATE TABLE IF NOT EXISTS practica_GVE.Hospital (
  id_hospital INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  PRIMARY KEY (id_hospital))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Victima
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Victima ;

CREATE TABLE IF NOT EXISTS practica_GVE.Victima (
  id_victima INT NOT NULL AUTO_INCREMENT,
  id_estatus INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  fecha_muerte DATETIME NULL DEFAULT NULL,
  ingresado TINYINT(1) NOT NULL,
  PRIMARY KEY (id_victima),
  INDEX fk_Victima_Estatus1_idx (id_estatus ASC) VISIBLE,
  CONSTRAINT fk_Victima_Estatus1
    FOREIGN KEY (id_estatus)
    REFERENCES practica_GVE.Estatus (id_estatus)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Relacion
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Relacion ;

CREATE TABLE IF NOT EXISTS practica_GVE.Relacion (
  id_relacion INT NOT NULL AUTO_INCREMENT,
  id_victima INT NOT NULL,
  id_asociado INT NOT NULL,
  fecha_inicio DATETIME NOT NULL,
  PRIMARY KEY (id_relacion),
  INDEX fk_Relacion_Asociado1_idx (id_asociado ASC) VISIBLE,
  INDEX fk_Relacion_Victima1_idx (id_victima ASC) VISIBLE,
  CONSTRAINT fk_Relacion_Asociado1
    FOREIGN KEY (id_asociado)
    REFERENCES practica_GVE.Asociado (id_asociado)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Relacion_Victima1
    FOREIGN KEY (id_victima)
    REFERENCES practica_GVE.Victima (id_victima)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Contacto
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Contacto ;

CREATE TABLE IF NOT EXISTS practica_GVE.Contacto (
  id_contacto INT NOT NULL AUTO_INCREMENT,
  id_relacion INT NOT NULL,
  id_tipo_contacto INT NOT NULL,
  PRIMARY KEY (id_contacto),
  INDEX fk_Contacto_Tipo_Contacto1_idx (id_tipo_contacto ASC) VISIBLE,
  INDEX fk_Contacto_Relacion1_idx (id_relacion ASC) VISIBLE,
  CONSTRAINT fk_Contacto_Tipo_Contacto1
    FOREIGN KEY (id_tipo_contacto)
    REFERENCES practica_GVE.Tipo_Contacto (id_tipo_contacto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Contacto_Relacion1
    FOREIGN KEY (id_relacion)
    REFERENCES practica_GVE.Relacion (id_relacion)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Localizacion
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Localizacion ;

CREATE TABLE IF NOT EXISTS practica_GVE.Localizacion (
  id_localizacion INT NOT NULL AUTO_INCREMENT,
  id_victima INT NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  fecha_llegada DATETIME NOT NULL,
  fecha_salida DATETIME NOT NULL,
  PRIMARY KEY (id_localizacion),
  INDEX fk_Localizacion_Victima1_idx (id_victima ASC) VISIBLE,
  CONSTRAINT fk_Localizacion_Victima1
    FOREIGN KEY (id_victima)
    REFERENCES practica_GVE.Victima (id_victima)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Ficha_Medica
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Ficha_Medica ;

CREATE TABLE IF NOT EXISTS practica_GVE.Ficha_Medica (
  id_ficha_medica INT NOT NULL AUTO_INCREMENT,
  id_victima INT NOT NULL,
  id_hospital INT NOT NULL,
  fecha_sospecha DATETIME NOT NULL,
  fecha_confirmacion DATETIME NOT NULL,
  PRIMARY KEY (id_ficha_medica),
  INDEX fk_Ficha_Medica_Hospital1_idx (id_hospital ASC) VISIBLE,
  INDEX fk_Ficha_Medica_Victima1_idx (id_victima ASC) VISIBLE,
  CONSTRAINT fk_Ficha_Medica_Hospital1
    FOREIGN KEY (id_hospital)
    REFERENCES practica_GVE.Hospital (id_hospital)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Ficha_Medica_Victima1
    FOREIGN KEY (id_victima)
    REFERENCES practica_GVE.Victima (id_victima)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table practica_GVE.Proceso_Recuperacion
-- -----------------------------------------------------
DROP TABLE IF EXISTS practica_GVE.Proceso_Recuperacion ;

CREATE TABLE IF NOT EXISTS practica_GVE.Proceso_Recuperacion (
  id_proceso_recuperacion INT NOT NULL AUTO_INCREMENT,
  id_ficha_medica INT NOT NULL,
  id_tratamiento INT NOT NULL,
  fecha_inicio DATETIME NOT NULL,
  fecha_fin DATETIME NOT NULL,
  efectividad INT NOT NULL,
  PRIMARY KEY (id_proceso_recuperacion),
  INDEX fk_Proceso_Recuperacion_Ficha_Medica1_idx (id_ficha_medica ASC) VISIBLE,
  INDEX fk_Proceso_Recuperacion_Tratamiento1_idx (id_tratamiento ASC) VISIBLE,
  CONSTRAINT fk_Proceso_Recuperacion_Ficha_Medica1
    FOREIGN KEY (id_ficha_medica)
    REFERENCES practica_GVE.Ficha_Medica (id_ficha_medica)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Proceso_Recuperacion_Tratamiento1
    FOREIGN KEY (id_tratamiento)
    REFERENCES practica_GVE.Tratamiento (id_tratamiento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
