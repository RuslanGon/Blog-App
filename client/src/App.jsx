import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Create from "./components/Create.jsx";
import Contact from "./components/Contact.jsx";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
 
export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:3001/", { withCredentials: true });
      setUser(response.data);
      console.log(response.data);
    };
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
