import * as React from "react";
import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { Box, Menu, MenuItem } from "@mui/material";

import { DELETE_LIBRARY } from "../utils/mutation";
import { UPDATE_LIBRARY_NAME } from "../utils/mutation";

export default function Libraries({ libraries }) {
  /*------      mutations      -----*/
  const [deleteLibrary, { error }] = useMutation(DELETE_LIBRARY);
  const [updateLibraryName, { er }] = useMutation(UPDATE_LIBRARY_NAME);

  /*-----     Current Libraries state     -----*/
  let [libArray, setLibArray] = React.useState(libraries);

  /*-----    Remame Library State    -----*/
  const [newLibName, setNewLibName] = React.useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    const { target } = e;
    setNewLibName(target.value);
  };
  const renameLibraryHandler = async (event) => {
    event.preventDefault();
    setOpen(false);
    setMenuAnchorEl(null);
    try {
      const idArray = libArray.map((oneLib) => {
        return oneLib._id;
      });
      const index = idArray.indexOf(menuAnchorEl.dataset.libraryid);
      setLibArray((currentArray) => {
        const currentArrayCopy = [...currentArray];
        currentArrayCopy[index] = {
          ...currentArrayCopy[index],
          name: newLibName,
        };
        return currentArrayCopy;
      });
      await updateLibraryName({
        variables: {
          id: menuAnchorEl.dataset.libraryid,
          name: newLibName,
        },
      });
    } catch (err) {
      console.error(err);
      console.error(er);
    }
  };
  /*-----    Menu State    -----*/
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const openMenu = Boolean(menuAnchorEl);
  const handleClickMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  /*-----    Dialog Form State    -----*/
  const [openDialog, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  /*-----      Delete Library function      -----*/
  const deleteLibraryHandler = async () => {
    try {
      console.log(menuAnchorEl.dataset.libraryid);
      const newArray = libArray.filter(
        (oneLib) => oneLib._id !== menuAnchorEl.dataset.libraryid
      );
      setLibArray(newArray);
      await deleteLibrary({
        variables: { id: menuAnchorEl.dataset.libraryid },
      });
      console.log("Deleted library");
    } catch (err) {
      console.error(err);
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex;",
        flex: "1;",
        flexDirection: "column;",
        alignItems: "center;",
        justifyContent: "center;",
        bgcolor: "#272424;",
      }}
    >
      <Box
        sx={{
          color: "white;",
          marginBottom: "10vh;",
          fontSize: "40px;",
        }}
      >
        Welcome User, these are your libraries
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "20px",
          color: "#1DB954",
          bgcolor: "#1D1B1B;",
          marginBottom: "20px",
          fontSize: "30px",
        }}
      >
        My libraries
      </Box>
      {libArray.map((library) => {
        return (
          <Box
            key={library.id}
            sx={{
              display: "flex;",
              alignItems: "center;",
            }}
          >
            <Button
              sx={{
                color: "white;",
                marginBottom: "10px;",
                bgcolor: "#1D1B1B;",
                width: "30vw",
                display: "flex;",
                alignItems: "center;",
              }}
              href={"profile/" + library._id}
            >
              {library.name}
            </Button>
            <IconButton
              id="positioned-demo-button"
              aria-controls={openMenu ? "positioned-demo-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              variant="outlined"
              color="neutral"
              onClick={handleClickMenu}
              placement="bottom"
              data-libraryId={library._id}
            >
              <MoreVert />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "top" }}>
              <Menu
                id="positioned-demo-menu"
                anchorEl={menuAnchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                aria-labelledby="positioned-demo-button"
              >
                <MenuItem Display={""} onClick={handleClickOpen}>
                  <ListItemDecorator>
                    <Edit />
                  </ListItemDecorator>{" "}
                </MenuItem>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>Edit Library</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter your new library name:
                    </DialogContentText>
                    <TextField
                      margin="dense"
                      id="renamelibrary"
                      label="library"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleInputChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" onClick={renameLibraryHandler}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                <ListDivider />
                <MenuItem
                  data-libraryId={library._id}
                  onClick={deleteLibraryHandler}
                  variant="soft"
                  color="danger"
                >
                  <ListItemDecorator sx={{ color: "inherit" }}>
                    <DeleteForever />
                  </ListItemDecorator>{" "}
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
} 