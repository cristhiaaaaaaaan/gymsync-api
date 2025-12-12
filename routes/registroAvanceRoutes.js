const express = require('express');
const router = express.Router();
const registroAvanceController = require('../controllers/registroAvanceController');

router.get('/', registroAvanceController.getAllRegistros.bind(registroAvanceController));
router.get('/:id', registroAvanceController.getRegistroById.bind(registroAvanceController));
router.post('/', registroAvanceController.createRegistro.bind(registroAvanceController));
router.put('/:id', registroAvanceController.updateRegistro.bind(registroAvanceController));
router.delete('/:id', registroAvanceController.deleteRegistro.bind(registroAvanceController));

module.exports = router;
