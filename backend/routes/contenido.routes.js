const express = require('express');
const router = express.Router();
const { 
  obtenerContenidos, 
  crearContenido, 
  buscarContenidos 
} = require('../controllers/contenido.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', obtenerContenidos);
router.get('/buscar', buscarContenidos);
router.post('/', protect, authorize('admin'), crearContenido);

module.exports = router;