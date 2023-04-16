import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  createTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ username }) {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
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

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Render links based on screen size
  const renderLinks = () => {
    if (isSmallScreen) {
      return (
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ top: 0, height: "100vh" }}
        >
          <List sx={{ width: 250 }} onClick={toggleDrawer}>
            <ListItem button>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      );
    } else {
      return (
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Search</Button>
          <Button color="inherit">Logout</Button>
        </Stack>
      );
    }
  };

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
        {renderLinks()}
        {isSmallScreen && (
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
