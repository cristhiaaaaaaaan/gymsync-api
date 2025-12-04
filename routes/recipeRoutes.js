const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Rutas para recetas
router.get('/', recipeController.getAllRecipes.bind(recipeController));
router.get('/:id', recipeController.getRecipeById.bind(recipeController));
router.post('/', recipeController.createRecipe.bind(recipeController));
router.put('/:id', recipeController.updateRecipe.bind(recipeController));
router.delete('/:id', recipeController.deleteRecipe.bind(recipeController));

module.exports = router;
