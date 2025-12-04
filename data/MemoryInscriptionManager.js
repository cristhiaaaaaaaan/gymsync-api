const Inscription = require('../models/Inscription');

class MemoryInscriptionManager {
    constructor() {
        this.inscriptions = [];
        this.initializeData();
    }

    initializeData() {
        // Datos de ejemplo
        this.inscriptions.push(new Inscription(
            "1",
            "1",
            "juan@example.com",
            "Fitness Básico",
            "CrossFit",
            "Martes 6:00 PM"
        ));
        this.inscriptions.push(new Inscription(
            "2",
            "2",
            "maria@example.com",
            "Wellness",
            "Yoga Matutino",
            "Lunes 7:00 AM"
        ));
    }

    getAll() {
        return this.inscriptions;
    }

    getById(id) {
        return this.inscriptions.find(ins => ins.inscriptionId === id);
    }

    getByPersonId(personId) {
        return this.inscriptions.filter(ins => ins.personId === personId);
    }

    add(inscription) {
        const exists = this.inscriptions.find(i => i.inscriptionId === inscription.inscriptionId);
        if (exists) {
            throw new Error("Inscription with this ID already exists");
        }
        this.inscriptions.push(inscription);
        return inscription;
    }

    update(id, inscriptionData) {
        const index = this.inscriptions.findIndex(ins => ins.inscriptionId === id);
        if (index === -1) {
            throw new Error("Inscription not found");
        }

        this.inscriptions[index] = new Inscription(
            id,
            inscriptionData.personId || this.inscriptions[index].personId,
            inscriptionData.personEmail || this.inscriptions[index].personEmail,
            inscriptionData.courseName || this.inscriptions[index].courseName,
            inscriptionData.trainingName || this.inscriptions[index].trainingName,
            inscriptionData.schedule || this.inscriptions[index].schedule
        );

        return this.inscriptions[index];
    }

    remove(id) {
        const index = this.inscriptions.findIndex(ins => ins.inscriptionId === id);
        if (index === -1) {
            throw new Error("Inscription not found");
        }
        const removed = this.inscriptions.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryInscriptionManager();
