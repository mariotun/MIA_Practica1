

const express = require('express');//vamos a requerir express y lo guardamos en la constante express.
const ruta = express.Router(); //guardamos el objeto que va a devolver el metodo Router() en la constante ruta.

const mysqlConnection  = require('../conexionDB.js');// aqui exportamos(requerimos) la constante "conexion_mysql" del archivo conexionDB.js


ruta.get('/', (req, res) => {

    var consulta='SELECT * FROM ejemplo'

  mysqlConnection.query(consulta, (err, rows, fields) => {
    if(!err) {
      res.json(rows);
     
    } else {
      console.log(err);
    }
  });  
});


//********************************************************************************************************************************
ruta.get('/cargarTemporal', (req, res) => {

    var consulta=" USE practica1;\
    Create temporary table Temporal(\
    nombre_compania varchar(50) not null,\
    contacto_compania varchar(50) not null,\
    correo_compania varchar(50) not null,\
    telefono_compania varchar(15) not null,\
    tipo char(1) not null,\
    nombre varchar(50) not null,\
    correo varchar(50) not null,\
    telefono varchar(15) not null,\
    fecha_registro date not null,\
    direccion varchar(50) not null,\
    ciudad varchar(50) not null,\
    codigo_postal int,\
    region varchar(50),\
    producto varchar(50),\
    categoria_producto varchar(50),\
    cantidad int not null,\
    precio_unitario decimal(3) not null\
    );\
     LOAD DATA LOCAL INFILE '/home/DataCenterData.csv'\
    INTO TABLE Temporal \
    CHARACTER SET latin1 \
    FIELDS TERMINATED BY  ';' \
    LINES TERMINATED BY '\r\n' \
    IGNORE 1 LINES \
    (nombre_compania, contacto_compania, correo_compania, telefono_compania, tipo, nombre, correo, telefono, @var_fecha, direccion, ciudad, codigo_postal, region, producto, categoria_producto, cantidad, precio_unitario) \
    SET fecha_registro = STR_TO_DATE(@var_fecha, '%d/%m/%Y');";

    mysqlConnection.query(consulta, (err, rows, fields) => { 
        if(!err) {
          res.json(rows);
         
        } else {
          console.log(err);
        }
      });  


});

//********************************************************************************************************************************
ruta.get('/cargarModelo', (req, res) => {

    var consulta='SELECT * FROM Temporal limit 5;'
    
    mysqlConnection.query(consulta, (err, rows, fields) => { 
        if(!err) {
          res.json(rows);
         
        } else {
          console.log(err);
        }
      });  

});

//********************************************************************************************************************************
ruta.get('/eliminarTemporal', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/eliminarModelo', (req, res) => {


});


//************************************************* CONSULTAS 1 - 10 *************************************************************
ruta.get('/consulta1', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta2', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta3', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta4', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta5', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta6', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta7', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta8', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta9', (req, res) => {

});

//********************************************************************************************************************************
ruta.get('/consulta10', (req, res) => {

});









module.exports = ruta;// aqui se va a exportar la constate ruta, porque se va a utilizar en otros archivos del proyecto.