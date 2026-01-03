const Question = require('../models/Question');
const Progress = require('../models/Progress');

exports.generateQuestion = async (studentId, topic) => {
  let progress = await Progress.findOne({ studentId, topic });
  
  // Kayıt yoksa varsayılan değerler
  const currentLevel = progress ? progress.currentLevel : 1;
  const currentScore = progress ? progress.masteryScore : 0; // Puanı buradan çekiyoruz

  const questions = await Question.find({ topic, difficulty: currentLevel });
  
  if (questions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];

  // Sadece soruyu değil, puan ve seviyeyi de döndür
  return {
      question: question,
      currentScore: currentScore,
      currentLevel: currentLevel
  };
};

exports.evaluateAnswer = async (studentId, questionId, answer) => {
  const question = await Question.findById(questionId);
  const isCorrect = question.correctAnswer === answer;
  
  let progress = await Progress.findOne({ studentId, topic: question.topic });
  if (!progress) {
      progress = new Progress({ studentId, topic: question.topic, currentLevel: 1, masteryScore: 0 });
  }

  // --- PUANLAMA SİSTEMİ (GÜNCELLENDİ) ---
  // Hedef: 100 Puan. Her doğru 50 Puan.
  // Böylece: 0 -> 50 (Görünür) -> 100 (Level Up)
  
  if (isCorrect) {
    progress.masteryScore += 50; 

    // 100 puana ulaşınca seviye atla
    if (progress.masteryScore >= 100 && progress.currentLevel < 5) {
        progress.currentLevel++;
        progress.masteryScore = 0; // Yeni seviye için puanı sıfırla
    }
  } else {
    // Yanlışta puan düş
    progress.masteryScore = Math.max(0, progress.masteryScore - 20);
    
    // Puan bittiyse seviye düş
    if (progress.masteryScore === 0 && progress.currentLevel > 1) {
        progress.currentLevel--;
    }
  }
  
  await progress.save();

  return { 
    isCorrect, 
    correctAnswer: question.correctAnswer,
    explanation: question.explanation, 
    newLevel: progress.currentLevel,
    newScore: progress.masteryScore, // Yeni puanı Frontend'e gönder
    feedback: isCorrect ? "Süper! Doğru Cevap 🔥" : "Olsun, öğreniyoruz."
  };
};