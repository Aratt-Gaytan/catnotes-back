// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Corrección aquí
const Database = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const notificationRouter = require('./routes/notificationRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Uso correcto de CORS
app.use(express.json());

// Conectar a la base de datos
Database.connect();

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/notification', notificationRouter);

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
