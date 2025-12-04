class Ejercicio {
    constructor(id = "", nombre = "", series = 0, repeticiones = 0, pesoRecomendado = 0.0, notas = "") {
        this.id = id;
        this.nombre = nombre;
        this.series = series;
        this.repeticiones = repeticiones;
        this.pesoRecomendado = pesoRecomendado;
        this.notas = notas;
    }
}

module.exports = Ejercicio;
