class Recipe {
    constructor(id = "", name = "", description = "", prepTime = 0, cookTime = 0,
                difficulty = "Fácil", servings = 1, category = "", steps = "", ingredients = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.prepTime = prepTime; // minutos
        this.cookTime = cookTime; // minutos
        this.difficulty = difficulty;
        this.servings = servings;
        this.category = category;
        this.steps = steps;
        this.ingredients = ingredients;
    }

    getTotalTime() {
        return this.prepTime + this.cookTime;
    }
}

module.exports = Recipe;
