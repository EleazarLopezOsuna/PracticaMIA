DELIMITER //
CREATE PROCEDURE `EliminarModelo`()
BEGIN
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
END //
DELIMITER ;
