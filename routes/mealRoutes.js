const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Rutas para comidas
router.get('/', mealController.getAllMeals.bind(mealController));
router.get('/:id', mealController.getMealById.bind(mealController));
router.post('/', mealController.createMeal.bind(mealController));
router.put('/:id', mealController.updateMeal.bind(mealController));
router.delete('/:id', mealController.deleteMeal.bind(mealController));

module.exports = router;
