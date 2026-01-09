const mongoose = require('mongoose');
const ProgressSchema = new mongoose.Schema({
  studentId: String,
  topic: String,
  currentLevel: { type: Number, default: 1 },
  masteryScore: { type: Number, default: 0 }
});
module.exports = mongoose.model('Progress', ProgressSchema);