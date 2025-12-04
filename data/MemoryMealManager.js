const Meal = require('../models/Meal');

class MemoryMealManager {
    constructor() {
        this.meals = [];
        this.initializeData();
    }

    initializeData() {
        // Datos de ejemplo
        this.meals.push(new Meal(1, "Desayuno Proteico", 1, "05/12/2025", "Con frutas"));
        this.meals.push(new Meal(2, "Almuerzo Balanceado", 1, "05/12/2025", "Post-entrenamiento"));
    }

    getAll() {
        return this.meals;
    }

    getById(id) {
        return this.meals.find(meal => meal.id === parseInt(id));
    }

    add(meal) {
        const exists = this.meals.find(m => m.id === meal.id);
        if (exists) {
            throw new Error("Meal with this ID already exists");
        }
        this.meals.push(meal);
        return meal;
    }

    update(id, mealData) {
        const index = this.meals.findIndex(meal => meal.id === parseInt(id));
        if (index === -1) {
            throw new Error("Meal not found");
        }

        this.meals[index] = new Meal(
            parseInt(id),
            mealData.name || this.meals[index].name,
            mealData.quantity || this.meals[index].quantity,
            mealData.deliveryDate || this.meals[index].deliveryDate,
            mealData.notes !== undefined ? mealData.notes : this.meals[index].notes
        );

        return this.meals[index];
    }

    remove(id) {
        const index = this.meals.findIndex(meal => meal.id === parseInt(id));
        if (index === -1) {
            throw new Error("Meal not found");
        }
        const removed = this.meals.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryMealManager();
