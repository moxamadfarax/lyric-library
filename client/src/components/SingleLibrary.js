import * as React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import LyricsIcon from "@mui/icons-material/Lyrics";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";

import { GET_LIBRARY_BY_ID } from "../utils/query";
import { REMOVE_SONG_FROM_LIBRARY } from "../utils/mutation.js";

export default function SingleLibrary({ libraries }) {
  const [deleteSong, { error }] = useMutation(REMOVE_SONG_FROM_LIBRARY);
  let { id } = useParams();
  const { loading, data } = useQuery(GET_LIBRARY_BY_ID, {
    variables: { id: id },
  });

  const handleFormSubmit = async (event, id) => {
    event.preventDefault();
    try {
      const { data } = await deleteSong({
        variables: { id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading === false) {
    console.log(data.getLibraryById);
  }
  return (
    <Box
      sx={{
        display: "flex;",
        flexDirection: "column;",
        color: "white;",
        alignItems: "center;",
        justifyContent: "center;",
      }}
    >
      {loading ? (
        <Box>...Loading</Box>
      ) : (
        <List
          sx={{
            display: "flex;",
            flexDirection: "column;",
            alignItems: "center;",
          }}
        >
          <Box
            sx={{
              marginBottom: "20px;",
              fontSize: "30px",
            }}
          >
            Current Playlist:
          </Box>
          <Box
            sx={{
              marginBottom: "20px;",
              fontSize: "30px",
              color: "#1DB954;",
            }}
          >
            {data.getLibraryById.name}
          </Box>
          {data.getLibraryById.songs.map((song) => {
            return (
              <ListItem sx={{ bgcolor: "#717b91;" }} onClick={handleFormSubmit}>
                <ListItemButton>
                  <ListItemText
                    primary={song.trackName}
                    secondary={"artist: " + song.artistName}
                  />
                  <ListItemIcon sx={{ marginLeft: "30px;" }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "black;" }}>
                        <LyricsIcon sx={{ color: "#1DB954;" }} />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
