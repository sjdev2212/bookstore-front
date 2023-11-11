import './App.css'
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {Routes, Route } from "react-router-dom";

/* import axios from 'axios'
import React, { useState, useEffect } from 'react' */

function App() {
/*   const [books , setBooks] = useState([])
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('') */

/* const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:5000/register', {
    user: {
      name: name,
      email: email,
      password: password
    }
   
  })
  .then(res => {
    console.log(res)
  }
  )
  .catch(err => {
    console.log(err)
  }
  )
}
 */

/*   useEffect(() => {
    axios.get('https://rails-production-9fc0.up.railway.app/api/books')
    .then(res => {
      setBooks(res.data)

    })
    .catch(err => {
      console.log(err)
    })
  }, [])
 */
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>


    </div>
    
  );
}

export default App;
