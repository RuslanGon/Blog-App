import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from './Navbar.module.css';
import { userContext } from '../App.jsx';
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(userContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Локальное состояние для отслеживания логина

  // Логика кнопки Logout
  const handleLogout = () => {
    setUser({});  // Очищаем данные пользователя
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })  // Логика для выхода
      .then(() => {
        console.log("User logged out");
        setIsLoggedIn(false);  // Обновляем состояние после выхода
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  useEffect(() => {
    if (user.email) {
      setIsLoggedIn(true); // Если есть email, то пользователь залогинен
    } else {
      setIsLoggedIn(false); // Если нет email, то пользователь не залогинен
    }
  }, [user]);  // Эффект сработает каждый раз, когда user изменится

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
        isLoggedIn ?  // Отображаем кнопку Logout, если пользователь залогинен
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
