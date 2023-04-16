import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import authService from "../utils/auth";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

export default function SignInSide() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      authService.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ alignItems: "center", height: "5vh" }}>
        <Toolbar theme={theme}>
          <Link href="/" sx={{ textDecoration: "none", color: "white" }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <LibraryMusicIcon sx={{ color: "#1DB954", fontSize: "1.5em" }} />
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                LYRIC LIBRARY
              </Typography>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container component="main" sx={{ height: "95vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: "#1f1f1f" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ backgroundColor: "#1f1f1f" }}
              />
              {showError && (
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
                  Incorrect username or password.
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <Grid item>
                  <Link
                    href="/signUp"
                    variant="body2"
                    sx={{ textAlign: "center", textDecoration: "none" }}
                  >
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
