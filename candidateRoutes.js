const express = require('express');
const router = express.Router();
const candidateController = require('../controller/candidateController.js');

// Rutas para candidatos
router.get('/', candidateController.getAllCandidates); // Cambié el método a getAllCandidates
router.post('/', candidateController.createCandidate);
router.get('/:id', candidateController.getCandidateById);
router.put('/:id', candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;