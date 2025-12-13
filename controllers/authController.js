const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { readData, writeData } = require('../util/fileHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'gymsync-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';
const SALT_ROUNDS = 12;

class AuthController {
    constructor() {
        this.dataFile = './data/users.json';
    }

    async register(req, res) {
        try {
            const { name, email, password, fotoPerfil } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Name, email, and password are required"
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Invalid email format"
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Password must be at least 6 characters long"
                });
            }

            const users = readData(this.dataFile);

            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Email already registered"
                });
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const userId = this.generateId();

            const newUser = new User(
                userId,
                name,
                email,
                hashedPassword,
                fotoPerfil || "",
                new Date()
            );

            users.push(newUser);
            writeData(this.dataFile, users);

            const token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(201).json({
                responseCode: 201,
                message: "User registered successfully",
                data: {
                    user: newUser.toJSON(),
                    token: token
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                responseCode: 500,
                message: "Error registering user",
                error: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    responseCode: 400,
                    message: "Email and password are required"
                });
            }

            const users = readData(this.dataFile);

            const user = users.find(u => u.email === email);
            if (!user) {
                return res.status(401).json({
                    responseCode: 401,
                    message: "Invalid email or password"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    responseCode: 401,
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.json({
                responseCode: 200,
                message: "Login successful",
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        fotoPerfil: user.fotoPerfil,
                        fechaRegistro: user.fechaRegistro
                    },
                    token: token
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                responseCode: 500,
                message: "Error during login",
                error: error.message
            });
        }
    }

    verifyToken(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    responseCode: 401,
                    message: "No token provided"
                });
            }

            const decoded = jwt.verify(token, JWT_SECRET);

            res.json({
                responseCode: 200,
                message: "Token is valid",
                data: decoded
            });
        } catch (error) {
            res.status(401).json({
                responseCode: 401,
                message: "Invalid or expired token",
                error: error.message
            });
        }
    }

    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = new AuthController();
