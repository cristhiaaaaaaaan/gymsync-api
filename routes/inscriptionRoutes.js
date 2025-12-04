const express = require('express');
const router = express.Router();
const inscriptionController = require('../controllers/inscriptionController');

// Rutas para inscripciones
router.get('/', inscriptionController.getAllInscriptions.bind(inscriptionController));
router.get('/:id', inscriptionController.getInscriptionById.bind(inscriptionController));
router.get('/person/:personId', inscriptionController.getInscriptionsByPerson.bind(inscriptionController));
router.post('/', inscriptionController.createInscription.bind(inscriptionController));
router.put('/:id', inscriptionController.updateInscription.bind(inscriptionController));
router.delete('/:id', inscriptionController.deleteInscription.bind(inscriptionController));

module.exports = router;
