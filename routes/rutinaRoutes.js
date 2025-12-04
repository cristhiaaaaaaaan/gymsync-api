const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

router.get('/', rutinaController.getAllRutinas.bind(rutinaController));
router.get('/:id', rutinaController.getRutinaById.bind(rutinaController));
router.post('/', rutinaController.createRutina.bind(rutinaController));
router.put('/:id', rutinaController.updateRutina.bind(rutinaController));
router.delete('/:id', rutinaController.deleteRutina.bind(rutinaController));

module.exports = router;
