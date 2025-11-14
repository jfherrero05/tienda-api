// initData.js
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data'); // Ruta a la carpeta /data
const requiredFiles = [
    'productos.json', 
    'categorias.json', 
    'clientes.json', 
    'pedidos.json', 
    'carritos.json', 
    'proveedores.json',
    'api-calls.log.json' // Incluimos el archivo de log para la Mejora 1
];

module.exports = function initData() {
    // 1. Crear la carpeta /data si no existe
    if (!fs.existsSync(dataDir)) {
        console.log('Creando directorio /data...');
        fs.mkdirSync(dataDir);
    }

    // 2. Crear los archivos JSON vacíos si no existen
    requiredFiles.forEach(fileName => {
        const filePath = path.join(dataDir, fileName);
        if (!fs.existsSync(filePath)) {
            console.log(`Creando archivo: ${fileName}`);
            // El log de llamadas es un JSON que empieza con un array vacío []
            fs.writeFileSync(filePath, '[]', 'utf-8'); 
        }
    });
}