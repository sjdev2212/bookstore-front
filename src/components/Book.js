import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import axios from 'axios';



const Book = () => {
    const { id } = useParams()
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5005/api/books/${id}`)
        .then(res => {
            console.log(res.data)
          setBook(res.data)
          setLoading(false)
        }
        )
        .catch(err => {
          console.log(err.data)
        }
        )
      }
        , [ id])

        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (!book) {
          return <div>Book not found</div>;
        }



  return (
    <div>
        <Container style={{ width: '800px',
         height: '400px',
         marginTop: '2vw' }}>
        <Card style={{ width: '800px', 
        height: '400px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '0px 0px',


         }}>
        <CardContent>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <h3>{book.description}</h3>

           
            <h4>{book.genre}</h4>

        

        </CardContent>
        <CardMedia
         component="img"
         height="180"
         image={book.image}
         alt={book.title}
        />
        </Card>
        </Container>

   

    </div>
  )
}

export default Book