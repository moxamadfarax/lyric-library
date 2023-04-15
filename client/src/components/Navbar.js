import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  createTheme,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

export default function Navbar({ username }) {
  const theme = createTheme({
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: "#1D1B1B;",
          },
        },
      },
    },
  });

  return (
    <AppBar position="static">
      <Toolbar theme={theme}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ color: "#1DB954" }}
        >
          <LibraryMusicIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LYRIC LIBRARY
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {username}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Search</Button>
          <Button color="inherit">Logout</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
