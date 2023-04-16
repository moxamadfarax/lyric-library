import * as React from "react";
import { useMutation } from '@apollo/client'; import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import MoreVert from '@mui/icons-material/MoreVert';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";

import SingleSong from './SingleSong';




export default function singleLibrary({ singleLibrary, loading, libraryId }) {
console.log(singleLibrary);
  const [songs, setSongs] = React.useState(singleLibrary.songs);
  const removeSong = async (songId) => {
    console.log('songState', songs[0]._id)
    try {
      const newSongList = songs.filter(song => song._id !== songId);
      console.log('newSongList', newSongList);
      setSongs(newSongList);
    } catch (err) {
      console.error(err);
    }
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
      <Box sx={{
        display: 'flex;',
        flexDirection: 'column;',
        alignItems: 'center;'
      }}>
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
          {singleLibrary.name}
        </Box>
        <List
          sx={{
            display: "flex;",
            flexDirection: "column;",
            alignItems: "center;",
          }}
        >
          {songs.map((song) => {
            return (
              <SingleSong
                song={song}
                removeSong={removeSong}
                libraryId={libraryId}
              />)
          })}
        </List>
      </Box>
    </Box>

  );
}
