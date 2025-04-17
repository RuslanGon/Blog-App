import React, { useContext } from "react";
import { Link } from "react-router-dom";
import css from './Navbar.module.css'
import {userContext} from '../App.jsx'

const Navbar = () => {
  const { user } = useContext(userContext);

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
      {
        user.email ?  
          <div>
            <input type="button" value="Logout"  />
          </div>
          :
          <div>
            <Link className={css.link} to='/register'>Register/Login</Link>
          </div>
      }
    </div>
  );
};
export default Navbar;
