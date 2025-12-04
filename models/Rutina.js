class Rutina {
    constructor(id = "", usuarioId = "", fecha = new Date(), nombre = "", ejercicios = [], completada = false) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.fecha = fecha;
        this.nombre = nombre;
        this.ejercicios = ejercicios;
        this.completada = completada;
    }
}

module.exports = Rutina;
