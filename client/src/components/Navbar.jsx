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
      <Link className={css.link} to='/register'>Register/Login</Link>


      </div>
    </div>
  );
};

export default Navbar;
