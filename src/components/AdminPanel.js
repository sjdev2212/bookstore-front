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
    const [imageFile, setImageFile] = useState(null);
    const [date, setDate] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('book[title]', title);
      formData.append('book[author]', author);
      formData.append('book[description]', description);
      formData.append('book[price]', price);
      formData.append('book[isbn]', isbn);
      formData.append('book[genre]', genre);
      formData.append('book[date]', date);
      formData.append('book[image]', imageFile);

      try {
        const res = await axios.post('http://localhost:5005/api/books', formData);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
  



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
              <input type="file" onChange={(e)  => setImageFile(e.target.files[0])} />
        
           
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