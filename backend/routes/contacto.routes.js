const express = require('express');
const router = express.Router();
const { crearContacto, obtenerContactos } = require('../controllers/contacto.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Ruta pública - NO requiere autenticación
router.post('/', crearContacto);

// Ruta privada - requiere autenticación
router.get('/', protect, authorize('admin'), obtenerContactos);

module.exports = router;