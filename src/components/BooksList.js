import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
 
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";

const BooksList = ({ logged, role }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}




  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/book/${id}`);
  
  };

  const deleteBook = (id) => {
    axios
      .delete(`https://rails-production-ed19.up.railway.app/api/books/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/");
       
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    axios
      .get("https://rails-production-ed19.up.railway.app/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.data);

      });
  }, [logged]);
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "5vw",
      }}
    >


  
      <Typography
        variant="h1"
        align="center"
        color="#FF5F1F"
        fontSize={"4vw"}
        fontWeight={"semibold"}
        marginBottom={"2vw"}
        margin={"2vw"}
      >
        Welcome to Bookshelf!
      </Typography>

  { loading ? (
    <PacmanLoader
    size={30}
    color={"#FF5F1F"}
    cssOverride={override}
    aria-label="Loading Spinner"
    data-testid="loader"
    />
  ) : 
  books.length === 0 ? (
    <Typography
    variant="h2"
    align="center"
    color="#FF5F1F"
    fontSize={"2vw"}
    fontWeight={"semibold"}
    marginBottom={"2vw"}
    margin={"2vw"}
  >
    No books found
  </Typography>
  ) : (



      

      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              onClick={() => redirect(book.id)}
              elevation={6}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                poiter: "cursor",
                ":hover": {
                  transform: "scale(1.04)",
                  transition: "all 0.5s ease-in-out",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                alt={book.title}
                src={book.image_url}
                sx={
                  {
                 width: "50%",
                  height: "50%",
                  objectFit: "cover",
                  margin: "auto",
                  marginTop: "2vw",
                  borderRadius: "10px",

                  }
                }
              />

              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography color="textSecondary">{`Author: ${book.author}`}</Typography>
                <Typography color="textSecondary">{`Price: ${book.price}`}</Typography>
              </CardContent>
              {logged ? (
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {role === "admin" ? (
                        <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete
                      </Button>
                  ) : (
                    <></>
                  )
                    
                  }
              
            
                </CardContent>
              ) : (
                <></>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
 
    </Container>
  );
};

export default BooksList;
