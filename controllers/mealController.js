const mealManager = require('../data/MemoryMealManager');
const Meal = require('../models/Meal');
const ApiResponse = require('../util/response');

class MealController {
    // GET /meals - Obtener todas las comidas
    getAllMeals(req, res) {
        try {
            const meals = mealManager.getAll();
            res.json(ApiResponse.success(meals, "Meals retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /meals/:id - Obtener comida por ID
    getMealById(req, res) {
        try {
            const meal = mealManager.getById(req.params.id);
            if (!meal) {
                return res.status(404).json(ApiResponse.notFound("Meal not found"));
            }
            res.json(ApiResponse.success(meal, "Meal retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // POST /meals - Crear nueva comida
    createMeal(req, res) {
        try {
            const { id, name, quantity, deliveryDate, notes } = req.body;

            if (!id || !name || !quantity || !deliveryDate) {
                return res.status(400).json(ApiResponse.error("ID, name, quantity and deliveryDate are required"));
            }

            const newMeal = new Meal(id, name, quantity, deliveryDate, notes);
            const created = mealManager.add(newMeal);

            res.status(201).json(ApiResponse.created(created, "Meal created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // PUT /meals/:id - Actualizar comida
    updateMeal(req, res) {
        try {
            const updated = mealManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Meal updated successfully"));
        } catch (error) {
            if (error.message === "Meal not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // DELETE /meals/:id - Eliminar comida
    deleteMeal(req, res) {
        try {
            const deleted = mealManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Meal deleted successfully"));
        } catch (error) {
            if (error.message === "Meal not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new MealController();
