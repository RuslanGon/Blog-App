import React, { useState } from 'react';
import css from './Create.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {

const [title, setTitle] = useState()  
const [desc, setDesc] = useState()
const [file, setFile] = useState()
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("file", file); 

  try {
    const response = await axios.post("https://blog-app-sx5g.onrender.com/create", formData,
    // http://localhost:3001/create
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.data && response.data.user) {
      navigate("/");
    }
  } catch (err) {
    console.error("Create post error:", err);
  }
};

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setTitle(e.target.value)}
           type="text" placeholder="Post title..." className={css.input} />
          <textarea onChange={(e) => setDesc(e.target.value)}
            name="desc"
            id="desc"
            rows="10"
            placeholder="Write your post..."
            className={css.textarea}
          ></textarea>
          <input onChange={(e) => setFile(e.target.files[0])}
           type="file" className={css.fileInput} />
          <button className={css.button}>Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
