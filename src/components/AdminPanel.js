import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("book[title]", title);
    formData.append("book[author]", author);
    formData.append("book[description]", description);
    formData.append("book[price]", price);
    formData.append("book[isbn]", isbn);
    formData.append("book[genre]", genre);
    formData.append("book[date]", date);
    formData.append("book[image]", imageFile);

    try {
      const res = await axios.post("https://rails-production-ed19.up.railway.app/api/books", formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "5vw",
        }}
      >
        Hello Admin
      </h1>
      <div>
        <h2
          style={{
            textAlign: "center",
            marginTop: "5vw",
          }}
        >
          Add book
        </h2>
        <Box
          component="main"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: "50vw",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              margin="normal"
              required
              id="title"
              label="title"
              name="title"
              value={title}
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              id="author"
              label="author"
              name="author"
              value={author}
              autoComplete="author"
              autoFocus
              onChange={(e) => setAuthor(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              id="description"
              label="description"
              name="description"
              type="textarea"
              value={description}
              autoComplete="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              type="file"
              autoFocus
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <TextField
              margin="normal"
              required
              id="price"
              label="price"
              name="price"
              value={price}
              autoComplete="price"
              autoFocus
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="date"
              label="date"
              name="date"
              type="date"
              value={date}
              autoComplete="date"
              autoFocus
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="isbn"
              label="isbn"
              name="isbn"
              value={isbn}
              autoComplete="isbn"
              autoFocus
              onChange={(e) => setIsbn(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              id="genre"
              label="genre"
              name="genre"
              value={genre}
              autoComplete="genre"
              autoFocus
              onChange={(e) => setGenre(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: "20vw",
                height: "50vw",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
              }}
            >
              Add Book
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AdminPanel;
