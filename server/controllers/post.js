import multer from "multer"
import PostModel from "../models/Post.js"

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Public/Image"); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
  export const upload = multer({ storage: storage });
  

// Create Post
export const createPost = async (req, res) => {
  try {
    const post = await PostModel.create({
      title: req.body.title,
      desc: req.body.desc, 
      file: req.file?.filename, 
    });
    res.status(201).json({
      message: "Пост успешно создан",
      user: post,
    });
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    res.status(500).json({
      message: "Не удалось создать пост",
      error: error.message,
    });
  }
};

// Get Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};

