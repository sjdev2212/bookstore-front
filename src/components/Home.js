import React from "react";
import Container from "@mui/material/Container";
import BooksList from "./BooksList";

const Home = ({ logged,role }) => {
  return (
    <main>
    
      <Container maxWidth="lg">
        <BooksList 
        logged={logged}
        role={role}
         />
      </Container>
    </main>
  );
};

export default Home;
