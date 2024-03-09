import React from "react";
import { TimerDashboard } from "./components/TimerDashboard";
import { Box } from "@mui/material";

function App() {
  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <TimerDashboard />
    </Box>
  );
}

export default App;
