// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Database = require('./config/db');

// Importar rutas
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
Database.connect();

// Middleware
app.use(helmet()); // Agrega seguridad en cabeceras HTTP
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); // Configuración de CORS
app.use(express.json());

// Rutas
app.use('/api', routes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Iniciar servidor
app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT}`);});
