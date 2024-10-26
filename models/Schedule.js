const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: String, required: true },
    subjects: [{
        subjectName: { type: String, required: true },
        subjectIcon: { type: String, required: true },
        subjectColor: { type: String, required: true },
        locationIcon: { type: String, required: true },
        locationColor: { type: String, required: true },
        timeIcon: { type: String, required: true },
        timeColor: { type: String, required: true },
        reminders: [{ type: String }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
