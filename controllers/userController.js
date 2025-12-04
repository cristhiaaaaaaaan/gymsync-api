const userManager = require('../data/MemoryUserManager');
const User = require('../models/User');
const ApiResponse = require('../util/response');

class UserController {
    // GET /users - Obtener todos los usuarios
    getAllUsers(req, res) {
        try {
            const users = userManager.getAll();
            res.json(ApiResponse.success(users, "Users retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // GET /users/:id - Obtener usuario por ID
    getUserById(req, res) {
        try {
            const user = userManager.getById(req.params.id);
            if (!user) {
                return res.status(404).json(ApiResponse.notFound("User not found"));
            }
            res.json(ApiResponse.success(user, "User retrieved successfully"));
        } catch (error) {
            res.status(500).json(ApiResponse.error(error.message, 500));
        }
    }

    // POST /users - Crear nuevo usuario
    createUser(req, res) {
        try {
            const { id, name, fLastName, sLastName, password, email } = req.body;

            if (!id || !name || !fLastName || !sLastName || !password || !email) {
                return res.status(400).json(ApiResponse.error("All fields are required"));
            }

            const newUser = new User(id, name, fLastName, sLastName, password, email);
            const created = userManager.add(newUser);

            res.status(201).json(ApiResponse.created(created, "User created successfully"));
        } catch (error) {
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // PUT /users/:id - Actualizar usuario
    updateUser(req, res) {
        try {
            const updated = userManager.update(req.params.id, req.body);
            res.json(ApiResponse.success(updated, "User updated successfully"));
        } catch (error) {
            if (error.message === "User not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }

    // DELETE /users/:id - Eliminar usuario
    deleteUser(req, res) {
        try {
            const deleted = userManager.remove(req.params.id);
            res.json(ApiResponse.success(deleted, "User deleted successfully"));
        } catch (error) {
            if (error.message === "User not found") {
                return res.status(404).json(ApiResponse.notFound(error.message));
            }
            res.status(400).json(ApiResponse.error(error.message));
        }
    }
}

module.exports = new UserController();
