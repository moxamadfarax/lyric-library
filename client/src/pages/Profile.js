import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

import Navbar from "../components/Navbar";

export default function Profile({ libraries }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex;",
        flexDirection: "column;",
        minHeight: "100vh;",
      }}
    >
      <Navbar username={"Example Username"} />
      <Box
        sx={{
          display: "flex;",
          alignItems: "center;",
          flexDirection: "column;",
          bgcolor: "#272424;",
          justifyContent: "center;",
          flex: "1;",
        }}
      >
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
        {libraries.map((library) => {
          return (
            <Box
              key={library.id}
              sx={{
                display: "flex;",
                alignItems: "center;",
              }}
            >
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "white;",
                  marginBottom: "10px;",
                  bgcolor: "#1D1B1B;",
                  width: "100%",
                  display: "flex;",
                  alignItems: "center;",
                }}
              >
                {library.libraryName}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {library.songs.map((song) => {
                  return (
                    <MenuItem onClick={handleClose} key={song.id}>
                      {song.trackName}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
