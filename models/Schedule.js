const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
