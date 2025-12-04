const membresiaManager = require('../data/MemoryMembresiaManager');
const Membresia = require('../models/Membresia');
const ApiResponse = require('../util/response');

class MembresiaController {
    getAllMembresias(req, res) {
        try {
            const membresias = membresiaManager.getAll();
            res.json(ApiResponse.success(membresias, "Membresias retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    getMembresiaById(req, res) {
        try {
            const membresia = membresiaManager.getById(req.params.id);
            if (!membresia) {
                return res.status(404).json(ApiResponse.notFound("Membresia not found"));
            }
            res.json(ApiResponse.success(membresia, "Membresia retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    createMembresia(req, res) {
        try {
            const { id, usuarioId, tipo, fechaInicio, fechaVencimiento, activa, monto } = req.body;

            if (!id || !usuarioId) {
                return res.status(400).json(ApiResponse.error("ID and usuarioId are required"));
            }

            const newMembresia = new Membresia(id, usuarioId, tipo, fechaInicio, fechaVencimiento, activa, monto);
            const created = membresiaManager.add(newMembresia);

            res.status(201).json(ApiResponse.created(created, "Membresia created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    updateMembresia(req, res) {
        try {
            const updated = membresiaManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Membresia updated successfully"));
        } catch (error) {
            if (error.message === "Membresia not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    deleteMembresia(req, res) {
        try {
            const deleted = membresiaManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Membresia deleted successfully"));
        } catch (error) {
            if (error.message === "Membresia not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new MembresiaController();
