const express = require('express');
const router = express.Router();
const ejercicioController = require('../controllers/ejercicioController');

router.get('/', ejercicioController.getAllEjercicios.bind(ejercicioController));
router.get('/:id', ejercicioController.getEjercicioById.bind(ejercicioController));
router.post('/', ejercicioController.createEjercicio.bind(ejercicioController));
router.put('/:id', ejercicioController.updateEjercicio.bind(ejercicioController));
router.delete('/:id', ejercicioController.deleteEjercicio.bind(ejercicioController));

module.exports = router;
