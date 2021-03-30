const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 1337;
const app = express();
app.use(bodyParser.json());
//Conexion mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jared_01",
    database: "practica_GVE",
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
app.get("/consulta1", (req, res) => {
    res.send("Consulta 1");
});

app.get("/consulta2", (req, res) => {
    res.send("Consulta 2");
});

app.get("/consulta3", (req, res) => {
    res.send("Consulta 3");
});

app.get("/consulta4", (req, res) => {
    res.send("Consulta 4");
});

app.get("/consulta5", (req, res) => {
    res.send("Consulta 5");
});

app.get("/consulta6", (req, res) => {
    res.send("Consulta 6");
});

app.get("/consulta7", (req, res) => {
    res.send("Consulta 7");
});

app.get("/consulta8", (req, res) => {
    res.send("Consulta 8");
});

app.get("/consulta9", (req, res) => {
    res.send("Consulta 9");
});

app.get("/consulta10", (req, res) => {
    res.send("Consulta 10");
});

app.get("/eliminarTemporal", (req, res) => {
    res.send("eliminarTemporal");
});

app.get("/eliminarModelo", (req, res) => {
    res.send("eliminarModelo");
});

app.get("/cargarTemporal", (req, res) => {
    const csv = require("csv-parser");
    const fs = require("fs");

    const path = "/home/jared/PracticaMIA/PracticaMIA/GRAND_VIRUS_EPICENTER.csv";

    fs.stat(path, (err, stats) => {
        if (err == null) {
            const consulta =
                "USE practica_GVE ;" +
                "DROP TABLE IF EXISTS practica_GVE.Temporal ;" +
                "CREATE TABLE practica_GVE.Temporal (" +
                "id_temporal INT NOT NULL AUTO_INCREMENT," +
                "nombre_victima VARCHAR(45)," +
                "apellido_victima VARCHAR(45)," +
                "direccion_victima VARCHAR(200)," +
                "fecha_primera_sospecha DATETIME," +
                "fecha_confirmacion DATETIME," +
                "fecha_muerte DATETIME," +
                "estado_victima VARCHAR(45)," +
                "nombre_asociado VARCHAR(45)," +
                "apellido_asociado VARCHAR(45)," +
                "fecha_conocido DATETIME," +
                "contacto_fisico VARCHAR(45)," +
                "fecha_inicio_contacto DATETIME," +
                "fecha_fin_contacto DATETIME," +
                "nombre_hospital VARCHAR(200)," +
                "direccion_hospital VARCHAR(200)," +
                "ubicacion_victima VARCHAR(200)," +
                "fecha_llegada DATETIME," +
                "fecha_retiro DATETIME," +
                "tratamiento VARCHAR(200)," +
                "efectividad INT," +
                "fecha_inicio_tratamiento DATETIME," +
                "fecha_fin_tratamiento DATETIME," +
                "efectivida_en_victima INT," +
                "PRIMARY KEY (id_temporal))" +
                "ENGINE = InnoDB;";

            var sql = consulta.split(";");

            //Creamos la tabla temporal
            sql.forEach((comando) => {
                if (comando) {
                    connection.query(comando + ";", (error, result) => {
                        if (error) throw error;
                    });
                }
            });

            fs.createReadStream(path)
                .pipe(csv({ separator: ";" }))
                .on("data", (data) => {
                    if (data.NOMBRE_VICTIMA == "") {
                        data.NOMBRE_VICTIMA = null;
                    } else {
                        data.NOMBRE_VICTIMA = "'" + data.NOMBRE_VICTIMA + "'";
                    }
                    if (data.APELLIDO_VICTIMA == "") {
                        data.APELLIDO_VICTIMA = null;
                    } else {
                        data.APELLIDO_VICTIMA = "'" + data.APELLIDO_VICTIMA + "'";
                    }
                    if (data.DIRECCION_VICTIMA == "") {
                        data.DIRECCION_VICTIMA = null;
                    } else {
                        data.DIRECCION_VICTIMA = "'" + data.DIRECCION_VICTIMA + "'";
                    }
                    if (data.FECHA_PRIMERA_SOSPECHA == "") {
                        data.FECHA_PRIMERA_SOSPECHA = null;
                    } else {
                        data.FECHA_PRIMERA_SOSPECHA =
                            "'" + data.FECHA_PRIMERA_SOSPECHA + "'";
                    }
                    if (data.FECHA_CONFIRMACION == "") {
                        data.FECHA_CONFIRMACION = null;
                    } else {
                        data.FECHA_CONFIRMACION = "'" + data.FECHA_CONFIRMACION + "'";
                    }
                    if (data.FECHA_MUERTE == "") {
                        data.FECHA_MUERTE = null;
                    } else {
                        data.FECHA_MUERTE = "'" + data.FECHA_MUERTE + "'";
                    }
                    if (data.ESTADO_VICTIMA == "") {
                        data.ESTADO_VICTIMA = null;
                    } else {
                        data.ESTADO_VICTIMA = "'" + data.ESTADO_VICTIMA + "'";
                    }
                    if (data.NOMBRE_ASOCIADO == "") {
                        data.NOMBRE_ASOCIADO = null;
                    } else {
                        data.NOMBRE_ASOCIADO = "'" + data.NOMBRE_ASOCIADO + "'";
                    }
                    if (data.APELLIDO_ASOCIADO == "") {
                        data.APELLIDO_ASOCIADO = null;
                    } else {
                        data.APELLIDO_ASOCIADO = "'" + data.APELLIDO_ASOCIADO + "'";
                    }
                    if (data.FECHA_CONOCIO == "") {
                        data.FECHA_CONOCIO = null;
                    } else {
                        data.FECHA_CONOCIO = "'" + data.FECHA_CONOCIO + "'";
                    }
                    if (data.CONTACTO_FISICO == "") {
                        data.CONTACTO_FISICO = null;
                    } else {
                        data.CONTACTO_FISICO = "'" + data.CONTACTO_FISICO + "'";
                    }
                    if (data.FECHA_INICIO_CONTACTO == "") {
                        data.FECHA_INICIO_CONTACTO = null;
                    } else {
                        data.FECHA_INICIO_CONTACTO = "'" + data.FECHA_INICIO_CONTACTO + "'";
                    }
                    if (data.FECHA_FIN_CONTACTO == "") {
                        data.FECHA_FIN_CONTACTO = null;
                    } else {
                        data.FECHA_FIN_CONTACTO = "'" + data.FECHA_FIN_CONTACTO + "'";
                    }
                    if (data.NOMBRE_HOSPITAL == "") {
                        data.NOMBRE_HOSPITAL = null;
                    } else {
                        data.NOMBRE_HOSPITAL = "'" + data.NOMBRE_HOSPITAL + "'";
                    }
                    if (data.DIRECCION_HOSPITAL == "") {
                        data.DIRECCION_HOSPITAL = null;
                    } else {
                        data.DIRECCION_HOSPITAL = "'" + data.DIRECCION_HOSPITAL + "'";
                    }
                    if (data.UBICACION_VICTIMA == "") {
                        data.UBICACION_VICTIMA = null;
                    } else {
                        data.UBICACION_VICTIMA = "'" + data.UBICACION_VICTIMA + "'";
                    }
                    if (data.FECHA_LLEGADA == "") {
                        data.FECHA_LLEGADA = null;
                    } else {
                        data.FECHA_LLEGADA = "'" + data.FECHA_LLEGADA + "'";
                    }
                    if (data.FECHA_RETIRO == "") {
                        data.FECHA_RETIRO = null;
                    } else {
                        data.FECHA_RETIRO = "'" + data.FECHA_RETIRO + "'";
                    }
                    if (data.TRATAMIENTO == "") {
                        data.TRATAMIENTO = null;
                    } else {
                        data.TRATAMIENTO = "'" + data.TRATAMIENTO + "'";
                    }
                    if (data.EFECTIVIDAD == "") {
                        data.EFECTIVIDAD = null;
                    } else {
                        data.EFECTIVIDAD = "'" + data.EFECTIVIDAD + "'";
                    }
                    if (data.FECHA_INICIO_TRATAMIENTO == "") {
                        data.FECHA_INICIO_TRATAMIENTO = null;
                    } else {
                        data.FECHA_INICIO_TRATAMIENTO =
                            "'" + data.FECHA_INICIO_TRATAMIENTO + "'";
                    }
                    if (data.FECHA_FIN_TRATAMIENTO == "") {
                        data.FECHA_FIN_TRATAMIENTO = null;
                    } else {
                        data.FECHA_FIN_TRATAMIENTO = "'" + data.FECHA_FIN_TRATAMIENTO + "'";
                    }
                    if (data.EFECTIVIDAD_EN_VICTIMA == "") {
                        data.EFECTIVIDAD_EN_VICTIMA = null;
                    } else {
                        data.EFECTIVIDAD_EN_VICTIMA =
                            "'" + data.EFECTIVIDAD_EN_VICTIMA + "'";
                    }

                    //Insertamos los datos en la tabla temporal
                    sql =
                        `INSERT INTO Temporal (nombre_victima,apellido_victima,direccion_victima,` +
                        `fecha_primera_sospecha,fecha_confirmacion,fecha_muerte,estado_victima,nombre_asociado,` +
                        `apellido_asociado,fecha_conocido,contacto_fisico,fecha_inicio_contacto,fecha_fin_contacto,` +
                        `nombre_hospital,direccion_hospital,ubicacion_victima,fecha_llegada,fecha_retiro,tratamiento,` +
                        `efectividad,fecha_inicio_tratamiento,fecha_fin_tratamiento,efectivida_en_victima)` +
                        ` VALUES (${data.NOMBRE_VICTIMA}, ${data.APELLIDO_VICTIMA},${data.DIRECCION_VICTIMA},` +
                        `${data.FECHA_PRIMERA_SOSPECHA},${data.FECHA_CONFIRMACION},${data.FECHA_MUERTE},${data.ESTADO_VICTIMA},` +
                        `${data.NOMBRE_ASOCIADO},${data.APELLIDO_ASOCIADO},${data.FECHA_CONOCIO},${data.CONTACTO_FISICO},` +
                        `${data.FECHA_INICIO_CONTACTO},${data.FECHA_FIN_CONTACTO},${data.NOMBRE_HOSPITAL},${data.DIRECCION_HOSPITAL},` +
                        `${data.UBICACION_VICTIMA},${data.FECHA_LLEGADA},${data.FECHA_RETIRO},${data.TRATAMIENTO},${data.EFECTIVIDAD},` +
                        `${data.FECHA_INICIO_TRATAMIENTO},${data.FECHA_FIN_TRATAMIENTO},${data.EFECTIVIDAD_EN_VICTIMA});`;
                    connection.query(sql, (error, result) => {
                        if (error) console.log(error);
                    });
                });
            res.send("Carga de temporal correcta");
        } else {
            res.send("No se pudo encontrar el archivo");
        }
    });
});

