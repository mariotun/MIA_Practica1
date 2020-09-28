
const mysql = require('mysql');

const conexion_mysq = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'archivos123',
  database: 'company',
  multipleStatements: true
});

conexion_mysq.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('La base de datos y la aplicacion se conectaron exitosamente.');
  }
});

module.exports = conexion_mysq;