class User {
    constructor(id, name, fLastName, sLastName, password, email) {
        this.id = id;
        this.name = name;
        this.fLastName = fLastName;
        this.sLastName = sLastName;
        this.password = password;
        this.email = email;
    }

    toString() {
        return `${this.id} - ${this.name} ${this.fLastName} ${this.sLastName}`;
    }
}

module.exports = User;
