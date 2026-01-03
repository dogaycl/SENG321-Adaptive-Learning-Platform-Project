const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');

router.post('/start', QuizController.startQuiz);
router.post('/submit', QuizController.submitAnswer);

module.exports = router;