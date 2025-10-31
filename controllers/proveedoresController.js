const proveedoresController = require('../services/proveedoresService');
exports.obtenerTodos = (req, res) => {
const proveedores = proveedoresService.listar();
res.json(proveedores);
};
exports.obtenerPorId = (req, res) => {
const proveedor = proveedoresService.buscarPorId(parseInt(req.params.id));
proveedor ? res.json(proveedor) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = proveedoresService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = proveedoresService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = proveedoresService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};