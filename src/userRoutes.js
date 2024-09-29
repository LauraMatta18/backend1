const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('./userController');

// Define las rutas
router.post('/create', userController.createUser);

// Exporta el router
module.exports = router;
