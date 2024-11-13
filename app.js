// server.js
require('dotenv').config();
const express = require('express');
const Database = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
cosnt Cors = require("cors")

const app = express();
app.use(Cors())
const PORT = process.env.PORT || 5000;

Database.connect();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
