const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables directamente desde el .env de la carpeta backend

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Buenas prácticas: Asegurar codificación universal en cada consulta
pool.on('connection', (connection) => {
    connection.query("SET NAMES utf8mb4");
});

module.exports = pool.promise();