const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables directamente desde el .env de la carpeta backend

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'admin_barbertech',
    password: '2026Segura_Cont',
    database: 'barbertech_db'
});

// Buenas prácticas: Asegurar codificación universal en cada consulta
pool.on('connection', (connection) => {
    connection.query("SET NAMES utf8mb4");
});

module.exports = pool.promise();