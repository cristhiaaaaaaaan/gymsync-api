class LearningClass {
    constructor(id = 0, title, schedule, professor) {
        this.id = id;
        this.title = title;      // nombre de la clase
        this.schedule = schedule; // horario
        this.professor = professor; // profesor
    }

    toString() {
        return `${this.title} • ${this.schedule} • ${this.professor}`;
    }
}

module.exports = LearningClass;
