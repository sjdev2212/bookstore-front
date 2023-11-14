import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import logo from '../images/logo.png'


const Navbar = () => {
  return (
    <>
  <AppBar position="static" sx={{ backgroundColor: '#D64430', height: "5vw" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  <img src={logo} style={{
    width: "150px",
    height: "60px",
    marginRight: "10px",

  }} alt="logo" width="50" height="50" />
        </Typography>

        {/* Search Bar */}
        <div sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <InputBase
            placeholder="Search..."
            sx={{ ml: 1, width: '100%' }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        {/* Login/Sign-in Buttons */}

        <Button color="inherit"> 
        <Link  to="/signin">
        Login
       </Link>
       </Button>
        <Button color="inherit">
          <Link to="/signup">
          Sign Up
          </Link>
          </Button>

        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar