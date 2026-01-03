const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Yola dikkat

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/sengQuizDB')
  .then(() => console.log('✅ MongoDB Bağlandı Agam!'))
  .catch(err => console.error('❌ DB Hatası:', err));

app.use('/api/quiz', apiRoutes);

app.listen(3000, () => console.log('🚀 Server 3000 portunda uçuşa hazır!'));