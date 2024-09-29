const express = require('express');
const router = express.Router();
const userController = require("./userController");

router.get('/', candidateController.getAllCandidates);
router.post('/', candidateController.createCandidate);

// Nueva ruta para restablecer la contraseña
router.post('/resetPassword', userController.resetPassword);

module.exports = router;