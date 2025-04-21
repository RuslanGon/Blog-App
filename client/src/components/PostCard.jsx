import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import css from './PostCard.module.css';

const PostCard = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await axios.get(`https://blog-app-sx5g.onrender.com/getpostbyid/${id}
        `);
        // http://localhost:3001/getpostbyid/${id}
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error('Ошибка при получении поста:', error);
      }
    };
    fetchPostById();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://blog-app-sx5g.onrender.com/deletepost/${id}
      `);
      // http://localhost:3001/deletepost/${id}
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      alert('Не удалось удалить пост');
    }
  }

  return (
    <div className={css.postCardContainer}>
      <div className={css.postCard}>
        <Link className={css.link} to='/'>🔙</Link>
        <img src={`https://blog-app-sx5g.onrender.com/Image/${post.file}`} alt={post.title} />
        {/* http://localhost:3001/Image/${post.file} */}
        <div className={css.postCardContent}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
        </div>
       <div className={css.div_btn}>
       <Link to={`/edit/${post._id}`} className={css.btn}>Edit</Link>
      <Link onClick={handleDeletePost} className={css.btn}>Delete</Link>
       </div>
      </div>
    </div>
  );
}

export default PostCard;
