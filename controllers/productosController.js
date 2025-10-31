const productosService = require('../services/productosService');
exports.obtenerTodos = (req, res) => {
const productos = productosService.listar();
res.json(productos);
};
exports.obtenerPorId = (req, res) => {
const producto = productosService.buscarPorId(parseInt(req.params.id));
producto ? res.json(producto) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = productosService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = productosService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = productosService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};