class Meal {
    constructor(id, name, quantity, deliveryDate, notes = null) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate; // dd/MM/yyyy
        this.notes = notes;
    }
}

module.exports = Meal;
