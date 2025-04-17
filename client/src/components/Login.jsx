import React, { useState } from 'react';
import css from './Register.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');    
  const [password, setPassword] = useState('');    

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', 
        { email, password },  { withCredentials: true }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>Email:</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="Enter your email" 
              className={css.input} 
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>Password:</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="*******" 
              className={css.input} 
            />
          </div>
          <button type="submit" className={css.button}>Login</button>
        </form>
        <p className={css.text}>Not registered?</p>
        <Link to='/register' className={css.linkbtn}>Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
