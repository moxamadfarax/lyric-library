import React, { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import AuthService from "../utils/auth";
import SimpleDialogDemo from "../components/dialog";
import authService from "../utils/auth";
import { GET_USER_LIBRARIES } from "../utils/query";
import { useQuery } from "@apollo/client";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#383838",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#90caf9",
    },
  },
});
const userId = authService.getProfile() || { data: { _id: null } };

function Search() {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [songDetails, setSongDetails] = useState({});
  const [songAvailable, setSongAvailable] = useState(false);

  const { loading, data } = useQuery(GET_USER_LIBRARIES, {
    variables: { id: userId.data._id },
  });

  const handleGetLyrics = () => {
    setIsLoading(true);

    fetch(
      `/lyrics?artist=${encodeURIComponent(
        artistName
      )}&title=${encodeURIComponent(songTitle)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data.lyrics);
        setAlbumCover(data.thumbnail);
        setSongDetails({
          title: data.title,
          artist: data.artist,
          releaseDate: data.releaseDate,
        });
      })
      .catch((err) => {
        return new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
        setSongAvailable(true);
      });
  };
  let profile = AuthService.getProfile();
  const song = {
    ...songDetails,
    artistName,
    albumCover,
    lyrics,
  };
  useEffect(() => {
    setLyrics("");
    setAlbumCover("");
    setSongDetails({});
  }, [songTitle, artistName, releaseDate]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box>loading</Box>
      ) : (
        <Grid container>
          <CssBaseline />
          {profile && <Navbar username={`Welcome ${profile.data.username}`} />}
          {!profile && <Navbar username={""} />}
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
              <Box component="form" noValidate sx={{ mt: 1 }}>
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
                {songDetails.title
                  ? profile && (
                      <SimpleDialogDemo
                        libraries={data.getUserById.libraries}
                        songDetails={song}
                      />
                    )
                  : null}
              </Box>
            </Box>
          </Grid>
          {!songDetails.title ? (
            isLoading ? (
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "69em",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      paddingTop: "34em",
                    }}
                  >
                    <CircularProgress size={50} />
                  </Box>
                </Card>
              </Grid>
            ) : (
              <p></p>
            )
          ) : (
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  height: "69em",
                }}
              >
                <CardMedia
                  component="img"
                  alt="Album cover"
                  height="400"
                  sx={{ mt: 5, mb: 5, objectFit: "contain" }}
                  image={albumCover}
                />
                <CardContent>
                  <Typography variant="h4" component="h1">
                    {songDetails.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Date: {songDetails.releaseDate}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="text.secondary"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    {songDetails.artist}
                  </Typography>
                  <Box
                    sx={{
                      maxWidth: "auto",
                      maxHeight: 500,
                      overflow: "auto",
                      fontSize: "20px",
                    }}
                  >
                    <pre>{lyrics}</pre>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default Search;
