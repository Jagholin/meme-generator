import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import MainPage from "./components/MainPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        loader: () => axios.get("https://api.imgflip.com/get_memes"),
        element: <MainPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4">Meme generator!</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md" sx={{ marginTop: "40px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom textAlign="center">
                This is a meme generator app!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RouterProvider router={routes} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default App;
