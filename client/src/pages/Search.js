import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    width: "50%",
    paddingBottom: "25em",
  },
  searchInput: {
    marginBottom: theme.spacing(2),
  },
  searchButton: {
    marginBottom: theme.spacing(2),
  },
  loading: {
    marginTop: theme.spacing(2),
  },
  cardContainer: {
    width: "50%",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

function Search() {
  const classes = useStyles();
  const [songDetails, setSongDetails] = useState({
    title: "",
    artist: "",
    lyrics: "",
    releaseDate: "",
    thumbnail: "",
  });
  const [reqDetails, setReqdetails] = useState({
    title: "",
    artist: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLyrics = () => {
    setIsLoading(true);
    const query = `/lyrics?artist=${encodeURIComponent(
      reqDetails.artist
    )}&title=${encodeURIComponent(reqDetails.title)}`;
    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSongDetails({
          title: data.title,
          artist: data.artist,
          lyrics: data.lyrics,
          releaseDate: data.releaseDate,
          thumbnail: data.thumbnail,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <TextField
          label="Song Title"
          variant="outlined"
          className={classes.searchInput}
          onChange={(e) =>
            setReqdetails((prevSongDetails) => ({
              ...prevSongDetails,
              title: e.target.value,
            }))
          }
        />

        <TextField
          label="Artist Name"
          variant="outlined"
          className={classes.searchInput}
          onChange={(e) =>
            setReqdetails((prevSongDetails) => ({
              ...prevSongDetails,
              artist: e.target.value,
            }))
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleGetLyrics}
          className={classes.searchButton}
        >
          Get Lyrics
        </Button>
        {isLoading && <CircularProgress className={classes.loading} />}
      </div>
      <div className={classes.cardContainer}>
        {songDetails && (
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={songDetails.thumbnail}
              title={songDetails.title}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {songDetails.title}
              </Typography>
              <Typography color="textSecondary">
                {songDetails.artist} | {songDetails.releaseDate}
              </Typography>
              <Typography variant="body2" component="div">
                {songDetails.lyrics}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
export default Search;
