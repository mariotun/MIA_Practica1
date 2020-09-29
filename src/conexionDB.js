
const mysql = require('mysql');//requerimos el modulo mysql y lo guardamos en la constante mysql

const conexion_mysql = mysql.createConnection({//en la constante conexion_mysql guardamos todos los atributos que se necesitan para la conexion.
  host: '127.0.0.1',
  user: 'root',
  password: 'archivos123',
  database: 'practica1',
  multipleStatements: true
});

conexion_mysql.connect(function (err) {//ralizamos la conexion con la base de datos mysql
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('La base de datos y la aplicacion se conectaron exitosamente.');
  }
});

module.exports = conexion_mysql;//exportamos la constante conexion_mysql ya que sera utilizado en otros archivos dentro del proyecto.