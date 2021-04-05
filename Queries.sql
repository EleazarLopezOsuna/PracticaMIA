--Primer Consulta
SELECT Hospital.nombre, Hospital.direccion, COUNT(Victima.nombre) AS Cantidad_Muertos FROM Victima, Ficha_Medica, Hospital WHERE (Victima.fecha_muerte IS NOT NULL OR Victima.estatus = 'Muerte') AND Victima.id_victima = Ficha_Medica.id_victima AND Hospital.id_hospital = Ficha_Medica.id_hospital GROUP BY Hospital.nombre, Hospital.direccion;
--Segunda Consulta
SELECT Victima.nombre, Victima.apellido, Proceso_Recuperacion.efectividad FROM Victima, Ficha_Medica, Proceso_Recuperacion WHERE Victima.estatus = 'En cuarentena' AND Proceso_Recuperacion.id_ficha_medica = Ficha_Medica.id_ficha_medica AND Ficha_Medica.id_victima = Victima.id_victima AND Victima.estatus = 'En cuarentena' AND Proceso_Recuperacion.id_tratamiento = 2 AND Proceso_Recuperacion.efectividad >= 5;
--Tercer Consulta
SELECT Victima.nombre, Victima.apellido, Victima.direccion FROM Victima, Relacion, Asociado WHERE (Victima.fecha_muerte IS NOT NULL OR Victima.estatus = 'Muerte') AND Victima.id_victima = Relacion.id_victima AND Asociado.id_asociado = Relacion.id_asociado GROUP BY Victima.nombre, Victima.apellido, Victima.direccion HAVING COUNT(Relacion.id_victima) > 3;
--Cuarta Consulta
SELECT Victima.nombre, Victima.apellido FROM Victima, Contacto, Tipo_Contacto, Asociado, Relacion WHERE Victima.estatus = 'Suspendida' AND Victima.id_victima = Relacion.id_victima AND Asociado.id_asociado = Relacion.id_asociado AND Contacto.id_Relacion = Relacion.id_relacion AND Contacto.id_tipo_contacto = Tipo_Contacto.id_tipo_contacto AND Tipo_Contacto.nombre = 'Beso' GROUP BY Victima.nombre, Victima.apellido HAVING COUNT(Contacto.id_relacion) > 2;
--Quinta Consulta
SELECT Victima.nombre, Victima.apellido, COUNT(Proceso_Recuperacion.id_ficha_medica) AS Cantidad_Tratamiento FROM Victima, Ficha_Medica, Proceso_Recuperacion, Tratamiento WHERE Victima.id_victima = Ficha_Medica.id_victima AND Ficha_Medica.id_ficha_medica = Proceso_Recuperacion.id_ficha_medica AND Tratamiento.id_tratamiento = Proceso_Recuperacion.id_tratamiento AND Tratamiento.nombre = 'Oxigeno' GROUP BY Victima.nombre, Victima.apellido ORDER BY COUNT(Proceso_Recuperacion.id_ficha_medica) DESC LIMIT 5;
--Sexta Consulta
SELECT Victima.nombre, Victima.apellido, Victima.fecha_muerte FROM Victima, Localizacion, Ficha_Medica, Proceso_Recuperacion, Tratamiento WHERE (Victima.fecha_muerte IS NOT NULL OR Victima.estatus = 'Muerte') AND Localizacion.id_victima = Victima.id_victima AND Localizacion.direccion = '1987 Delphine Well' AND Victima.id_victima = Ficha_Medica.id_victima AND Ficha_Medica.id_ficha_medica = Proceso_Recuperacion.id_ficha_medica AND Tratamiento.id_tratamiento = Proceso_Recuperacion.id_tratamiento AND Tratamiento.nombre = 'Manejo de la presion arterial';
--Septima Consulta
SELECT Victima.nombre, Victima.apellido, Victima.direccion FROM Victima, Ficha_Medica, Proceso_Recuperacion WHERE Victima.id_victima = Ficha_Medica.id_victima AND Ficha_Medica.id_ficha_medica = Proceso_Recuperacion.id_ficha_medica AND Victima.id_victima IN (SELECT Victima.id_victima FROM Victima, Relacion WHERE Victima.id_victima = Relacion.id_victima GROUP BY Victima.id_victima HAVING COUNT(Relacion.id_victima) < 2) GROUP BY Victima.nombre, Victima.apellido, Victima.direccion HAVING COUNT(Proceso_Recuperacion.id_tratamiento) = 2;
--Octava Consulta
(SELECT EXTRACT(MONTH FROM Ficha_Medica.fecha_sospecha) AS Mes, Victima.nombre, Victima.apellido, COUNT(Proceso_Recuperacion.id_ficha_medica) AS Tratamientos FROM Victima, Ficha_Medica, Proceso_Recuperacion WHERE Victima.id_victima = Ficha_Medica.id_victima AND Ficha_Medica.id_ficha_medica = Proceso_Recuperacion.id_ficha_medica GROUP BY Ficha_Medica.fecha_sospecha, Victima.nombre, Victima.apellido ORDER BY COUNT(Proceso_Recuperacion.id_ficha_medica) DESC LIMIT 3)
UNION 
(SELECT EXTRACT(MONTH FROM Ficha_Medica.fecha_sospecha) AS Mes, Victima.nombre, Victima.apellido, COUNT(Proceso_Recuperacion.id_ficha_medica) AS Tratamientos FROM Victima, Ficha_Medica, Proceso_Recuperacion WHERE Victima.id_victima = Ficha_Medica.id_victima AND Ficha_Medica.id_ficha_medica = Proceso_Recuperacion.id_ficha_medica GROUP BY Ficha_Medica.fecha_sospecha, Victima.nombre, Victima.apellido ORDER BY COUNT(Proceso_Recuperacion.id_ficha_medica) ASC LIMIT 3);
--Novena Consulta
/*
	(n*100/N)
	n = COUNT(Victima.id_victima)
	N = SELECT COUNT(*) FROM Victima WHERE ingresado = 1

	341 Victimas se registraron en hospital
*/
SELECT Hospital.nombre, (COUNT(Victima.id_victima)*100/(SELECT COUNT(*) FROM Victima WHERE ingresado = 1)) AS Porcentaje_Victimas FROM Victima, Ficha_Medica, Hospital WHERE Victima.id_victima = Ficha_Medica.id_victima AND Hospital.id_hospital = Ficha_Medica.id_hospital GROUP BY Hospital.nombre;
--Decime Consulta parcial
SELECT Hospital.nombre AS Hospital, Tipo_Contacto.nombre AS Contacto, COUNT(Tipo_Contacto.nombre) AS Numero FROM Tipo_Contacto, Victima, Contacto, Relacion, Hospital, Ficha_Medica WHERE Victima.id_victima = Relacion.id_victima AND Relacion.id_relacion = Contacto.id_relacion AND Contacto.id_tipo_contacto = Tipo_Contacto.id_tipo_contacto AND Victima.id_victima = Ficha_Medica.id_victima AND Hospital.id_hospital = Ficha_Medica.id_hospital GROUP BY Hospital.nombre, Tipo_Contacto.nombre ORDER BY Hospital.nombre, Numero DESC;