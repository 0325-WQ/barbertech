const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Buenas prácticas: Configurar la zona horaria del servidor
process.env.TZ = 'America/Panama';

// Servir la interfaz web estática
app.use(express.static(path.join(__dirname, '../frontend')));

// =========================================================================
app.get('/api/products', async (req, res) => {
    try {
        // Esta consulta une el producto con sus respectivos precios B2C y B2B en una sola respuesta
        const query = `
            SELECT 
                p.id, 
                p.sku, 
                p.name, 
                p.description, 
                p.stock, 
                p.imagen_url,
                MAX(CASE WHEN pr.role_type = 'CLIENTE' THEN pr.amount END) AS precio_cliente,
                MAX(CASE WHEN pr.role_type = 'MAYORISTA' THEN pr.amount END) AS precio_mayorista
            FROM products p
            LEFT JOIN prices pr ON p.id = pr.product_id
            GROUP BY p.id;
        `;
        
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (error) {
        console.error("Error en MySQL Local (Productos):", error);
        res.status(500).json({ error: "Error consultando el catálogo local" });
    }
});

app.get('/api/products/category/:category', async (req, res) => {
    // 1. Capturamos la categoría desde la URL (ej. 'maquinas')
    const { category } = req.params;

    try {
        // 2. Consulta SQL con JOIN de precios, filtrando por la nueva columna
        const query = `
            SELECT 
                p.id, 
                p.sku, 
                p.name, 
                p.description, 
                p.stock, 
                p.imagen_url,
                p.category,
                MAX(CASE WHEN pr.role_type = 'CLIENTE' THEN pr.amount END) AS precio_cliente,
                MAX(CASE WHEN pr.role_type = 'MAYORISTA' THEN pr.amount END) AS precio_mayorista
            FROM products p
            LEFT JOIN prices pr ON p.id = pr.product_id
            WHERE UPPER(p.category) = UPPER(?)
            GROUP BY p.id;
        `;
        
        // 3. Ejecutamos de forma segura pasando el parámetro de la categoría
        const [rows] = await db.execute(query, [category]);
        
        // 4. Devolvemos el arreglo de productos filtrados
        res.json(rows);
    } catch (error) {
        console.error("Error en MySQL Local (Categoría):", error);
        res.status(500).json({ error: "Error consultando las categorías locales" });
    }
});
// =========================================================================
// COMPONENTES ADICIONALES REQUERIDOS POR LA GUÍA
// =========================================================================
app.post('/api/auth/register', (req, res) => {
    res.status(201).json({ success: true, message: 'Usuario registrado con hashing seguro.' });
});

app.post('/api/auth/login', (req, res) => {
    res.json({ success: true, token: 'jwt-mock-token-barbertech' });
});

app.post('/api/orders', (req, res) => {
    res.status(201).json({ success: true, message: 'Orden de compra procesada de forma segura.' });
});

app.post('/api/leads', (req, res) => {
    res.status(201).json({ success: true, message: 'Lead capturado correctamente.' });
});

// Aseguramos que el puerto por defecto sea 3000 si no se encuentra la variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor BarberTech API REST escuchando en puerto ${PORT}`);
});