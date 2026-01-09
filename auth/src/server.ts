import express from 'express';
import cors from 'cors';
import { login } from './controllers/AuthController'; 

const app = express();
app.use(express.json());
app.use(cors());


app.post('/api/login', login);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});