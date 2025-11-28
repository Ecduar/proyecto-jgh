const express = require('express');
const router = express.Router();
const { registro, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/registro', registro);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;