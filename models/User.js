const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Puede ser opcional si se registra con Google OAuth
    googleId: { type: String }, // Para guardar el ID de Google OAuth2
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
