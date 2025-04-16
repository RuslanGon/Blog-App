import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <h3>Blog App</h3>
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create</Link>
        <Link to='/contact'>Contact</Link>
      </div>
      <div>
        <h5>Register/Login</h5>
      </div>
    </div>
  );
};

export default Navbar;
