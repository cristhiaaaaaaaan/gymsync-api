const rutinaManager = require('../data/MemoryRutinaManager');
const Rutina = require('../models/Rutina');
const ApiResponse = require('../util/response');

class RutinaController {
    getAllRutinas(req, res) {
        try {
            const rutinas = rutinaManager.getAll();
            res.json(ApiResponse.success(rutinas, "Rutinas retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    getRutinaById(req, res) {
        try {
            const rutina = rutinaManager.getById(req.params.id);
            if (!rutina) {
                return res.status(404).json(ApiResponse.notFound("Rutina not found"));
            }
            res.json(ApiResponse.success(rutina, "Rutina retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    createRutina(req, res) {
        try {
            const { id, usuarioId, fecha, nombre, ejercicios, completada } = req.body;

            if (!id || !nombre) {
                return res.status(400).json(ApiResponse.error("ID and nombre are required"));
            }

            const newRutina = new Rutina(id, usuarioId, fecha, nombre, ejercicios, completada);
            const created = rutinaManager.add(newRutina);

            res.status(201).json(ApiResponse.created(created, "Rutina created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    updateRutina(req, res) {
        try {
            const updated = rutinaManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Rutina updated successfully"));
        } catch (error) {
            if (error.message === "Rutina not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    deleteRutina(req, res) {
        try {
            const deleted = rutinaManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Rutina deleted successfully"));
        } catch (error) {
            if (error.message === "Rutina not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new RutinaController();
