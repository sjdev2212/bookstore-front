import React from 'react'
import Container from '@mui/material/Container'
import BooksList from './BooksList'

const Home = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <BooksList />
      </Container>


    </main>
  )
}

export default Home