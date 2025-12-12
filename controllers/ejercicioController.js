const ejercicioManager = require('../data/MemoryEjercicioManager');
const Ejercicio = require('../models/Ejercicio');
const ApiResponse = require('../util/response');

class EjercicioController {
    getAllEjercicios(req, res) {
        try {
            const { usuarioId } = req.query;
            let ejercicios;

            if (usuarioId) {
                ejercicios = ejercicioManager.getByUsuarioId(usuarioId);
            } else {
                ejercicios = ejercicioManager.getAll();
            }

            res.json(ApiResponse.success(ejercicios, "Ejercicios retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    getEjercicioById(req, res) {
        try {
            const ejercicio = ejercicioManager.getById(req.params.id);
            if (!ejercicio) {
                return res.status(404).json(ApiResponse.notFound("Ejercicio not found"));
            }
            res.json(ApiResponse.success(ejercicio, "Ejercicio retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    createEjercicio(req, res) {
        try {
            const { id, nombre, series, repeticiones, pesoRecomendado, notas, usuarioId } = req.body;

            if (!id || !nombre || !usuarioId) {
                return res.status(400).json(ApiResponse.error("ID, nombre, and usuarioId are required"));
            }

            const newEjercicio = new Ejercicio(id, nombre, series, repeticiones, pesoRecomendado, notas, usuarioId);
            const created = ejercicioManager.add(newEjercicio);

            res.status(201).json(ApiResponse.created(created, "Ejercicio created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    updateEjercicio(req, res) {
        try {
            const updated = ejercicioManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Ejercicio updated successfully"));
        } catch (error) {
            if (error.message === "Ejercicio not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    deleteEjercicio(req, res) {
        try {
            const deleted = ejercicioManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Ejercicio deleted successfully"));
        } catch (error) {
            if (error.message === "Ejercicio not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new EjercicioController();
