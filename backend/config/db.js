const mysql = require('mysql2');

// Crear el pool de conexiones apuntando a tu base de datos local
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'admin_barbertech',
    password: '2026Segura_Cont',
    database: 'barbertech_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool configurado con soporte para promesas (async/await)
module.exports = pool.promise();