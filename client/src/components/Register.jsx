import React, { useState } from 'react';
import css from './Register.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Register = () => {

const [username, setUsername] = useState()   
const [email, setEmail] = useState()    
const [password, setPassword] = useState()    


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', 
      { username, email, password });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>Username:</label>
            <input onChange={(e) => setUsername(e.target.value)} 
            type="text" placeholder="Enter your name" className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>Email:</label>
            <input onChange={(e) => setEmail(e.target.value)}
             type="email" placeholder="Enter your email" className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>Password:</label>
            <input onChange={(e) => setPassword(e.target.value)}
             type="password" placeholder="*******" className={css.input} />
          </div>
          <button type="submit" className={css.button}>Sign Up</button>
        </form>
        <p className={css.text}>Already have an account?</p>
        <Link to='/login' className={css.linkbtn}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
