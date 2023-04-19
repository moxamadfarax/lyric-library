import * as React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { useMutation } from "@apollo/client";
import { ADD_SONG_TO_LIBRARY } from "../utils/mutation";

function SimpleDialog(props) {
  const [addSongToLibrary] = useMutation(ADD_SONG_TO_LIBRARY);
  const libraries = props.libraries;
  const { onClose, selectedValue, open } = props;

  if (!libraries) {
    return <div>You have no libraries.</div>;
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value, libraryId) => {
    try {
      await addSongToLibrary({
        variables: {
          libraryId: libraryId,
          input: {
            artistName: props.songDetails.artist,
            lyrics: props.songDetails.lyrics,
            songPhoto: props.songDetails.albumCover,
            trackName: props.songDetails.title,
          },
        },
      });
      onClose(value);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose a library to add to:</DialogTitle>
      <List sx={{ pt: 0 }}>
        {libraries.map((library) => (
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => handleListItemClick(library.name, library._id)}
              key={library.name}
            >
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

SimpleDialogDemo.defaultProps = {
  libraries: [],
};

export default function SimpleDialogDemo({ libraries, songDetails }) {
  const [selectedValue, setSelectedValue] = React.useState(
    libraries.length ? libraries[0].name : ""
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  if (libraries.length === 0) {
    return <div>You have no libraries.</div>;
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2, marginTop: "0px" }}
      >
        Add song to a library
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        libraries={libraries}
        songDetails={songDetails}
      />
    </div>
  );
}
