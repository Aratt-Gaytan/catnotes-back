const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Para generar un identificador único para cada subject

const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: String, required: true },
    subjects: [{
        subjectId: { type: String, default: uuidv4 }, // Identificador único para cada subject
        subjectName: { type: String, required: true },
        subjectIcon: { type: String },
        subjectColor: { type: String },
        location: { type: String },
        locationIcon: { type: String },
        locationColor: { type: String },
        start: { type: String, required: true },
        end: { type: String, required: true },
        timeIcon: { type: String},
        timeColor: { type: String},
        reminders: [{ type: String }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
