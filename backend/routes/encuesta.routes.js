const express = require('express');
const router = express.Router();
const { 
  obtenerEncuestas, 
  crearEncuesta, 
  responderEncuesta 
} = require('../controllers/encuesta.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', protect, obtenerEncuestas);
router.post('/', protect, authorize('admin'), crearEncuesta);
router.post('/:id/responder', protect, responderEncuesta);

module.exports = router;