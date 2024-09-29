const express = require('express');
const router = express.Router();
const forgotPasswordController = require("./forgotPasswordController.js");

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgotPassword', forgotPasswordController.forgotPassword);

// Ruta para restablecer la contraseña
router.post('/resetPassword', forgotPasswordController.resetPassword);

module.exports = router;