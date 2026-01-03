import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Tipler
interface Question {
  _id: string;
  topic: string;
  text: string;
  difficulty: number;
  options: string[];
  currentScore?: number; // Backend'den artık bu da gelecek
  currentLevel?: number;
}

interface Feedback {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  feedback: string;
  newLevel: number;
  newScore: number; // Cevap dönünce güncel puan
}

const QuizPage = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Puanı ekranda tutmak için State
  const [score, setScore] = useState<number>(0);

  const studentId = "12345"; 
  const topic = "Software Engineering";

  // Soru Getirme
  const fetchNextQuestion = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedOption("");
    
    try {
      const res = await axios.post('http://localhost:3000/api/quiz/start', { studentId, topic });
      setQuestion(res.data);
      // Backend'den gelen puanı State'e yaz
      if (res.data.currentScore !== undefined) {
        setScore(res.data.currentScore);
      }
    } catch (err) {
      console.error(err);
      alert("Soru yüklenemedi!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  // Cevap Gönderme
  const handleSubmit = async () => {
    if (!selectedOption || !question) return;

    try {
      const res = await axios.post('http://localhost:3000/api/quiz/submit', {
        studentId,
        questionId: question._id,
        answer: selectedOption
      });

      setFeedback(res.data);
      
      // Cevap sonrası güncel puanı State'e işle
      if (res.data.newScore !== undefined) {
          setScore(res.data.newScore);
      }
    } catch (err) {
      alert("Cevap gönderilemedi!");
    }
  };

  if (loading) return <div style={{padding:'40px', textAlign:'center', fontSize:'18px'}}>Soru Hazırlanıyor...</div>;
  if (!question) return <div style={{padding:'20px'}}>Soru yok.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      
      {/* --- ÜST BİLGİ KARTI (PUAN & LEVEL) --- */}
      <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#2c3e50',
          color: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
          <div>
              <small>Konu</small>
              <div style={{fontWeight:'bold'}}>{question.topic}</div>
          </div>
          
          <div style={{textAlign:'right'}}>
              <div style={{fontSize:'12px', opacity: 0.8}}>MEVCUT SEVİYE PUANI</div>
              <div style={{fontSize:'24px', fontWeight:'bold', color: '#f1c40f'}}>
                 ★ {score} / 100
              </div>
          </div>
      </div>
      {/* -------------------------------------- */}

      <div style={{border:'1px solid #ddd', borderRadius:'10px', padding:'20px', boxShadow:'0 2px 5px rgba(0,0,0,0.05)'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            <span style={{background:'#eee', padding:'5px 10px', borderRadius:'15px', fontSize:'12px', fontWeight:'bold', color:'#555'}}>
                Zorluk Seviyesi: {question.difficulty}
            </span>
        </div>

        <h3 style={{marginTop:'0', fontSize:'20px', color:'#333'}}>{question.text}</h3>

        <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'20px'}}>
            {question.options.map((opt, idx) => (
            <button
                key={idx}
                onClick={() => setSelectedOption(opt)}
                disabled={feedback !== null}
                style={{
                padding: '15px',
                textAlign: 'left',
                border: selectedOption === opt ? '2px solid #3498db' : '1px solid #ddd',
                backgroundColor: selectedOption === opt ? '#ebf5fb' : 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s'
                }}
            >
                {opt}
            </button>
            ))}
        </div>

        {!feedback && (
            <button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            style={{
                marginTop:'25px', 
                width: '100%', 
                padding:'15px', 
                background: selectedOption ? '#27ae60' : '#bdc3c7', 
                color:'white', 
                border:'none', 
                borderRadius: '8px', 
                fontSize:'18px', 
                cursor: selectedOption ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
            }}
            >
            CEVABI GÖNDER
            </button>
        )}
      </div>

      {feedback && (
        <div style={{
            marginTop: '20px', 
            padding: '20px', 
            borderRadius: '10px',
            backgroundColor: feedback.isCorrect ? '#d4efdf' : '#fadbd8',
            border: `2px solid ${feedback.isCorrect ? '#27ae60' : '#c0392b'}`,
            animation: 'fadeIn 0.5s'
        }}>
            <h2 style={{margin:'0', color: feedback.isCorrect ? '#1e8449' : '#922b21'}}>
                {feedback.isCorrect ? "TEBRİKLER! 🎉" : "YANLIŞ CEVAP 😔"}
            </h2>
            
            {!feedback.isCorrect && (
                 <div style={{marginTop:'10px', padding:'10px', background:'rgba(255,255,255,0.6)', borderRadius:'5px'}}>
                    <strong>Doğru Cevap:</strong> {feedback.correctAnswer}
                 </div>
            )}

            <p style={{fontSize:'16px', lineHeight:'1.5'}}>
                <strong>Açıklama:</strong> {feedback.explanation}
            </p>

            <button 
                onClick={fetchNextQuestion}
                style={{
                    padding:'12px 25px', 
                    background:'#2980b9', 
                    color:'white', 
                    border:'none', 
                    borderRadius:'5px', 
                    cursor:'pointer', 
                    fontSize:'16px',
                    float: 'right',
                    marginTop: '10px'
                }}
            >
                Sonraki Soru ➡️
            </button>
            <div style={{clear:'both'}}></div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;