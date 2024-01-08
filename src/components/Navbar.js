import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import logo from "../images/logo.png";
import { toast } from "react-hot-toast";

const Navbar = ({ logged, loggedIn }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#D64430", height: "5vw", zIndex: "1000" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              style={{
                width: "150px",
                height: "60px",
                marginRight: "10px",
              }}
              alt="logo"
              width="50"
              height="50"
            />
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "1.5vw",
                fontWeight: "semibold",
                marginBottom: "1vw",
                textAlign: "justify",
                lineHeight: "1.3",
              }}
            >
              Admin
            </Link>
          </Typography>

          {/* Search Bar */}
          <div sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <InputBase
              placeholder="Search..."
              sx={{ ml: 1, width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          {logged ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                toast.success("Until next time!", {
                  duration: 4000,
                  position: "top-center",
                  icon: "👏",
                  iconTheme: {
                    primary: "#000",
                    secondary: "#fff",
                  },
                });
                loggedIn();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/signin">
              Login
            </Button>
          )}

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
