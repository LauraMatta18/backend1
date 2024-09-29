const express = require('express');
const router = express.Router();
const enterpriseController = require("./enterpriseController.js");

router.get('/', enterpriseController.getAllEnterprises);
router.post('/', enterpriseController.createEnterprise);
router.get('/:id', enterpriseController.getEnterpriseById);
router.put('/:id', enterpriseController.updateEnterprise);
router.delete('/:id', enterpriseController.deleteEnterprise);

module.exports = router;
