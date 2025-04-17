import express from 'express';
import dotenv from 'dotenv';
import startServer from './db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { loginUser, logoutUser, registertUser, verifyUser, } from './controllers/user.js';
import { decode } from 'jsonwebtoken';
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
// verifyUser
app.get('/', verifyUser, async (req, res) => {
    return res.json({email: req.email, username: req.username})
})

// Logout
app.post('/logout', logoutUser)


startServer(app);