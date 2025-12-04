const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/membresiaController');

router.get('/', membresiaController.getAllMembresias.bind(membresiaController));
router.get('/:id', membresiaController.getMembresiaById.bind(membresiaController));
router.post('/', membresiaController.createMembresia.bind(membresiaController));
router.put('/:id', membresiaController.updateMembresia.bind(membresiaController));
router.delete('/:id', membresiaController.deleteMembresia.bind(membresiaController));

module.exports = router;
