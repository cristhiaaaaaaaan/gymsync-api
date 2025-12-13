const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'gymsync-secret-key-change-in-production';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                responseCode: 401,
                message: "Access denied. No token provided."
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({
                responseCode: 401,
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        res.status(500).json({
            responseCode: 500,
            message: "Error in authentication",
            error: error.message
        });
    }
};

module.exports = authMiddleware;
