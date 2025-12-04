class Membresia {
    constructor(id = "", usuarioId = "", tipo = "", fechaInicio = new Date(),
                fechaVencimiento = new Date(), activa = false, monto = 0.0) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.fechaInicio = fechaInicio;
        this.fechaVencimiento = fechaVencimiento;
        this.activa = activa;
        this.monto = monto;
    }
}

module.exports = Membresia;
