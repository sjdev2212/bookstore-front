import './App.css'
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Book from './components/Book';
import AdminPanel from './components/AdminPanel';
import { useState, useEffect } from 'react';
import {Routes, Route } from "react-router-dom";
import {Toaster} from  'react-hot-toast'



function App() {


  const [logged , setLogged] = useState(false)

  const loggedIn = () => {
    localStorage.getItem('token') ? setLogged(true) : setLogged(false)
 }
 useEffect(() => {
  loggedIn();
}, [logged]);
  
  return (
    <div>
      <Toaster />
      <Navbar  logged={logged} 
      loggedIn={loggedIn}
      />
      
      <Routes>
        <Route path="/" element={<Home 
        logged={logged}
         />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn 
        loggedIn={loggedIn}
         />} />
        <Route path="/book/:id" element={<Book  
        logged={logged}
        />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>


    </div>
    
  );
}

export default App;
