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

import { REMOVE_SONG_FROM_LIBRARY } from "../utils/mutation"

export default function SingleSong({ song, removeSong, libraryId }) {
const [removeSongFromLibrary, { error }] = useMutation(REMOVE_SONG_FROM_LIBRARY);
const removeSongHandler = async () => {
    console.log('clicked song._id', song._id);
    removeSong(song._id);
    await removeSongFromLibrary({
        variables: {
          libraryId: libraryId,
          songId:   song._id
        }
      }) 
}
return(
    
              <List
              sx={{
                  display: "flex;",
            flexDirection: "column;",
            alignItems: "center;",
        }}
        >
                  <Box sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                <ListItem sx={{ 
                    bgcolor: "#717b91;",
                    width: "50vw",
                    borderRadius: '5px',
                    marginBottom: '10px'
              }}>
                  <ListItemButton>
                    <ListItemText
                      primary={song.trackName}
                      secondary={"artist: " + song.artistName}
                      />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <Stack direction="row" spacing={2}>
      <Button 
      variant="outlined" 
      onClick={removeSongHandler} 
      sx={{ marginBottom: '10px' }} 
      startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Stack>
              </Box>
        </List>

)
}