import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const deleteFromFavorites = (bookId, user) => {
    try {
      axios
        .delete(`https://rails-production-ed19.up.railway.app/api/favorites/${user}/${bookId}`, {})
        .then((res) => {
          localStorage.removeItem("favorite");
          window.location.reload();
          toast.success("Book deleted from favorites!", {
            duration: 4000,
            position: "top-center",
            icon: "👏",
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`https://rails-production-ed19.up.railway.app/api/favorites/${user_id}`)
      .then((res) => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  return (
    <>
      {loading ? (
        <PacmanLoader
          size={30}
          color={"#FF5F1F"}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, 
              marginTop: "10vw",
              display: "flex",
              justifyContent: "center",
            fontWeight: "bold",
            color: "#FF5F1F", }}
          >
            Favorites
          </Typography>
          { favorites.length === 0 ? (
            <>
            <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, 
              marginTop: "10vw",
              display: "flex",
              justifyContent: "center",
            fontWeight: "bold",
            color: "#FF5F1F", }}
          >
            You don't have any favorites yet!
          </Typography>
          </>
          ) : (
          <List
            sx={{
              width: "98vw",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {favorites.map((item) => (
              <>
              <Link to={`/book/${item.book.id}`} style={{ textDecoration: "none" }}>
                <ListItem
                  key={item.id}
                  sx={{
                    width: "90vw",
                    margin: "auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    border: "1px solid #FF5F1F",
                    borderRadius: "10px",
                    ":hover": {
                      transform: "scale(1.04)",
                      transition: "all 0.5s ease-in-out",
                      cursor: "pointer",
                   
                   
                    },
                  }}
                >
                  
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.book.image_url}
                      sx={{
                        width: "7vw",
                        height: "7vw",
                        borderRadius: "10%",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                  primary="Title:"
                  secondary={item.book.title}
                  sx={{
                    fontSize: "1.7vw",
                    fontWeight: "bold",
                    color: "#FF5F1F",
                  }}

                   />
                  <ListItemText 
                  primary="Author:"
                   secondary={item.book.author}
                   sx={{
                    fontSize: "1.7vw",
                    fontWeight: "bold",
                    color: "#FF5F1F",
                  }}
                   
                   />

                  <Button
                  
                    onClick={() => deleteFromFavorites(item.book.id, user_id)}
                    sx={{
                      fontSize: "0.7vw",
                      fontWeight: "bold",
                      backgroundColor: "#FF5F1F",
                      color: "white",
                      borderRadius: "10px",
                      width: "10vw",
                      height: "2.8vw",
                      ":hover": {
                        transform: "scale(1.04)",
                   
                        backgroundColor: "white",
                        color: "#FF5F1F",
                      },
                 

                  }}
                  >
                    Remove from favorites
                  </Button>
                </ListItem>
                </Link>

                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
          )}
        </>
      )}
    </>
  );
};

export default Favorites;
