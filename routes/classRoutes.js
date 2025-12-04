const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Rutas para clases
router.get('/', classController.getAllClasses.bind(classController));
router.get('/:id', classController.getClassById.bind(classController));
router.post('/', classController.createClass.bind(classController));
router.put('/:id', classController.updateClass.bind(classController));
router.delete('/:id', classController.deleteClass.bind(classController));

module.exports = router;
