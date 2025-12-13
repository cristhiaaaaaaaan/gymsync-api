const User = require('../models/User');
const { readData, writeData } = require('../util/fileHandler');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

class UserController {
    constructor() {
        this.dataFile = './data/users.json';
    }

    getAllUsers(req, res) {
        try {
            const users = readData(this.dataFile);
            const usersWithoutPasswords = users.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                fotoPerfil: u.fotoPerfil,
                fechaRegistro: u.fechaRegistro
            }));
            res.json({
                responseCode: 200,
                message: "Users retrieved successfully",
                data: usersWithoutPasswords
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error retrieving users",
                error: error.message
            });
        }
    }

    getUserById(req, res) {
        try {
            const users = readData(this.dataFile);
            const user = users.find(u => u.id === req.params.id);

            if (!user) {
                return res.status(404).json({
                    responseCode: 404,
                    message: "User not found"
                });
            }

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                fotoPerfil: user.fotoPerfil,
                fechaRegistro: user.fechaRegistro
            };

            res.json({
                responseCode: 200,
                message: "User retrieved successfully",
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error retrieving user",
                error: error.message
            });
        }
    }

    getUserByEmail(req, res) {
        try {
            const users = readData(this.dataFile);
            const user = users.find(u => u.email === req.params.email);

            if (!user) {
                return res.status(404).json({
                    responseCode: 404,
                    message: "User not found"
                });
            }

            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                fotoPerfil: user.fotoPerfil,
                fechaRegistro: user.fechaRegistro
            };

            res.json({
                responseCode: 200,
                message: "User retrieved successfully",
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error retrieving user",
                error: error.message
            });
        }
    }

    async createUser(req, res) {
        try {
            const users = readData(this.dataFile);

            const existingUser = users.find(u => u.email === req.body.email);
            if (existingUser) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Email already registered"
                });
            }

            let hashedPassword = "";
            if (req.body.password) {
                hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
            }

            const newUser = new User(
                req.body.id,
                req.body.name,
                req.body.email,
                hashedPassword,
                req.body.fotoPerfil || "",
                req.body.fechaRegistro || new Date()
            );

            users.push(newUser);
            writeData(this.dataFile, users);

            const userWithoutPassword = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                fotoPerfil: newUser.fotoPerfil,
                fechaRegistro: newUser.fechaRegistro
            };

            res.status(201).json({
                responseCode: 201,
                message: "User created successfully",
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error creating user",
                error: error.message
            });
        }
    }

    async updateUser(req, res) {
        try {
            const users = readData(this.dataFile);
            const index = users.findIndex(u => u.id === req.params.id);

            if (index === -1) {
                return res.status(404).json({
                    responseCode: 404,
                    message: "User not found"
                });
            }

            if (req.body.email && req.body.email !== users[index].email) {
                const emailExists = users.find(u => u.email === req.body.email);
                if (emailExists) {
                    return res.status(400).json({
                        responseCode: 400,
                        message: "Email already registered"
                    });
                }
            }

            let updates = {
                name: req.body.name || users[index].name,
                email: req.body.email || users[index].email,
                fotoPerfil: req.body.fotoPerfil !== undefined ? req.body.fotoPerfil : users[index].fotoPerfil
            };

            if (req.body.password) {
                updates.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
            }

            users[index] = {
                ...users[index],
                ...updates
            };

            writeData(this.dataFile, users);

            const userWithoutPassword = {
                id: users[index].id,
                name: users[index].name,
                email: users[index].email,
                fotoPerfil: users[index].fotoPerfil,
                fechaRegistro: users[index].fechaRegistro
            };

            res.json({
                responseCode: 200,
                message: "User updated successfully",
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error updating user",
                error: error.message
            });
        }
    }

    deleteUser(req, res) {
        try {
            const users = readData(this.dataFile);
            const index = users.findIndex(u => u.id === req.params.id);

            if (index === -1) {
                return res.status(404).json({
                    responseCode: 404,
                    message: "User not found"
                });
            }

            const deletedUser = users.splice(index, 1)[0];
            writeData(this.dataFile, users);

            res.json({
                responseCode: 200,
                message: "User deleted successfully",
                data: deletedUser
            });
        } catch (error) {
            res.status(500).json({
                responseCode: 500,
                message: "Error deleting user",
                error: error.message
            });
        }
    }
}

module.exports = new UserController();
