import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken';
import UserModel from '../models/User.js'; 

// Register user
export const registertUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, email: newUser.email },
      process.env.MY_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'None', // или 'None' если ты на HTTPS
      secure: true,    // true, если у тебя HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    })

    res.status(201).json({
      registered: true,
      login: true
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.MY_SECRET_KEY, 
      { expiresIn: '1h' } // Токен истечет через 1 час
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: 'None'   
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// verifyUser
export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY);
    req.email = decoded.email;
    req.username = decoded.username;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    // Удаляем куку с токеном
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Server error during logout' });
  }
};



