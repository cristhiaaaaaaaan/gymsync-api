const RegistroAvance = require('../models/RegistroAvance');

class MemoryRegistroAvanceManager {
    constructor() {
        this.registros = [];
    }

    getAll() {
        return this.registros;
    }

    getByUsuarioId(usuarioId) {
        return this.registros.filter(r => r.usuarioId === usuarioId);
    }

    getByEjercicioId(ejercicioId) {
        return this.registros.filter(r => r.ejercicioId === ejercicioId);
    }

    getById(id) {
        return this.registros.find(r => r.id === id);
    }

    add(registro) {
        const exists = this.registros.find(r => r.id === registro.id);
        if (exists) {
            throw new Error("RegistroAvance with this ID already exists");
        }
        this.registros.push(registro);
        return registro;
    }

    update(id, data) {
        const index = this.registros.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error("RegistroAvance not found");
        }

        this.registros[index] = new RegistroAvance(
            id,
            data.ejercicioId || this.registros[index].ejercicioId,
            this.registros[index].usuarioId, // Keep the same usuarioId
            data.fecha !== undefined ? new Date(data.fecha) : this.registros[index].fecha,
            data.pesoUtilizado !== undefined ? data.pesoUtilizado : this.registros[index].pesoUtilizado,
            data.repeticionesRealizadas !== undefined ? data.repeticionesRealizadas : this.registros[index].repeticionesRealizadas,
            data.seriesCompletadas !== undefined ? data.seriesCompletadas : this.registros[index].seriesCompletadas,
            data.notas !== undefined ? data.notas : this.registros[index].notas
        );

        return this.registros[index];
    }

    remove(id) {
        const index = this.registros.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error("RegistroAvance not found");
        }
        const removed = this.registros.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryRegistroAvanceManager();
