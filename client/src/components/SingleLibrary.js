import * as React from "react";
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

export default function singleLibrary({ singleLibrary, loading }) {
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
            {singleLibrary.getLibraryById.name}
          </Box>
          {singleLibrary.getLibraryById.songs.map((song) => {
            return (
              <ListItem sx={{ bgcolor: "#717b91;" }}>
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
