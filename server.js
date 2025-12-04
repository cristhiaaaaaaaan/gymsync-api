const express = require('express');
const cors = require('cors');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const mealRoutes = require('./routes/mealRoutes');
const classRoutes = require('./routes/classRoutes');
const inscriptionRoutes = require('./routes/inscriptionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: "GymSync API - Mobile App Backend",
        version: "1.0.0",
        endpoints: {
            users: "/users",
            recipes: "/recipes",
            meals: "/meals",
            classes: "/classes",
            inscriptions: "/inscriptions"
        },
        documentation: "See README.md for full API documentation"
    });
});

// Rutas de la API
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/meals', mealRoutes);
app.use('/classes', classRoutes);
app.use('/inscriptions', inscriptionRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        responseCode: 404,
        message: "Endpoint not found"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('GymSync API is running on port ' + PORT);
    console.log('Local: http://localhost:' + PORT);
    console.log('Visit http://localhost:' + PORT + ' for available endpoints');
});

module.exports = app;
