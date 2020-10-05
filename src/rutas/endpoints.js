


//import { CargarModelo } from "./consultas.js";
//import { CargarTemporal } from "./consultas.js";
//const consultas=new Queryss();
const Queryss = require("./consultas.js");
var consultass = new Queryss();


const express = require('express');//vamos a requerir express y lo guardamos en la constante express.
const ruta = express.Router(); //guardamos el objeto que va a devolver el metodo Router() en la constante ruta.

const mysqlConnection  = require('../conexionDB.js');// aqui exportamos(requerimos) la constante "conexion_mysql" del archivo conexionDB.js
//const Queryss = require("./consultas.js");



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

ruta.get('/totaldatos', (req, res) => {

  var consulta="SELECT count(*) FROM Temporal; \
                \n SELECT count(*) FROM Region;\
                SELECT * FROM Region; SELECT count(*) FROM Compania; SELECT count(*) FROM Categoria; SELECT count(*) FROM Ciudad;";

mysqlConnection.query(consulta, (err, rows, fields) => {
  if(!err) {
    res.json(rows);
   
  } else {
   // console.log(err);
    res.send(err)
  }
});  
});


//********************************************************************************************************************************
ruta.get('/cargarTemporal', async function (req, res) {

   var consulta=consultass. Get_CargarTemporal();

    mysqlConnection.query(consulta, async function (err, rows, fields) { 
        if(!err) {
         // res.json(rows);
         res.send("<h3>Se cargaron los datos ,a la tabla temporal correctamente.</h3>")
         
        } else {
          console.log(err);
          res.send("<h3>Se produjo un error al intentar cargar los datos a la tabla.<h3>")
        }
      });  


});

//********************************************************************************************************************************
ruta.get('/cargarModelo', async function(req, res){

   // var consulta='SELECT * FROM Temporal limit 5;'
   var consulta=consultass. Get_CargarModelo();
         
    mysqlConnection.query(consulta, async function (err, rows){ 
        if(!err) {
          //res.json(rows);
          res.send("<h3>se cargo el modelo ,con los datos de la tabla temporal ,correctamente.<h3>")
         
        } else {
         console.log(err);
         res.send("<h3>Se produjo un error al cargar los datos a las tablas del modelo , pueda que no exista la tabla temporal.<h3>")
        }
      });  
    //  res.end();
});

//********************************************************************************************************************************
ruta.get('/eliminarTemporal', async function  (req, res)  {

  var consulta=consultass.Eliminar_Datos_Temporal();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {
     // res.json(rows);
      res.send("<h3>Se eliminaron todos los datos de la tabla temporal.<h3>")
     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al tratar de eliminar los datos de la tabla temporal \n\
              puede que no exista o que no contenga datos.<h3> ")

    }
  });  

});

//********************************************************************************************************************************
ruta.get('/eliminarModelo',  async function (req, res) {

  var consulta=consultass.Eliminar_Tablas_Model();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {
     // res.json(rows);
      res.send("<h3>Se eliminaron todas las tablas del modelo.<h3>")
     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al tratar de eliminar las tablas del modelo , pueda que no exista ningun modelo creado aun.<h3>")

    }
  }); 


});


//************************************************* CONSULTAS 1 - 10 *************************************************************
ruta.get('/consulta1', async function (req, res) {

  var consulta=consultass.Reporte1();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {
      
      if(rows){
      res.json(rows);
      console.log("Se acaba de realizar la consulta 1.")
    }else{
      res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
    }
     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 1: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")

    }
  });  


});

//********************************************************************************************************************************
ruta.get('/consulta2', async function (req, res) {

  var consulta=consultass.Reporte2();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 2.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }
     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 2: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  });  

});

//********************************************************************************************************************************
ruta.get('/consulta3', async function (req, res) {

  var consulta=consultass.Reporte3();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 3.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 3: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  });  

});

//********************************************************************************************************************************
ruta.get('/consulta4', async function (req, res) {

  var consulta=consultass.Reporte4();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 4.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 4: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  });  

});

//********************************************************************************************************************************
ruta.get('/consulta5', async function (req, res) {

  var consulta=consultass.Reporte5();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 5.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 5: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});

//********************************************************************************************************************************
ruta.get('/consulta6', async function (req, res) {

  var consulta=consultass.Reporte6();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 6.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }
     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 6: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});

//********************************************************************************************************************************
ruta.get('/consulta7', async function (req, res)  {

  var consulta=consultass.Reporte7();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 7.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 7: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});

//********************************************************************************************************************************
ruta.get('/consulta8', async function (req, res)  {

  var consulta=consultass.Reporte8();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 8.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 8: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});

//********************************************************************************************************************************
ruta.get('/consulta9', async function (req, res) {

  var consulta=consultass.Reporte9();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 9.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 9: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});

//********************************************************************************************************************************
ruta.get('/consulta10', async function (req, res) {

  var consulta=consultass.Reporte10();

  mysqlConnection.query(consulta, async function (err, rows){ 
    if(!err) {

      if(rows){
        res.json(rows);
        console.log("Se acaba de realizar la consulta 10.")
      }else{
        res.send("<h3>Error , No hay datos cargados dentro del modelo<h3>")
      }

     
    } else {
     console.log(err);
     res.send("<h3>Se produjo un error al hacer la consulta 10: \n \
                 1.- Revise si la direccion es la correcta.\
                 2.- Puede que no haya datos cargados aun.<h3>")
    }
  }); 

});









module.exports = ruta;// aqui se va a exportar la constate ruta, porque se va a utilizar en otros archivos del proyecto.