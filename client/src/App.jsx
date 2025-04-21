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
import PostCard from "./components/PostCard.jsx";
import EditPost from "./components/EditPost.jsx";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://blog-app-sx5g.onrender.com/", { withCredentials: true });
        // http://localhost:3001/
        console.log(response.data);  
        if (response.data.email) {
          setUser(response.data);  
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<PostCard />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
