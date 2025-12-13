class User {
    constructor(id = "", name = "", email = "", password = "", fotoPerfil = "", fechaRegistro = new Date()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password; // Hashed password
        this.fotoPerfil = fotoPerfil;
        this.fechaRegistro = fechaRegistro;
    }

    // Method to return user without password (for API responses)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            fotoPerfil: this.fotoPerfil,
            fechaRegistro: this.fechaRegistro
            // password is intentionally excluded
        };
    }
}

module.exports = User;
