import React from "react";
import { Dashboard, Login, Signup } from "./pages";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { palette } from "./utils/color";
import { fontFamily } from "./utils/typography";

const theme = createTheme({ palette, typography: { fontFamily } });

function App() {
  if (!process.env.REACT_APP_BACKEND_URL)
    throw new Error("Backend url must be defined");
  return (
    <ThemeProvider theme={theme}>
      <Box width="100%" display="flex" justifyContent="center">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
