import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import DrawerComponent from "./DrawerComponent";
import AppBarComponent from "./AppBarComponent";

const mdTheme = createTheme();

const noWrapper = ["/login", "/register"];

export default function DashboardWrapper({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {!noWrapper.includes(location.pathname) && (
          <>
            <AppBarComponent isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
            <DrawerComponent isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
          </>
        )}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            // minHeight: "100vh",
            // overflow: "auto",
            overflowY: "scroll",
            minHeight: "100vh",
            maxHeight: "calc(100vh - 0px)",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
