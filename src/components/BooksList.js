import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BooksList = ({ logged }) => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const tester = (id) => {
    navigate(`/book/${id}`);
    console.log(id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/books")
      .then((res) => {
        setBooks(res.data);
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

      {books.length === 0 ? "no books to show" : ""}

      <Grid container spacing={3}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              onClick={() => tester(book.id)}
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
                ></CardContent>
              ) : (
                <></>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2vw",
          marginBottom: "2vw",
        }}
      />
    </Container>
  );
};

export default BooksList;
