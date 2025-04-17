import React from 'react';
import css from './Register.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>Sign Up</h2>
        <form>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>Username:</label>
            <input type="text" placeholder="Enter your name" className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>Email:</label>
            <input type="email" placeholder="Enter your email" className={css.input} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>Password:</label>
            <input type="password" placeholder="*******" className={css.input} />
          </div>
          <button type="button" className={css.button}>Sign Up</button>
        </form>
        <p className={css.text}>Already have an account?</p>
        <Link to='/login' className={css.linkbtn}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
