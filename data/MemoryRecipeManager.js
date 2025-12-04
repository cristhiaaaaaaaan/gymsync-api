const Recipe = require('../models/Recipe');

class MemoryRecipeManager {
    constructor() {
        this.recipes = [];
        this.initializeData();
    }

    initializeData() {
        // Datos de ejemplo
        this.recipes.push(new Recipe(
            "1",
            "Ensalada de Pollo",
            "Ensalada saludable con pechuga de pollo",
            15,
            10,
            "Fácil",
            2,
            "Saludable",
            "1. Cocinar el pollo. 2. Cortar verduras. 3. Mezclar todo.",
            ["Pollo 200g", "Lechuga", "Tomate", "Aceite de oliva"]
        ));
        this.recipes.push(new Recipe(
            "2",
            "Batido Proteico",
            "Batido post-entrenamiento",
            5,
            0,
            "Muy Fácil",
            1,
            "Bebida",
            "1. Mezclar todos los ingredientes en la licuadora.",
            ["Proteína 30g", "Plátano", "Leche de almendras 250ml"]
        ));
    }

    getAll() {
        return this.recipes;
    }

    getById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    }

    add(recipe) {
        const exists = this.recipes.find(r => r.id === recipe.id);
        if (exists) {
            throw new Error("Recipe with this ID already exists");
        }
        this.recipes.push(recipe);
        return recipe;
    }

    update(id, recipeData) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index === -1) {
            throw new Error("Recipe not found");
        }

        this.recipes[index] = new Recipe(
            id,
            recipeData.name || this.recipes[index].name,
            recipeData.description || this.recipes[index].description,
            recipeData.prepTime || this.recipes[index].prepTime,
            recipeData.cookTime || this.recipes[index].cookTime,
            recipeData.difficulty || this.recipes[index].difficulty,
            recipeData.servings || this.recipes[index].servings,
            recipeData.category || this.recipes[index].category,
            recipeData.steps || this.recipes[index].steps,
            recipeData.ingredients || this.recipes[index].ingredients
        );

        return this.recipes[index];
    }

    remove(id) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index === -1) {
            throw new Error("Recipe not found");
        }
        const removed = this.recipes.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryRecipeManager();
