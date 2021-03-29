const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1337;
const app = express();
app.use(bodyParser.json());
//Conexion mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jared_01',
    database: 'practica_GVE'
});

//Rutas
/*
    consulta1. Mostrar Hospitales (nombre, direccion, numero de fallecidos)

    consulta2. Mostrar Victimas (nombre, apellido) en Cuarentena y con 
                Transfucion de Sangre con efectividad > 5

    consulta3. Mostrar Victimas fallecidas (nombre, apellido, direccion) con
                mas de 3 asociados

    consulta4. Mostrar Victimas (nombre, apellido) con estado Suspendida 
                contacto Beso con mas de 2 asociados

    consulta5. Mostrar Top 5 Victimas (nombre, apellido) con mayor aplicacion 
                de Oxigeno

    consulta6. Mostrar Victimas fallecidas (nombre, apellido, fecha fallecimiento) 
                que visitaron 1987 Delphine Well con Manejo de Presion Arterial

    consulta7. Mostrar Victimas (nombre, apellido, direccion) menos de 2 asociados 
                que estuvieron en Hospital con 2 tratamientos

    consulta8. Mostrar Victimas (nombre, apellido, numero mes de sospecha) con mas 
                tratamientos y menos tratamientos

    consulta9. Mostrar Hospital (nombre, porcentaje de victimas)

    consulta10. Mostrar Hospital (nombre, contacto, porcentaje de contacto fisico)

    eliminarTemporal. Eliminar la tabla temporal
    eliminarModelo. Eliminar todo el modelo de la base de datos
    cargaTemporal. Carga masiva de datos en la tabla temporal
    cargaModelo. Creacion y carga al modelo
 */
app.get('/consulta1', (req, res) => {
    res.send('Consulta 1');
});

app.get('/consulta2', (req, res) => {
    res.send('Consulta 2');
});

app.get('/consulta3', (req, res) => {
    res.send('Consulta 3');
});

app.get('/consulta4', (req, res) => {
    res.send('Consulta 4');
});

app.get('/consulta5', (req, res) => {
    res.send('Consulta 5');
});

app.get('/consulta6', (req, res) => {
    res.send('Consulta 6');
});

app.get('/consulta7', (req, res) => {
    res.send('Consulta 7');
});

app.get('/consulta8', (req, res) => {
    res.send('Consulta 8');
});

app.get('/consulta9', (req, res) => {
    res.send('Consulta 9');
});

app.get('/consulta10', (req, res) => {
    res.send('Consulta 10');
});

app.get('/eliminarTemporal', (req, res) => {
    res.send('eliminarTemporal');
});

app.get('/eliminarModelo', (req, res) => {
    res.send('eliminarModelo');
});

