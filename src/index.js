
const express = require('express');// la funcionalidad se guarda en la variable express
const aplicacion= express();// el objeto que retorna la funcion express() se va a guardar dentro de la variable aplicacion

// Settings
aplicacion.set('port', process.env.PORT || 3000);

// Middlewares
aplicacion.use(express.json());

// Routes
aplicacion.use(require('./routes/employees'));

// Starting the server
aplicacion.listen(aplicacion.get('port'), () => {
  console.log(`Server on port ${aplicacion.get('port')}`);
});