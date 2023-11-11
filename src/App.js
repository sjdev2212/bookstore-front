import './App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [books , setBooks] = useState([])
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://localhost:3001/register', {
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


  useEffect(() => {
    axios.get('https://rails-production-9fc0.up.railway.app/api/books')
    .then(res => {
      setBooks(res.data)

    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <section>
      <h1>Books</h1>
      {books.map(book => {
        return (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.price}</p>
          </div>
        )
      })}
      </section>
      <section>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} >
          <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </section>

    </div>
  );
}

export default App;
