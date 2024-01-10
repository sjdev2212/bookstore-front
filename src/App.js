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
import UpdateBook from './components/UpdateBook';



function App() {


  const [logged , setLogged] = useState(false)
  const [role , setRole] = useState('')

  const loggedIn = () => {
    localStorage.getItem('token') ? setLogged(true) : setLogged(false)
 }

 const isAdmin = () => {
  localStorage.getItem('role') === 'admin' ? setRole('admin') : setRole('user')
}
 useEffect(() => {
  loggedIn();
  isAdmin();
}, [logged, role]);
  console.log(role);
  return (
    <div>
      <Toaster />
      <Navbar  logged={logged} 
      loggedIn={loggedIn}
      role={role}
      />
      
      <Routes>
        <Route path="/" element={<Home 
        logged={logged}
        role={role}
         />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn 
        loggedIn={loggedIn}
        isAdmin={isAdmin}
         />} />
        <Route path="/book/:id" element={<Book  
        logged={logged}
        role={role}
        />} />
          <Route path="/books/:id" element={<UpdateBook
        logged={logged}
        role={role}
        />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>


    </div>
    
  );
}

export default App;
