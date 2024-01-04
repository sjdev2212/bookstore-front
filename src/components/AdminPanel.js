import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AdminPanel = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [isbn, setIsbn] = useState('')
    const [genre, setGenre] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            title,
            author,
            description,
            price,
            isbn,
            genre,
            image_url,
            date
        }
        try {
            const res = await axios.post('http://localhost:5005/api/books', data)
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }

    }


  return (
    <div>
    <h1 style={{
        textAlign: "center",
        marginTop: "5vw",

    }}>
        Hello Admin
    </h1>
    <div>
        <h2>
            add book
        </h2>
        <form 
        onSubmit={handleSubmit}
        >
            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
             />
            <input
             type="text" 
             placeholder="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}

              />
            <input 
            type="text" 
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             />
            <input type="file"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}

             />
           
            <input 
            type="number"
             placeholder="price" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}

             />
            <input
             type="date" 
             placeholder="date of publication"
                value={date}
                onChange={(e) => setDate(e.target.value)}

              />
            <input
             type="number"
              placeholder="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
               />
            <input
             type="text" 
             placeholder="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            <button type="submit">add</button>
        </form>
      

    </div>
    
    </div>
  )
}

export default AdminPanel