app.get("/cargarModelo", (req, res) => {
    let sql = "SELECT * FROM Temporal WHERE id_temporal = 10;"; //Obtenemos el primer resultado
    connection.query(sql + ";", (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            if (result[0].nombre_victima == null) {
                res.send("Sin nombre");
            } else {
                //Buscamos el estatus
                if (result[0].estado_victima != null) {
                    comprobarIdEstatus(result[0].estado_victima);
                    sql = `SELECT id_estatus FROM Estatus WHERE nombre = '${result[0].estado_victima}';`;
                    connection.query(sql, (error, resultadoEstatus) => {
                        let ingresado = 1;
                        if (result[0].nombre_hospital == null) ingresado = 0;
                        let fecha_muerte = null;
                        if (result[0].fecha_muerte != null) {
                            fecha_muerte = result[0].fecha_muerte.toISOString().slice(0, 19).replace("T", " ");
                            fecha_muerte = "'" + fecha_muerte + "'";
                        }
                        //fecha_muerte = fecha_muerte.replace(' GMT-0600 (Central Standard Time)', '')
                        insertarVictima(resultadoEstatus[0].id_estatus, result[0].nombre_victima
                            , result[0].apellido_victima, result[0].direccion, fecha_muerte, ingresado);

                        if (result[0].nombre_hospital != null)
                            comprobarHospital(result[0].nombre_hospital, result[0].direccion_hospital);

                        if (result[0].contacto_fisico != null)
                            comprobarContactoFisico(result[0].contacto_fisico);

                        if (result[0].tratamiento != null)
                            comprobarTratamiento(result[0].tratamiento, result[0].efectividad);

                        if (result[0].nombre_asociado != null) {
                            comprobarAsociado(result[0].nombre_asociado, result[0].apellido_asociado);
                            fecha_conocio = result[0].fecha_conocido.toISOString().slice(0, 19).replace("T", " ");
                            insertarRelacion(
                                result[0].nombre_victima, result[0].apellido_victima,
                                result[0].nombre_asociado, result[0].apellido_asociado,
                                fecha_conocio
                            );
                        }
                        if (result[0].ubicacion_victima != null) {
                            let fl = result[0].fecha_llegada.toISOString().slice(0, 19).replace("T", " ");
                            let fs = result[0].fecha_retiro.toISOString().slice(0, 19).replace("T", " ");
                            insertarLocalizacion(
                                result[0].nombre_victima, result[0].apellido_victima, result[0].ubicacion_victima, fl, fs
                            );
                        }
                    });
                }
            }
            res.json(result);
        }
    });
});

