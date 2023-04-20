import { useMutation } from "@apollo/client";

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from 'react-router-dom';

import { CREATE_USER } from "../utils/mutation";
import AuthService from "../utils/auth";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#383838",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

export default function SignUp() {
  const [createUser] = useMutation(CREATE_USER);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const result = await createUser({
        variables: {
          email: data.get("email"),
          password: data.get("password"),
          username: data.get("username"),
        },
      });
      const token = result.data.createUser.token;
      AuthService.login(token);
      window.location.assign("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ alignItems: "center", height: "5vh" }}>
        <Toolbar theme={theme}>
          <Link component={RouterLink} to="/" sx={{ textDecoration: "none", color: "white" }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <LibraryMusicIcon sx={{ color: "#1DB954", fontSize: "1.5em" }} />
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                LYRIC LIBRARY
              </Typography>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={17}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={17}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={17} sx={{ paddingBottom: "10px" }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {error && (
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  width: "100%",
                  backgroundColor: "#9f3640",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                {error}
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 1 }}>
              <Grid item>
                <Link
                  component={RouterLink} to="/signIn"
                  variant="body2"
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
