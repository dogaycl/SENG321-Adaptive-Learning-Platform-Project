const QuizService = require('../services/QuizService');

exports.startQuiz = async (req, res) => {
  try {
    const data = await QuizService.generateQuestion(req.body.studentId, req.body.topic);
    
    if (!data || !data.question) return res.status(404).json({ message: "Bu seviyeye uygun soru kalmadı!" });

    // Sorunun içine 'currentScore' ve 'currentLevel' bilgisini de ekleyip gönderiyoruz
    const responseData = {
        ...data.question.toObject(), // Soru verileri (text, options vs.)
        currentScore: data.currentScore,
        currentLevel: data.currentLevel
    };

    // Cevabı gizle (Kopya çekilmesin)
    const { correctAnswer, ...questionForUser } = responseData;
    
    res.json(questionForUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { studentId, questionId, answer } = req.body;
    const result = await QuizService.evaluateAnswer(studentId, questionId, answer);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};