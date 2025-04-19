import multer from "multer"
import PostModel from "../models/Post.js"
import fs from 'fs/promises';
import path from 'path';

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/Image"); 
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

// Get post by id
export const getPostById = async (req, res) => {
  const { id } = req.params; 
  try {
    const post = await PostModel.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Ошибка при получении поста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Delete post by id

const IMAGE_FOLDER = path.join(process.cwd(), 'public', 'Image');

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    // Удаление файла картинки, если он существует
    if (post.file) {
      const filePath = path.join(IMAGE_FOLDER, post.file);
      try {
        await fs.unlink(filePath);
        console.log('Файл удалён:', filePath);
      } catch (fileErr) {
        console.warn('Файл не найден или уже удалён:', filePath);
      }
    }
    // Удаление самого поста
    await PostModel.findByIdAndDelete(id);

    res.json({ message: 'Пост успешно удалён' });
  } catch (error) {
    console.error('Ошибка при удалении поста:', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении поста' });
  }
};

// Edit post by id
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    let updatedData = { title, desc };

    console.log(`Редактирование поста с id: ${id}`);

    const post = await PostModel.findById(id);
    if (!post) {
      console.log('Пост не найден');
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if (req.file) {
      // Удаление старого файла
      if (post.file) {
        const oldFilePath = path.join(IMAGE_FOLDER, post.file);
        try {
          await fs.unlink(oldFilePath);
          console.log('Старый файл удалён:', oldFilePath);
        } catch (err) {
          console.warn('Ошибка при удалении старого файла:', err.message);
        }
      }
      updatedData.file = req.file.filename;
      console.log('Новый файл добавлен:', req.file.filename);
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, { new: true });
    console.log('Пост успешно обновлён:', updatedPost);
    res.json({ message: 'Пост успешно обновлён' });
  } catch (error) {
    console.error('Ошибка при редактировании поста:', error);
    res.status(500).json({ message: 'Ошибка сервера при редактировании поста', error: error.message });
  }
};
