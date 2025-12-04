const recipeManager = require('../data/MemoryRecipeManager');
const Recipe = require('../models/Recipe');
const ApiResponse = require('../util/response');

class RecipeController {
    // GET /recipes - Obtener todas las recetas
    getAllRecipes(req, res) {
        try {
            const recipes = recipeManager.getAll();
            res.json(ApiResponse.success(recipes, "Recipes retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /recipes/:id - Obtener receta por ID
    getRecipeById(req, res) {
        try {
            const recipe = recipeManager.getById(req.params.id);
            if (!recipe) {
                return res.status(404).json(ApiResponse.notFound("Recipe not found"));
            }
            res.json(ApiResponse.success(recipe, "Recipe retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // POST /recipes - Crear nueva receta
    createRecipe(req, res) {
        try {
            const { id, name, description, prepTime, cookTime, difficulty, servings, category, steps, ingredients } = req.body;

            if (!id || !name) {
                return res.status(400).json(ApiResponse.error("ID and name are required"));
            }

            const newRecipe = new Recipe(id, name, description, prepTime, cookTime, difficulty, servings, category, steps, ingredients);
            const created = recipeManager.add(newRecipe);

            res.status(201).json(ApiResponse.created(created, "Recipe created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // PUT /recipes/:id - Actualizar receta
    updateRecipe(req, res) {
        try {
            const updated = recipeManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Recipe updated successfully"));
        } catch (error) {
            if (error.message === "Recipe not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // DELETE /recipes/:id - Eliminar receta
    deleteRecipe(req, res) {
        try {
            const deleted = recipeManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Recipe deleted successfully"));
        } catch (error) {
            if (error.message === "Recipe not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new RecipeController();
