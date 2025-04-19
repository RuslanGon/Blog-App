import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './PostCard.module.css';

const PostCard = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getpostbyid/${id}`);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error('Ошибка при получении поста:', error);
      }
    };
    fetchPostById();
  }, [id]);

  return (
    <div className={css.postCardContainer}>
      <div className={css.postCard}>
        <img src={`http://localhost:3001/Image/${post.file}`} alt={post.title} />
        <div className={css.postCardContent}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
