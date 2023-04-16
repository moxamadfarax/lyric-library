import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#90caf9",
    },
  },
});




function Search() {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [releaseDate] = useState("");
  const [songDetails, setSongDetails] = useState({});

  const renderLoading = () => {
    return (
      <p>Loading...</p>
    )
  };

  const handleGetLyrics = () => {
    setIsLoading(true);

    fetch(
      `/lyrics?artist=${encodeURIComponent(
        artistName
      )}&title=${encodeURIComponent(songTitle)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLyrics(data.lyrics);
        setAlbumCover(data.thumbnail);
        setSongDetails({
          title: data.title,
          artist: data.artist,
          releaseDate: data.releaseDate,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setLyrics("");
    setAlbumCover("");
    setSongDetails({});
  }, [songTitle, artistName, releaseDate]);

  return (
    <ThemeProvider theme={theme}>
    <Grid container>
    <CssBaseline />
    <Navbar username={"Example Username"} />
      <Grid item xs={12} md={4}>
      <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Search Song Lyrics
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >

          <TextField
            margin="normal"
            fullWidth
            label="Song Title"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            sx={{ backgroundColor: "#1f1f1f" }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            sx={{ backgroundColor: "#1f1f1f" }}
          />
          <Button 
            onClick={handleGetLyrics}
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            >
              Get Lyrics
          </Button>
          <Button 
          // onClick={}
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
          >
          Save Song to Library
          </Button>
            
          </Box>
          </Box>
        </Grid>

      {isLoading ? renderLoading : console.log("Hello")}
      {!songDetails.title ? (
        <p></p>
      ) : (
            <Grid item xs={12} md={8}>
            <Card sx={{ 
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              
              }}>
            <CardMedia
              component="img"
              alt="Album cover"
              height="300"
              sx={{mt: 5, mb:5, objectFit: "contain"}}
              image={albumCover}
            />
            <CardContent>
            <Typography variant="h4" component="h1">{songDetails.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Release Date: {songDetails.releaseDate}
              </Typography>
              <Typography variant="h5" component= "h2"color="text.secondary" sx={{mt:2, mb: 2}}>
              {songDetails.artist}
              </Typography>
              
              <Box
              sx={{ 
                maxWidth: "auto",
                maxHeight: 300,
                overflow: 'auto',

                }}
                >
                <pre>{lyrics}</pre></Box>
            </CardContent>
          </Card>
          </Grid>
          )}
            
    </Grid>
    </ThemeProvider>
  );
}

export default Search;

