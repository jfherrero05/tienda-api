const express = require('express');
const router = express.Router();
const categoriasControllers = require('../controllers/categoriasController');
router.get('/', categoriasControllers.obtenerTodos);
router.get('/:id', categoriasControllers.obtenerPorId);
router.post('/', categoriasControllers.crear);
router.put('/:id', categoriasControllers.actualizar);
router.delete('/:id', categoriasControllers.eliminar);
module.exports = router;