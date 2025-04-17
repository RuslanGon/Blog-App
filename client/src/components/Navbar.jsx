import React from "react";
import { Link } from "react-router-dom";
import css from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={css.navbar}>
      <div>
        <h3>Blog App</h3>
      </div>
      <div>
        <Link className={css.link} to='/'>Home</Link>
        <Link className={css.link} to='/create'>Create</Link>
        <Link className={css.link} to='/contact'>Contact</Link>
      </div>
      <div>
        <h5>Register/Login</h5>
      </div>
    </div>
  );
};

export default Navbar;
