const Ejercicio = require('../models/Ejercicio');

class MemoryEjercicioManager {
    constructor() {
        this.ejercicios = [];
        this.initializeData();
    }

    initializeData() {
        this.ejercicios.push(new Ejercicio("1", "Press de Banca", 4, 10, 60, "Mantener espalda pegada al banco"));
        this.ejercicios.push(new Ejercicio("2", "Sentadillas", 4, 12, 80, "Bajar hasta 90 grados"));
        this.ejercicios.push(new Ejercicio("3", "Peso Muerto", 3, 8, 100, "Mantener espalda recta"));
    }

    getAll() {
        return this.ejercicios;
    }

    getById(id) {
        return this.ejercicios.find(ej => ej.id === id);
    }

    add(ejercicio) {
        const exists = this.ejercicios.find(e => e.id === ejercicio.id);
        if (exists) {
            throw new Error("Ejercicio with this ID already exists");
        }
        this.ejercicios.push(ejercicio);
        return ejercicio;
    }

    update(id, data) {
        const index = this.ejercicios.findIndex(ej => ej.id === id);
        if (index === -1) {
            throw new Error("Ejercicio not found");
        }

        this.ejercicios[index] = new Ejercicio(
            id,
            data.nombre || this.ejercicios[index].nombre,
            data.series !== undefined ? data.series : this.ejercicios[index].series,
            data.repeticiones !== undefined ? data.repeticiones : this.ejercicios[index].repeticiones,
            data.pesoRecomendado !== undefined ? data.pesoRecomendado : this.ejercicios[index].pesoRecomendado,
            data.notas !== undefined ? data.notas : this.ejercicios[index].notas
        );

        return this.ejercicios[index];
    }

    remove(id) {
        const index = this.ejercicios.findIndex(ej => ej.id === id);
        if (index === -1) {
            throw new Error("Ejercicio not found");
        }
        const removed = this.ejercicios.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryEjercicioManager();
