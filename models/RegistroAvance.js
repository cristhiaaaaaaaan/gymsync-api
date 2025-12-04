class RegistroAvance {
    constructor(id = "", ejercicioId = "", usuarioId = "", fecha = new Date(),
                pesoUtilizado = 0.0, repeticionesRealizadas = 0, seriesCompletadas = 0) {
        this.id = id;
        this.ejercicioId = ejercicioId;
        this.usuarioId = usuarioId;
        this.fecha = fecha;
        this.pesoUtilizado = pesoUtilizado;
        this.repeticionesRealizadas = repeticionesRealizadas;
        this.seriesCompletadas = seriesCompletadas;
    }
}

module.exports = RegistroAvance;
