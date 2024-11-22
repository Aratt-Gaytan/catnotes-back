const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const subjectSchema = new mongoose.Schema({
  subjectId: { type: String, default: uuidv4 }, // Identificador único del subject
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true }, // Relación con Schedule
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con el usuario
  subjectName: { type: String, required: true }, // Nombre del subject
  location: { type: String }, // Ubicación
  start: { type: String, required: true }, // Hora de inicio
  end: { type: String, required: true }, // Hora de finalización
  reminders: [{ type: String }] // Recordatorios
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
