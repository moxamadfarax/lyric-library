import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { blue } from '@mui/material/colors';
import { useMutation } from "@apollo/client";
import { ADD_SONG_TO_LIBRARY } from "../utils/mutation";

function SimpleDialog(props) {
    const [addSongToLibrary, { error }] = useMutation(ADD_SONG_TO_LIBRARY);
    const libraries = props.libraries
    console.log(libraries);

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = async (value) => {
       try {
        await addSongToLibrary({
            variables: {
                libraryId: "643d7779f274e630b9c43c0d",
                input: {
                    artistName: "unique",
                    lyrics: "afdsf",
                    songPhoto: "afdsfads",
                    trackName: "asdfasdf"
                },
            }
        })
        onClose(value);
       } catch (err) {
        console.error(error);
        console.log(err);
       }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose a library to add to:</DialogTitle>
            <List sx={{ pt: 0 }}>
                {libraries.map((library) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(library.name)} key={library.name}>
                            <ListItemAvatar>
                                <ListItemAvatar>
                                    <PlaylistAddIcon />
                                </ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary={library.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );

}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ libraries }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(libraries[0].name);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, marginTop: '0px' }}
            >
                Add song to a library
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                libraries={libraries}
            />
        </div>
    );
}
