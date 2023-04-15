import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

function Search() {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
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
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setLyrics("");
    setAlbumCover("");
    setSongDetails({});
  }, [songTitle, artistName]);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
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
              Search Lyrics by
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
          <Button onClick={handleGetLyrics}>Get Lyrics</Button>
          </Box>
          </Box>
        </Grid>

      {isLoading ? renderLoading : console.log("Hello")}
      {!songDetails.title ? (
        <p>Search Your Song</p>
      ) : (
            <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 350 }}>
            <CardMedia
              component="img"
              alt="Album cover"
              height="140"
              image={albumCover}
            />
            <CardContent>
            <Typography variant="h1" component="h2">{songDetails.title}</Typography>
              <Typography variant="body2" color="text.secondary">
              {songDetails.artist}
              </Typography>
              <Typography><pre>{lyrics}</pre></Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Save to Library</Button>
            </CardActions>
          </Card>
          </Grid>
          )}
            
    </Grid>
  );
}

export default Search;

