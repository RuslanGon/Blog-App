import axios from 'axios'
import React, { useEffect, useState } from 'react'
import css from './Home.module.css'

const Home = () => {

  const [posts, setPost] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getposts');
        console.log(response.data);
        setPost(response.data)
      } catch (error) {
        console.error('Ошибка при получении постов:', error);
      }
    };
  
    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        {posts.map((post) => (
          <div className={css.post}>
            <img
              src={`http://localhost:3001/Image/${post.file}`} alt={post.title}/>
            <div className={css.post_text}>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home