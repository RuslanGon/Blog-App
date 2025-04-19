import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from './Navbar.module.css';
import { userContext } from '../App.jsx';
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(userContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogout = () => {
    setUser({}); 
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true }) 
      .then(() => {
        console.log("User logged out");
        setIsLoggedIn(false); 
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  useEffect(() => {
    if (user.email) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, [user]);  

  return (
    <div className={css.navbar}>
      <div>
        <Link className={css.h2} to='/'>Blog App</Link>
      </div>
      <div>
        <Link className={css.link} to='/'>Home</Link>
        {user.email ? 
        <Link className={css.link} to='/create'>Create</Link> : 
        <></>
      }
        <Link className={css.link} to='/contact'>Contact</Link>
      </div>
      {
        isLoggedIn ? 
          <div>
            <input className={css.btn_logout} type="button" value="Logout" onClick={handleLogout} />
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
