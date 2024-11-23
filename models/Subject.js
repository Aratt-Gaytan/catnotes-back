const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  scheduleId: { 
    type: mongoose.Schema.Types.ObjectId, // Almacenado como ObjectId
    ref: 'Schedule', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subjectName: { type: String, required: true },
  location: { type: String },
  start: { type: String, required: true },
  end: { type: String, required: true },
  reminders: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);