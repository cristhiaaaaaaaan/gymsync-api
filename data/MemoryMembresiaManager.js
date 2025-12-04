const Membresia = require('../models/Membresia');

class MemoryMembresiaManager {
    constructor() {
        this.membresias = [];
        this.initializeData();
    }

    initializeData() {
        const hoy = new Date();
        const mesProximo = new Date();
        mesProximo.setMonth(mesProximo.getMonth() + 1);

        this.membresias.push(new Membresia("1", "user1", "Premium", hoy, mesProximo, true, 50.00));
        this.membresias.push(new Membresia("2", "user2", "Basico", hoy, mesProximo, true, 25.00));
    }

    getAll() {
        return this.membresias;
    }

    getById(id) {
        return this.membresias.find(m => m.id === id);
    }

    add(membresia) {
        const exists = this.membresias.find(m => m.id === membresia.id);
        if (exists) {
            throw new Error("Membresia with this ID already exists");
        }
        this.membresias.push(membresia);
        return membresia;
    }

    update(id, data) {
        const index = this.membresias.findIndex(m => m.id === id);
        if (index === -1) {
            throw new Error("Membresia not found");
        }

        this.membresias[index] = new Membresia(
            id,
            data.usuarioId || this.membresias[index].usuarioId,
            data.tipo || this.membresias[index].tipo,
            data.fechaInicio ? new Date(data.fechaInicio) : this.membresias[index].fechaInicio,
            data.fechaVencimiento ? new Date(data.fechaVencimiento) : this.membresias[index].fechaVencimiento,
            data.activa !== undefined ? data.activa : this.membresias[index].activa,
            data.monto !== undefined ? data.monto : this.membresias[index].monto
        );

        return this.membresias[index];
    }

    remove(id) {
        const index = this.membresias.findIndex(m => m.id === id);
        if (index === -1) {
            throw new Error("Membresia not found");
        }
        const removed = this.membresias.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryMembresiaManager();
