import React from "react";
import Container from "@mui/material/Container";
import BooksList from "./BooksList";

const Home = ({ logged }) => {
  return (
    <main>
    
      <Container maxWidth="lg">
        <BooksList logged={logged} />
      </Container>
    </main>
  );
};

export default Home;
