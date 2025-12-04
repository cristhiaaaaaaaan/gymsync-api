const classManager = require('../data/MemoryClassManager');
const LearningClass = require('../models/LearningClass');
const ApiResponse = require('../util/response');

class ClassController {
    // GET /classes - Obtener todas las clases
    getAllClasses(req, res) {
        try {
            const classes = classManager.getAll();
            res.json(ApiResponse.success(classes, "Classes retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /classes/:id - Obtener clase por ID
    getClassById(req, res) {
        try {
            const learningClass = classManager.getById(req.params.id);
            if (!learningClass) {
                return res.status(404).json(ApiResponse.notFound("Class not found"));
            }
            res.json(ApiResponse.success(learningClass, "Class retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // POST /classes - Crear nueva clase
    createClass(req, res) {
        try {
            const { id, title, schedule, professor } = req.body;

            if (!title || !schedule || !professor) {
                return res.status(400).json(ApiResponse.error("Title, schedule and professor are required"));
            }

            const newClass = new LearningClass(id || 0, title, schedule, professor);
            const created = classManager.add(newClass);

            res.status(201).json(ApiResponse.created(created, "Class created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // PUT /classes/:id - Actualizar clase
    updateClass(req, res) {
        try {
            const updated = classManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "Class updated successfully"));
        } catch (error) {
            if (error.message === "Class not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // DELETE /classes/:id - Eliminar clase
    deleteClass(req, res) {
        try {
            const deleted = classManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "Class deleted successfully"));
        } catch (error) {
            if (error.message === "Class not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new ClassController();
