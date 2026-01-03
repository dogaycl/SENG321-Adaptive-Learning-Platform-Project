const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  topic: String,
  text: String,
  difficulty: Number,
  options: [String],
  correctAnswer: String,
  explanation: String
});
module.exports = mongoose.model('Question', QuestionSchema);