const LearningClass = require('../models/LearningClass');

class MemoryClassManager {
    constructor() {
        this.classes = [];
        this.initializeData();
    }

    initializeData() {
        // Datos de ejemplo
        this.classes.push(new LearningClass(1, "Yoga Matutino", "Lunes 7:00 AM", "Ana García"));
        this.classes.push(new LearningClass(2, "CrossFit", "Martes 6:00 PM", "Carlos Ruiz"));
        this.classes.push(new LearningClass(3, "Spinning", "Miércoles 5:30 PM", "Laura Fernández"));
    }

    getAll() {
        return this.classes;
    }

    getById(id) {
        return this.classes.find(cls => cls.id === parseInt(id));
    }

    add(learningClass) {
        const exists = this.classes.find(c => c.id === learningClass.id);
        if (exists) {
            throw new Error("Class with this ID already exists");
        }
        this.classes.push(learningClass);
        return learningClass;
    }

    update(id, classData) {
        const index = this.classes.findIndex(cls => cls.id === parseInt(id));
        if (index === -1) {
            throw new Error("Class not found");
        }

        this.classes[index] = new LearningClass(
            parseInt(id),
            classData.title || this.classes[index].title,
            classData.schedule || this.classes[index].schedule,
            classData.professor || this.classes[index].professor
        );

        return this.classes[index];
    }

    remove(id) {
        const index = this.classes.findIndex(cls => cls.id === parseInt(id));
        if (index === -1) {
            throw new Error("Class not found");
        }
        const removed = this.classes.splice(index, 1);
        return removed[0];
    }
}

module.exports = new MemoryClassManager();
