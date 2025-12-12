const registroAvanceManager = require('../data/MemoryRegistroAvanceManager');
const RegistroAvance = require('../models/RegistroAvance');
const ApiResponse = require('../util/response');

class RegistroAvanceController {
    getAllRegistros(req, res) {
        try {
            const { usuarioId, ejercicioId } = req.query;
            let registros;

            if (usuarioId) {
                registros = registroAvanceManager.getByUsuarioId(usuarioId);
            } else if (ejercicioId) {
                registros = registroAvanceManager.getByEjercicioId(ejercicioId);
            } else {
                registros = registroAvanceManager.getAll();
            }

            res.json(ApiResponse.success(registros, "Registros retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    getRegistroById(req, res) {
        try {
            const registro = registroAvanceManager.getById(req.params.id);
            if (!registro) {
                return res.status(404).json(ApiResponse.notFound("Registro not found"));
            }
            res.json(ApiResponse.success(registro, "Registro retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    createRegistro(req, res) {
        try {
            const { id, ejercicioId, usuarioId, fecha, pesoUtilizado, repeticionesRealizadas, seriesCompletadas, notas } = req.body;

            if (!id || !ejercicioId || !usuarioId) {
                return res.status(400).json(ApiResponse.error("ID, ejercicioId, and usuarioId are required"));
            }

            const newRegistro = new RegistroAvance(
                id,
                ejercicioId,
                usuarioId,
                fecha ? new Date(fecha) : new Date(),
                pesoUtilizado || 0,
                repeticionesRealizadas || 0,
                seriesCompletadas || 0,
                notas || ""
            );

            const created = registroAvanceManager.add(newRegistro);
            res.status(201).json(ApiResponse.created(created, "Registro created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    updateRegistro(req, res) {
        try {
            const updated = registroAvanceManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Registro updated successfully"));
        } catch (error) {
            if (error.message === "RegistroAvance not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    deleteRegistro(req, res) {
        try {
            const deleted = registroAvanceManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Registro deleted successfully"));
        } catch (error) {
            if (error.message === "RegistroAvance not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new RegistroAvanceController();
