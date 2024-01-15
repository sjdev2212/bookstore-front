import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id");


  const deleteFromFavorites = (bookId, user) => {
    try {
      console.log(bookId, user)
      axios.delete(`http://localhost:5005/api/favorites/${user}/${bookId}`, {
 })
      .then((res) => {
window.location.reload()
        toast.success("Book deleted from favorites!", {
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
      }



  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/favorites/${user_id}`)
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  return (
    <>
    {
        loading ? (
            <PacmanLoader color={"#000"} loading={loading} size={50} />
        ) : (
            <>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, marginTop: '10vw' }}>
                Favorites

            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex'
            , flexDirection: 'column'
            , alignItems: 'center'
            , justifyContent: 'center'
        
        
        }}>
            {favorites.map((item) => (
                <>
                <ListItem
                key={item.id}
                sx={
                    {
                        width: '88vw',
                        margin : 'auto',
                        display: 'grid',
                     gridTemplateColumns: '1fr 1fr 1fr 1fr',
                         border : '1px solid black'
                    }
                }
                
                >
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.book.image_url}
                    sx={
                        {
                            width: '7vw',
                            height : '7vw',
                            borderRadius : '10%',
                            
                        }
                    }
                    />
                    </ListItemAvatar>
                    <ListItemText
                    primary={item.book.title}
              
                   
            
                    />
                    <ListItemText
                    primary={item.book.author}
              
                   
            
                    />

                    <Button variant="contained" color="error" onClick={() => deleteFromFavorites(item.book.id, user_id)}>Delete</Button>

                </ListItem>
                

                <Divider variant="inset" component="li" />
                </>
            ))}
            </List>
            </>
        )
    }
    </>


  );
};

export default Favorites;
