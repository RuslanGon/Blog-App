import express from 'express';
import dotenv from 'dotenv';
import startServer from './db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { loginUser, registertUser } from './controllers/user.js';
// import { postUs } from './controllers/user.js';

dotenv.config(); 

const app = express();
app.use(express.json())
app.use(cors({origin: ['http://localhost:5173'],credentials: true}))
app.use(cookieParser())

// Register user
app.post('/register', registertUser)
// Login user
app.post('/login', loginUser)

startServer(app);