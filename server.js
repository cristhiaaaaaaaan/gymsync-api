const express = require('express');
const cors = require('cors');

const ejercicioRoutes = require('./routes/ejercicioRoutes');
const rutinaRoutes = require('./routes/rutinaRoutes');
const membresiaRoutes = require('./routes/membresiaRoutes');
const userRoutes = require('./routes/userRoutes');
const registroAvanceRoutes = require('./routes/registroAvanceRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "GymSync API - Mobile App Backend",
        version: "2.3.0",
        endpoints: {
            auth: "/auth (register, login, verify)",
            users: "/users",
            ejercicios: "/ejercicios",
            rutinas: "/rutinas",
            membresias: "/membresias",
            registrosAvance: "/registros-avance"
        },
        documentation: "See README.md for full API documentation"
    });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/ejercicios', ejercicioRoutes);
app.use('/rutinas', rutinaRoutes);
app.use('/membresias', membresiaRoutes);
app.use('/registros-avance', registroAvanceRoutes);

app.use((req, res) => {
    res.status(404).json({
        responseCode: 404,
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log('GymSync API is running on port ' + PORT);
    console.log('Local: http://localhost:' + PORT);
    console.log('Visit http://localhost:' + PORT + ' for available endpoints');
});

module.exports = app;
