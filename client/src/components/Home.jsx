import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getposts');
        console.log(response.data);
      } catch (error) {
        console.error('Ошибка при получении постов:', error);
      }
    };
  
    fetchPosts();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home