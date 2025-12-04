const Rutina = require('../models/Rutina');

class MemoryRutinaManager {
    constructor() {
        this.rutinas = [];
        this.initializeData();
    }

    initializeData() {
        this.rutinas.push(new Rutina("1", "user1", new Date(), "Rutina Pecho y Triceps", ["1", "2"], false));
        this.rutinas.push(new Rutina("2", "user1", new Date(), "Rutina Piernas", ["2", "3"], true));
    }

    getAll() {
        return this.rutinas;
    }

    getById(id) {
        return this.rutinas.find(r => r.id === id);
    }

    add(rutina) {
        const exists = this.rutinas.find(r => r.id === rutina.id);
        if (exists) {
            throw new Error("Rutina with this ID already exists");
        }
        this.rutinas.push(rutina);
        return rutina;
    }

    update(id, data) {
        const index = this.rutinas.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error("Rutina not found");
        }

        this.rutinas[index] = new Rutina(
            id,
            data.usuarioId || this.rutinas[index].usuarioId,
            data.fecha ? new Date(data.fecha) : this.rutinas[index].fecha,
            data.nombre || this.rutinas[index].nombre,
            data.ejercicios || this.rutinas[index].ejercicios,
            data.completada !== undefined ? data.completada : this.rutinas[index].completada
        );

        return this.rutinas[index];
    }

    remove(id) {
        const index = this.rutinas.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error("Rutina not found");
        }
        const removed = this.rutinas.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryRutinaManager();
