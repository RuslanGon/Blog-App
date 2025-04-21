import express from 'express';
import dotenv from 'dotenv';
import startServer from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { loginUser, logoutUser, registertUser, verifyUser } from './controllers/user.js';
import { createPost, deletePost, editPost, getPostById, getPosts } from './controllers/post.js';
import { upload } from './controllers/post.js';

dotenv.config(); 

const app = express();

// Настройка CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://blog-app-zeta-six-50.vercel.app'], // Разрешенные источники
  credentials: true, // Для отправки cookie или токенов с запросами
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Маршруты
app.post('/register', registertUser);
app.post('/login', loginUser);
app.get('/', verifyUser, async (req, res) => {
  return res.json({ email: req.email, username: req.username });
});
app.post('/logout', logoutUser);
app.post('/create', verifyUser, upload.single('file'), createPost);
app.get('/getposts', getPosts);
app.get('/getpostbyid/:id', getPostById);
app.delete('/deletepost/:id', deletePost);
app.put('/editpost/:id', upload.single('file'), editPost);

// Запуск сервера
startServer(app);
