import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Book from "./components/Book";
import AdminPanel from "./components/AdminPanel";
import Favorites from "./components/Favorites";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import UpdateBook from "./components/UpdateBook";

function App() {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("http://localhost:5005/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        setUserName(res.data.user.name);
        setUserId(res.data.user.id);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_name", res.data.user.name);
        toast.success(`Welcome! ${userName}`, {
          duration: 4000,
          position: "top-center",
          icon: "👏",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        loggedIn();
        isAdmin();
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          duration: 4000,
          position: "top-center",
          icon: "😢",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      });
  };

  console.log(userId)

  const loggedIn = () => {
    localStorage.getItem("token") ? setLogged(true) : setLogged(false);
  };

  const isAdmin = () => {
    localStorage.getItem("role") === "admin"
      ? setRole("admin")
      : setRole("user");
  };

  useEffect(() => {
    loggedIn();
    isAdmin();
    localStorage.getItem("user_name") && setUserName(localStorage.getItem("user_name"));
    localStorage.getItem("user_id") && setUserId(localStorage.getItem("user_id"));
  }, [logged, role, userName, userId]);
  return (
    <div>
      <Toaster />
      <Navbar logged={logged} loggedIn={loggedIn} role={role} />

      <Routes>
        <Route path="/" element={<Home logged={logged} role={role} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={
            <SignIn
              loggedIn={loggedIn}
              isAdmin={isAdmin}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites logged={logged} role={role} userId={userId} />}
        />
        <Route
          path="/book/:id"
          element={<Book logged={logged} role={role} userId={userId} />}
        />
        <Route
          path="/books/:id"
          element={<UpdateBook logged={logged} role={role} />}
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
