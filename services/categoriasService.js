const fs = require('fs');
const path = require('path');
const ruta = path.join(__dirname, '../data/categorias.json');
function leer() {
const data = fs.readFileSync(ruta, 'utf-8');
return JSON.parse(data);
}
function guardar(datos) {
fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}
exports.listar = () => leer();
exports.buscarPorId = (id) => leer().find(p => p.id === id);
exports.crear = (nuevo) => {
const datos = leer();
nuevo.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
datos.push(nuevo);
guardar(datos);
return nuevo;
};
exports.actualizar = (id, cambios) => {
const datos = leer();
const index = datos.findIndex(p => p.id === id);
if (index === -1) return null;
datos[index] = { ...datos[index], ...cambios };
guardar(datos);
return datos[index];
};
exports.eliminar = (id) => {
const datos = leer();
const index = datos.findIndex(p => p.id === id);
if (index === -1) return null;
const eliminado = datos.splice(index, 1);
guardar(datos);
return eliminado[0];
};