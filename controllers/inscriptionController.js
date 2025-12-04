const inscriptionManager = require('../data/MemoryInscriptionManager');
const Inscription = require('../models/Inscription');
const ApiResponse = require('../util/response');

class InscriptionController {
    // GET /inscriptions - Obtener todas las inscripciones
    getAllInscriptions(req, res) {
        try {
            const inscriptions = inscriptionManager.getAll();
            res.json(ApiResponse.success(inscriptions, "Inscriptions retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /inscriptions/:id - Obtener inscripción por ID
    getInscriptionById(req, res) {
        try {
            const inscription = inscriptionManager.getById(req.params.id);
            if (!inscription) {
                return res.status(404).json(ApiResponse.notFound("Inscription not found"));
            }
            res.json(ApiResponse.success(inscription, "Inscription retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /inscriptions/person/:personId - Obtener inscripciones por persona
    getInscriptionsByPerson(req, res) {
        try {
            const inscriptions = inscriptionManager.getByPersonId(req.params.personId);
            res.json(ApiResponse.success(inscriptions, "Inscriptions retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // POST /inscriptions - Crear nueva inscripción
    createInscription(req, res) {
        try {
            const { inscriptionId, personId, personEmail, courseName, trainingName, schedule } = req.body;

            if (!inscriptionId || !personId || !personEmail) {
                return res.status(400).json(ApiResponse.error("InscriptionId, personId and personEmail are required"));
            }

            const newInscription = new Inscription(inscriptionId, personId, personEmail, courseName, trainingName, schedule);
            const created = inscriptionManager.add(newInscription);

            res.status(201).json(ApiResponse.created(created, "Inscription created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // PUT /inscriptions/:id - Actualizar inscripción
    updateInscription(req, res) {
        try {
            const updated = inscriptionManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Inscription updated successfully"));
        } catch (error) {
            if (error.message === "Inscription not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // DELETE /inscriptions/:id - Eliminar inscripción
    deleteInscription(req, res) {
        try {
            const deleted = inscriptionManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Inscription deleted successfully"));
        } catch (error) {
            if (error.message === "Inscription not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new InscriptionController();
