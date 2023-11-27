import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BooksList = () => {
     const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('https://rails-production-ed19.up.railway.app/api/books')
        .then(res => {
          console.log(res.data)
          setBooks(res.data)
        }
        )
        .catch(err => {
          console.log(err.data)
        }
        )
      }
        , [])
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                alt={book.title}
                src={book.image} // Replace with the actual image source
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography color="textSecondary">{`Author: ${book.author}`}</Typography>
                <Typography color="textSecondary">{`Price: ${book.price}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksList;