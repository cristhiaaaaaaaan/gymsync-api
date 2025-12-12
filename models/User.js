class User {
    constructor(id = "", name = "", email = "", fotoPerfil = "", fechaRegistro = new Date()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.fotoPerfil = fotoPerfil;
        this.fechaRegistro = fechaRegistro;
    }
}

module.exports = User;
