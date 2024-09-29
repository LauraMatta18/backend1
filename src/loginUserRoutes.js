const express = require('express');
const router = express.Router();
const loginUserController = require("./loginUserController.js");

// Ruta para iniciar sesión como usuario
router.post('/login', loginUserController.loginUser);

// Ruta para cerrar sesión como usuario
router.post('/logout', loginUserController.logoutUser);

module.exports = router;