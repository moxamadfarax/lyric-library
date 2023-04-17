import * as React from "react";
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemButton,
} from "@mui/material";

import { REMOVE_SONG_FROM_LIBRARY } from "../utils/mutation"

export default function SingleSong({ song, removeSong, libraryId }) {
    const [removeSongFromLibrary] = useMutation(REMOVE_SONG_FROM_LIBRARY);
    const removeSongHandler = async () => {
        removeSong(song._id);
        try {
            await removeSongFromLibrary({
                variables: {
                    libraryId,
                    songId: song._id
                }
            })
            console.log('removed song')
        } catch (err) {
            console.log(err);
            console.log('error')
        }
    }
    return (

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
                            secondary={"artist: " + song._id}
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