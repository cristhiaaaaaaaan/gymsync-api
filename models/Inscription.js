class Inscription {
    constructor(inscriptionId = "", personId = "", personEmail = "",
                courseName = "", trainingName = "", schedule = "") {
        this.inscriptionId = inscriptionId;
        this.personId = personId;
        this.personEmail = personEmail;
        this.courseName = courseName;
        this.trainingName = trainingName;
        this.schedule = schedule;
    }
}

module.exports = Inscription;