//Comprobar conexion
connection.connect((error) => {
    if (error) throw error;
    console.log("Conexion con la base de datos exitosa");
});
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

function comprobarIdEstatus(nombre) {
    sql = `SELECT id_estatus FROM Estatus WHERE nombre = '${nombre}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql = `INSERT INTO Estatus (nombre) VALUES ('${nombre}');`;
            connection.query(sql, (error) => {
                if (error) throw error;
                comprobarIdEstatus(nombre);
            });
        }
    });
}

function comprobarHospital(nombre, direccion) {
    sql = `SELECT * FROM Hospital WHERE nombre = '${nombre}' AND direccion = '${direccion}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql = `INSERT INTO Hospital (nombre, direccion) VALUES ('${nombre}', '${direccion}');`;
            connection.query(sql, (error) => {
                if (error) throw error;
                comprobarHospital(nombre, direccion);
            });
        }
    });
}

function comprobarContactoFisico(nombre) {
    sql = `SELECT * FROM Tipo_Contacto WHERE nombre = '${nombre}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql = `INSERT INTO Tipo_Contacto (nombre) VALUES ('${nombre}');`;
            connection.query(sql, (error) => {
                if (error) throw error;
                comprobarContactoFisico(nombre);
            });
        }
    });
}

function comprobarTratamiento(nombre, efectividad) {
    sql = `SELECT * FROM Tratamiento WHERE nombre = '${nombre}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql = `INSERT INTO Tratamiento (nombre, efectividad) VALUES ('${nombre}', '${efectividad}');`;
            connection.query(sql, (error) => {
                if (error) throw error;
                comprobarTratamiento(nombre);
            });
        }
    });
}

