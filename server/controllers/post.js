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
  console.log(req.file);
}

