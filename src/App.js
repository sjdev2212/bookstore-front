import './App.css'
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import { useState } from 'react';
import {Routes, Route } from "react-router-dom";

/* import axios from 'axios'
import React, { useState, useEffect } from 'react' */

function App() {


  const [logged , setLogged] = useState(false)

  const loggedIn = () => {
    localStorage.getItem('token') ? setLogged(true) : setLogged(false)


    

  }





  return (
    <div>
      <Navbar  logged={logged} 
      loggedIn={loggedIn}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>


    </div>
    
  );
}

export default App;
