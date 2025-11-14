// server.js (Copia y pega TODO esto, reemplazando el archivo original)
const express = require('express');
const fs = require('fs'); // <--- AÑADIDO
const path = require('path'); // <--- AÑADIDO
const initData = require('./tienda-api/initData'); // <--- AÑADIDO
const app = express();

// 1. Ejecutar script de inicialización
initData(); // <--- AÑADIDO

app.use(express.json());

// 2. Middleware de Logging
const logPath = path.join(__dirname, 'data/api-calls.log.json'); // Usamos /data para el log
app.use((req, res, next) => {
    // Mostrar en consola (Requisito)
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Guardar en log JSON (Mejora solicitada)
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        ip: req.ip
    };

    try {
        let logs = [];
        if (fs.existsSync(logPath)) {
            const data = fs.readFileSync(logPath, 'utf-8');
            logs = JSON.parse(data);
        }
        
        logs.push(logEntry);
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error al escribir el log:', error.message);
    }
    
    next();
});

// Importar rutas
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/categorias',require('./routes/categoriasRoutes'));
app.use('/api/carritos',require('./routes/carritosRoutes'));
app.use('/api/clientes',require('./routes/clientesRoutes'));
app.use('/api/pedidos',require('./routes/pedidosRoutes'));
app.use('/api/proveedores',require('./routes/proveedoresRoutes'));
//definir el resto de routes
//Mejora solicitada, guardar en un log de json todas las llamadas a la API
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));