function comprobarAsociado(nombre, apellido) {
    sql = `SELECT * FROM Asociado WHERE nombre = '${nombre}' AND apellido = '${apellido}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql = `INSERT INTO Asociado (nombre, apellido) VALUES ('${nombre}', '${apellido}');`;
            connection.query(sql, (error) => {
                if (error) throw error;
                comprobarAsociado(nombre, apellido);
            });
        }
    });
}

function insertarLocalizacion(nombre, apellido, direccion, fecha_l, fecha_s) {
    sql = `SELECT * FROM Victima WHERE nombre = '${nombre}' AND apellido = '${apellido}';`;
    connection.query(sql, (error, resultado) => {
        if (error) throw error;
        if (resultado.length > 0) {
            sql =
                `INSERT INTO Localizacion (id_victima, direccion, fecha_llegada, fecha_salida) VALUES(` +
                `${resultado[0].id_victima}, '${direccion}', '${fecha_l}', '${fecha_s}')`;
            connection.query(sql, (error) => {
                if (error) throw error;
            });
        }
    });
}

function insertarVictima(e, n, a, d, f, i) {
    sql = `SELECT * FROM Victima WHERE nombre = '${n}' AND apellido = '${a}';`;
    connection.query(sql, (error, resultadoEstatus) => {
        if (error) throw error;
        if (resultadoEstatus.length > 0) {
            //El Estatus Existe
        } else {
            //El Estatus no existe, hay que crearlo
            sql =
        `INSERT INTO Victima (id_estatus, nombre, apellido, direccion, fecha_muerte, ingresado) VALUES (` +
        `'${e}', '${n}', '${a}','${d}', ${f}, ${i})`;
            connection.query(sql, (error) => {
                if (error) throw error;
                insertarVictima(e, n, a, d, f, i);
            });
        }
    });
}

function insertarRelacion(nv, av, na, aa, fi) {
    sql = `SELECT * FROM Victima WHERE nombre = '${nv}' AND apellido = '${av}';`;
    connection.query(sql, (error, resultado) => {
        if (error) throw error;
        sql = `SELECT id_asociado FROM Asociado WHERE nombre = '${na}' AND apellido = '${aa}';`;
        connection.query(sql, (error, resultado1) => {
            if (error) throw error;
            sql = `INSERT INTO Relacion (id_victima, id_asociado, fecha_inicio) VALUES (`
                + `'${resultado[0].id_victima}', '${resultado1[0].id_asociado}', '${fi}');`;
            connection.query(sql, (error, r3) => {
                if (error) throw error;
            });
        });
    });
}