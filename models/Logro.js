class Logro {
    constructor(id = "", usuarioId = "", titulo = "", descripcion = "",
                fecha = new Date(), icono = "") {
        this.id = id;
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.icono = icono;
    }
}

module.exports = Logro;
