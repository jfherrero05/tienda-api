const express = require('express');
const app = express();
app.use(express.json());
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