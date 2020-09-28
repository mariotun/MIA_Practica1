const express = require('express');// la funcionalidad se guarda en la variable express
const aplicacion= express();// el objeto que retorna la funcion express() se va a guardar dentro de la variable aplicacion


// configuraciones
aplicacion.set('puerto', process.env.PORT || 3000);//inicializamos la variable aplicacion utilizando un metodo o funcion al cual va a escuchar o mandar un puerto.


// Middlewares(funciones que se ejecutan antes de que se procese otra cosa)
aplicacion.use(express.json());/* ya que va a ser una apirest , con esto el servidor y las aplicacione cliente
                                van a enviar datos el formato json.*/


//Routes(url) para procesar,recibir o guardar datos ,forma de comunicacion con el servidor y el navegador.
aplicacion.use(require('./rutas/ruta_reporte'));

// Starting the server
aplicacion.listen(aplicacion.get('puerto'), () => {
  console.log(`Servidor en el puerto ${aplicacion.get('puerto')}`);
});