app.get('/cargarTemporal', (req, res) => {
    const csv = require('csv-parser');
    const fs = require('fs');

    const path = '/home/jared/PracticaMIA/PracticaMIA/GRAND_VIRUS_EPICENTER.csv';

    fs.stat(path, (err, stats) => {
        if(err == null){
            const consulta = 'USE practica_GVE ;' +
                'DROP TABLE IF EXISTS practica_GVE.Temporal ;' +
                'CREATE TABLE practica_GVE.Temporal (' +
                'id_temporal INT NOT NULL AUTO_INCREMENT,' +
                'nombre_victima VARCHAR(45),' +
                'apellido_victima VARCHAR(45),' +
                'direccion_victima VARCHAR(200),' +
                'fecha_primera_sospecha DATETIME,' +
                'fecha_confirmacion DATETIME,' +
                'fecha_muerte DATETIME,' +
                'estado_victima VARCHAR(45),' +
                'nombre_asociado VARCHAR(45),' +
                'apellido_asociado VARCHAR(45),' +
                'fecha_conocido DATETIME,' +
                'contacto_fisico VARCHAR(45),' +
                'fecha_inicio_contacto DATETIME,' +
                'fecha_fin_contacto DATETIME,' +
                'nombre_hospital VARCHAR(200),' +
                'direccion_hospital VARCHAR(200),' +
                'ubicacion_victima VARCHAR(200),' +
                'fecha_llegada DATETIME,' +
                'fecha_retiro DATETIME,' +
                'tratamiento VARCHAR(200),' +
                'efectividad INT,' +
                'fecha_inicio_tratamiento DATETIME,' +
                'fecha_fin_tratamiento DATETIME,' +
                'efectivida_en_victima INT,' +
                'PRIMARY KEY (id_temporal))' +
                'ENGINE = InnoDB;';

            var sql = consulta.split(';');

            //Creamos la tabla temporal
            sql.forEach(comando => {
                if (comando){
                    connection.query(comando + ';', (error, result) => {
                        if (error) throw error;
                    });
                }
            });

            fs.createReadStream(path)
                .pipe(csv({ separator: ';' }))
                .on('data', (data) => {
                    if (data.NOMBRE_VICTIMA == ''){
                        data.NOMBRE_VICTIMA = null;
                    }else{
                        data.NOMBRE_VICTIMA = '\'' + data.NOMBRE_VICTIMA + '\'';
                    }
                    if (data.APELLIDO_VICTIMA == ''){
                        data.APELLIDO_VICTIMA = null;
                    }else{
                        data.APELLIDO_VICTIMA = '\'' + data.APELLIDO_VICTIMA + '\'';
                    }
                    if (data.DIRECCION_VICTIMA == ''){
                        data.DIRECCION_VICTIMA = null;
                    }else{
                        data.DIRECCION_VICTIMA = '\'' + data.DIRECCION_VICTIMA + '\'';
                    }
                    if (data.FECHA_PRIMERA_SOSPECHA == ''){
                        data.FECHA_PRIMERA_SOSPECHA = null;
                    }else{
                        data.FECHA_PRIMERA_SOSPECHA = '\'' + data.FECHA_PRIMERA_SOSPECHA + '\'';
                    }
                    if (data.FECHA_CONFIRMACION == ''){
                        data.FECHA_CONFIRMACION = null;
                    }else{
                        data.FECHA_CONFIRMACION = '\'' + data.FECHA_CONFIRMACION + '\'';
                    }
                    if (data.FECHA_MUERTE == ''){
                        data.FECHA_MUERTE = null;
                    }else{
                        data.FECHA_MUERTE = '\'' + data.FECHA_MUERTE + '\'';
                    }
                    if (data.ESTADO_VICTIMA == ''){
                        data.ESTADO_VICTIMA = null;
                    }else{
                        data.ESTADO_VICTIMA = '\'' + data.ESTADO_VICTIMA + '\'';
                    }
                    if (data.NOMBRE_ASOCIADO == ''){
                        data.NOMBRE_ASOCIADO = null;
                    }else{
                        data.NOMBRE_ASOCIADO = '\'' + data.NOMBRE_ASOCIADO + '\'';
                    }
                    if (data.APELLIDO_ASOCIADO == ''){
                        data.APELLIDO_ASOCIADO = null;
                    }else{
                        data.APELLIDO_ASOCIADO = '\'' + data.APELLIDO_ASOCIADO + '\'';
                    }
                    if (data.FECHA_CONOCIO == ''){
                        data.FECHA_CONOCIO = null;
                    }else{
                        data.FECHA_CONOCIO = '\'' + data.FECHA_CONOCIO + '\'';
                    }
                    if (data.CONTACTO_FISICO == ''){
                        data.CONTACTO_FISICO = null;
                    }else{
                        data.CONTACTO_FISICO = '\'' + data.CONTACTO_FISICO + '\'';
                    }
                    if (data.FECHA_INICIO_CONTACTO == ''){
                        data.FECHA_INICIO_CONTACTO = null;
                    }else{
                        data.FECHA_INICIO_CONTACTO = '\'' + data.FECHA_INICIO_CONTACTO + '\'';
                    }
                    if (data.FECHA_FIN_CONTACTO == ''){
                        data.FECHA_FIN_CONTACTO = null;
                    }else{
                        data.FECHA_FIN_CONTACTO = '\'' + data.FECHA_FIN_CONTACTO + '\'';
                    }
                    if (data.NOMBRE_HOSPITAL == ''){
                        data.NOMBRE_HOSPITAL = null;
                    }else{
                        data.NOMBRE_HOSPITAL = '\'' + data.NOMBRE_HOSPITAL + '\'';
                    }
                    if (data.DIRECCION_HOSPITAL == ''){
                        data.DIRECCION_HOSPITAL = null;
                    }else{
                        data.DIRECCION_HOSPITAL = '\'' + data.DIRECCION_HOSPITAL + '\'';
                    }
                    if (data.UBICACION_VICTIMA == ''){
                        data.UBICACION_VICTIMA = null;
                    }else{
                        data.UBICACION_VICTIMA = '\'' + data.UBICACION_VICTIMA + '\'';
                    }
                    if (data.FECHA_LLEGADA == ''){
                        data.FECHA_LLEGADA = null;
                    }else{
                        data.FECHA_LLEGADA = '\'' + data.FECHA_LLEGADA + '\'';
                    }
                    if (data.FECHA_RETIRO == ''){
                        data.FECHA_RETIRO = null;
                    }else{
                        data.FECHA_RETIRO = '\'' + data.FECHA_RETIRO + '\'';
                    }
                    if (data.TRATAMIENTO == ''){
                        data.TRATAMIENTO = null;
                    }else{
                        data.TRATAMIENTO = '\'' + data.TRATAMIENTO + '\'';
                    }
                    if (data.EFECTIVIDAD == ''){
                        data.EFECTIVIDAD = null;
                    }else{
                        data.EFECTIVIDAD = '\'' + data.EFECTIVIDAD + '\'';
                    }
                    if (data.FECHA_INICIO_TRATAMIENTO == ''){
                        data.FECHA_INICIO_TRATAMIENTO = null;
                    }else{
                        data.FECHA_INICIO_TRATAMIENTO = '\'' + data.FECHA_INICIO_TRATAMIENTO + '\'';
                    }
                    if (data.FECHA_FIN_TRATAMIENTO == ''){
                        data.FECHA_FIN_TRATAMIENTO = null;
                    }else{
                        data.FECHA_FIN_TRATAMIENTO = '\'' + data.FECHA_FIN_TRATAMIENTO + '\'';
                    }
                    if (data.EFECTIVIDAD_EN_VICTIMA == ''){
                        data.EFECTIVIDAD_EN_VICTIMA = null;
                    }else{
                        data.EFECTIVIDAD_EN_VICTIMA = '\'' + data.EFECTIVIDAD_EN_VICTIMA + '\'';
                    }
                    
                    //Insertamos los datos en la tabla temporal
                    sql = `INSERT INTO Temporal (nombre_victima,apellido_victima,direccion_victima,`+
                    `fecha_primera_sospecha,fecha_confirmacion,fecha_muerte,estado_victima,nombre_asociado,`+
                    `apellido_asociado,fecha_conocido,contacto_fisico,fecha_inicio_contacto,fecha_fin_contacto,`+
                    `nombre_hospital,direccion_hospital,ubicacion_victima,fecha_llegada,fecha_retiro,tratamiento,`+
                    `efectividad,fecha_inicio_tratamiento,fecha_fin_tratamiento,efectivida_en_victima)`+
                    ` VALUES (${data.NOMBRE_VICTIMA}, ${data.APELLIDO_VICTIMA},${data.DIRECCION_VICTIMA},`+
                    `${data.FECHA_PRIMERA_SOSPECHA},${data.FECHA_CONFIRMACION},${data.FECHA_MUERTE},${data.ESTADO_VICTIMA},`+
                    `${data.NOMBRE_ASOCIADO},${data.APELLIDO_ASOCIADO},${data.FECHA_CONOCIO},${data.CONTACTO_FISICO},`+
                    `${data.FECHA_INICIO_CONTACTO},${data.FECHA_FIN_CONTACTO},${data.NOMBRE_HOSPITAL},${data.DIRECCION_HOSPITAL},`+
                    `${data.UBICACION_VICTIMA},${data.FECHA_LLEGADA},${data.FECHA_RETIRO},${data.TRATAMIENTO},${data.EFECTIVIDAD},`+
                    `${data.FECHA_INICIO_TRATAMIENTO},${data.FECHA_FIN_TRATAMIENTO},${data.EFECTIVIDAD_EN_VICTIMA});`;
                    connection.query(sql, (error, result) => {
                        if (error) console.log(error);
                    });
                }
            );
            res.send('Carga de temporal correcta');
        }else{
            res.send('No se pudo encontrar el archivo');
        }
    });
});

app.get('/cargarModelo', (req, res) => {
    res.send('cargarModelo');
});

//Comprobar conexion
connection.connect(error => {
    if (error) throw error;
    console.log('Conexion con la base de datos exitosa');
});
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));