const express = require('express');
const fs = require('fs');
const path = require('path'); 
const initData = require('./tienda-api/initData'); 
const app = express();

app.use(express.json());

// Validar entradas de POST 
app.post('*', (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensaje: 'El cuerpo de la petición no puede estar vacío' });
    }
    next(); 
});

/* Crear un script de inicialización que genere automáticamente los JSON vacíos si
no existen */
initData(); 

// Middleware de logging 
const logPath = path.join(__dirname, 'data/api-calls.log.json'); // Archivo de logs
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
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

//Rutas 
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/carritos', require('./routes/carritosRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));
app.use('/api/proveedores', require('./routes/proveedoresRoutes'));
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));