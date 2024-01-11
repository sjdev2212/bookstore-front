import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";
import axios from "axios";

const Book = ({ logged, role, userId }) => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  console.log(userId);

  const updateBook = (id) => {
    navigate(`/books/${id}`);
  };

  const deleteBook = (id) => {
    axios
      .delete(`https://rails-production-ed19.up.railway.app/api/books/${id}`)
      .then((res) => {
        navigate("/");
        toast.success("Book deleted!", {
          duration: 4000,
          position: "top-center",
          icon: "👏",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#D64430",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 6,
    fontSize: "1.3vw",
    fontWeight: "semibold",
    color: "white",
  };

  const StyledFavoriteIcon = styled(FavoriteIcon)`
    margin-right: 12vw;
    color: #ff5f1f;
    font-size: 3vw;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: red;
      scale: 1.2;
      transition: 1.2s ease;
    }
  `;
  const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
    color: #ff5f1f;
    font-size: 3vw;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: red;
      scale: 1.2;
      transition: 0.8s ease;
    }
  `;
  const addToFavorites = (bookId, user) => {
try {
  console.log(bookId, user)
  axios.post(`http://localhost:5005/api/favorites`, {
    book_id: bookId,
    user_id: user,
  })
  .then((res) => {
    console.log(res)
    toast.success("Book added to favorites!", {
      duration: 4000,
      position: "top-center",
      icon: "👏",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
  })

  }
  catch (err) {
    console.log(err)
  }
  };
    
  useEffect(() => {
    axios
      .get(`https://rails-production-ed19.up.railway.app/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <Container style={{ width: "800px", height: "400px", marginTop: "2vw" }}>
        <Card
          style={{
            width: "800px",
            height: "600px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "0px 0px",
            marginTop: "5vw",
            border: "1px solid #FF5F1F",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h2"
                align="center"
                color="#FF5F1F"
                fontSize={"3.1vw"}
                fontWeight={"normal"}
                marginBottom={"1vw"}
              >
                Title:
              </Typography>
              <Typography
                variant="h2"
                align="center"
                color="#FF5F1F"
                fontSize={"3.1vw"}
                fontWeight={"semibold"}
                marginBottom={"1vw"}
                sx={{
                  textDecoration: "underline",
                }}
              >
                {book.title}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              color="gray"
              fontSize={"2.1vw"}
              fontWeight={"semibold"}
            >
              <h2>Author: {book.author}</h2>
            </Typography>
            <Typography
              variant="p"
              color="gray"
              fontSize={"1.2vw"}
              fontWeight={"semibold"}
            >
              Published: {book.date}
            </Typography>
            <br></br>
            <br></br>

            <Typography
              variant="p"
              color="gray"
              fontSize={"1.2vw"}
              fontWeight={"semibold"}
            >
              Isbn: {book.isbn}
            </Typography>
            <br></br>
            <br></br>

            <Typography
              variant="p"
              color="gray"
              fontSize={"1.1vw"}
              fontWeight={"semibold"}
            >
              Summary: {book.description.slice(0, 15)}...
              <Link onClick={handleOpen}>read more</Link>
            </Typography>
            <br></br>
            <br></br>
            <Typography
              variant="p"
              color="gray"
              fontSize={"1.1vw"}
              fontWeight={"semibold"}
            >
              Price: ${book.price}
            </Typography>
            <br></br>
            <br></br>
            <Typography
              variant="p"
              color="gray"
              fontSize={"1.1vw"}
              fontWeight={"semibold"}
            >
              Genre: {book.genre}
            </Typography>
            <br></br>
            <br></br>
            {logged ? (
              role === "user" ? (
                <>
                  <StyledFavoriteIcon 
                  onClick={() => addToFavorites(book.id, userId)}
                   />
                  <StyledShoppingCartIcon />{" "}
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => updateBook(book.id)}
                  >
                    Update
                  </Button>
                </Box>
              )
            ) : (
              ""
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  color="white"
                  fontSize={"2.5vw"}
                  fontWeight={"semibold"}
                  marginBottom={"1vw"}
                  align="center"
                >
                  {book.title}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    color: "white",
                    fontSize: "1.5vw",
                    fontWeight: "semibold",
                    marginBottom: "1vw",
                    textAlign: "justify",
                    lineHeight: "1.3",
                  }}
                >
                  {book.description}
                </Typography>
              </Box>
            </Modal>
          </CardContent>
          <CardMedia
            component="img"
            height="500"
            image={book.image}
            alt={book.title}
            sx={{
              width: "420px",
              height: "550px",
              marginTop: "2vw",
              size: "cover",
              borderRadius: "10px",
            }}
          />
        </Card>
      </Container>
    </div>
  );
};

export default Book;
