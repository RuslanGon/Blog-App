import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../App";
import css from './Register.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.user) {
        setUser(response.data.user);
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
      console.error("Login error:", err);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h2 className={css.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>Email:</label>
            <input
              type="email"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>Password:</label>
            <input
              type="password"
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />
          </div>
          <button type="submit" className={css.button}>Login</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        <p className={css.text}>Don't have an account?</p>
        <Link to='/register' className={css.linkbtn}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
