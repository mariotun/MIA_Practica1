


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
                SELECT * FROM Region ";

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
ruta.get('/cargarTemporal', (req, res) => {

   var consulta=consultass. Get_CargarTemporal();

    mysqlConnection.query(consulta, (err, rows, fields) => { 
        if(!err) {
          res.json(rows);
         
        } else {
          //console.log(err);
          res.send(err)
        }
      });  


});

//********************************************************************************************************************************
ruta.get('/cargarModelo', async function(req, res){

   // var consulta='SELECT * FROM Temporal limit 5;'
   var consulta=consultass. Get_CargarModelo();
         
    mysqlConnection.query(consulta, async function (err, rows, fields){ 
        if(!err) {
          res.json(rows);
          console.log("se cargo el modelo")
         
        } else {
         // console.log(err);
         res.send(err)
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