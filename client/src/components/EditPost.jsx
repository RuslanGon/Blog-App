import React, { useEffect, useState } from 'react';
import css from './Create.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/getpostbyid/${id}`);
        setTitle(data.title);
        setDesc(data.desc);
      } catch (err) {
        console.error('Ошибка при получении поста:', err);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (file) formData.append('file', file);
  
    console.log('Данные формы перед отправкой:', { title, desc, file });
  
    try {
      await axios.put(`http://localhost:3001/editpost/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      navigate('/');
    } catch (err) {
      console.error('Ошибка при редактировании поста:', err);
    }
  };
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Post title..."
            className={css.input}
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name="desc"
            rows="10"
            placeholder="Write your post..."
            className={css.textarea}
          ></textarea>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className={css.fileInput}
          />
          <button className={css.button}>Edit Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
