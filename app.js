// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');

const Database = require('./config/db');

// Importar rutas
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
Database.connect();

// Middleware
app.use(helmet()); // Agrega seguridad en cabeceras HTTP
app.use(cors()); // Configuración de CORS
app.use(express.json());

// Rutas
app.use('/api', routes);

app.get('/api/horoscope/:sign', async (req, res) => {
  try {
    const response = await axios.get(`http://ohmanda.com/api/horoscope/${req.params.sign}/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Iniciar servidor
app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT}`);});
