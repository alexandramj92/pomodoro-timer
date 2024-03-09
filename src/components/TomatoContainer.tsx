import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Tomato } from "../icons/Tomato";
import { Timer } from "./Timer";
import { breakpoints } from "../utils/breakpoints";

interface TomatoContainerProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  countdown: number;
  productivityState: "work" | "break";
}

export const TomatoContainer: FunctionComponent<TomatoContainerProps> = ({
  minutes,
  seconds,
  initialSeconds,
  countdown,
  productivityState,
}) => {
  const progress = (countdown / initialSeconds) * 100;
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm}px)`);
  return (
    <Box
      position="relative"
      width="100%"
      margin="60px 0"
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Tomato />
      <CircularProgress
        sx={{
          position: "absolute",
          color: productivityState === "work" ? "#D13834" : "rgb(57, 112, 151)",
        }}
        thickness={1}
        size={isMobile ? "300px" : "500px"}
        variant="determinate"
        value={progress}
      />

      <Timer minutes={minutes} seconds={seconds} />
    </Box>
  );
};
