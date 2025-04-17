import React from 'react';
import css from './Register.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>Login</h2>
        <form>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>Email:</label>
            <input type="email" placeholder="Enter your email" className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>Password:</label>
            <input type="password" placeholder="*******" className={css.input} />
          </div>
          <button type="button" className={css.button}>Login</button>
        </form>
        <p className={css.text}>Not register</p>
        <Link to='/register' className={css.linkbtn}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
