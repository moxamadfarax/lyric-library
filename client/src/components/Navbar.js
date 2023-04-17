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
import { Link } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MenuIcon from "@mui/icons-material/Menu";
import authService from "../utils/auth";

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

  // Render links based on screen size and login status
  const renderLinks = () => {
    const isLoggedIn = authService.loggedIn();
    if (isSmallScreen) {
      return (
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ top: 0, height: "100vh", justifyContent: "space-between" }}
        >
          <List
            sx={{ width: 250, justifyContent: "space-between" }}
            onClick={toggleDrawer}
          >
            {isLoggedIn ? (
              <>
                <ListItem button component={Link} to="/profile">
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => authService.logout()}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/signIn">
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem button component={Link} to="/signUp">
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      );
    } else {
      return (
        <div sx={{ marginLeft: "auto", textAlign: "end" }}>
          <Stack direction="row" spacing={2}>
            {isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" onClick={() => authService.logout()}>
                  Logout
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/signIn">
                  Sign In
                </Button>
                <Button color="inherit" component={Link} to="/signUp">
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </div>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ justifyContent: "space-between" }}>
      <Toolbar theme={theme} sx={{ justifyContent: "space-between" }}>
        <Button component={Link} to="/" edge="start">
          <IconButton
            size="large"
            color="inherit"
            aria-label="logo"
            sx={{ color: "#1DB954" }}
          >
            <LibraryMusicIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ color: "white" }}>
            LYRIC LIBRARY
          </Typography>
        </Button>
        {username && (
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {username}
          </Typography>
        )}
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
