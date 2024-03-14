import { Box, IconButton, Paper } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

import { TomatoContainer } from "../components/TomatoContainer";
import { TimerControls } from "../components/TimerControls";
import { ProductivityToggle } from "../components/ProductivityToggle";
import { CustomTypography } from "../components/CustomTypography";

export const TimerWidget: FunctionComponent = () => {
  const workTimeMin = 25;
  const breakTimeMin = 5;
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [productivityState, setProductivityState] = useState<"work" | "break">(
    "work"
  );
  const [initialSeconds, setInitialSeconds] = useState<number>(
    workTimeMin * 60
  );
  const [countdown, setCountdown] = useState<number>(initialSeconds);

  const handleChangeProductivityState = (
    event: React.MouseEvent<HTMLElement>,
    newProductivityState: "work" | "break"
  ) => {
    setProductivityState(newProductivityState);
    if (newProductivityState === "work") {
      setInitialSeconds(workTimeMin * 60);
      setCountdown(workTimeMin * 60);
    }
    if (newProductivityState === "break") {
      setInitialSeconds(breakTimeMin * 60);
      setCountdown(breakTimeMin * 60);
    }
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused) {
      intervalId = setInterval(() => {
        setCountdown((currentCountdown) => currentCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      if (intervalId !== null) clearInterval(intervalId);
      setIsActive(false);
    }

    return () => {
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [isActive, isPaused, countdown]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setCountdown(initialSeconds);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return (
    <Paper
      sx={{
        backgroundColor:
          productivityState === "work" ? "#fcb900" : "rgb(56, 133, 138)",
      }}
      elevation={3}
    >
      <Box
        width="100%"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <CustomTypography variant="h1" margin="20px" gutterBottom>
          Pomodoro Timer
        </CustomTypography>
      </Box>
      <Box display="flex" flexDirection="column">
        <ProductivityToggle
          productivityState={productivityState}
          handleChangeProductivityState={handleChangeProductivityState}
        />
        <TomatoContainer
          minutes={formattedMinutes}
          seconds={formattedSeconds}
          initialSeconds={initialSeconds}
          productivityState={productivityState}
          countdown={countdown}
        />
        <TimerControls
          isActive={isActive}
          handleReset={handleReset}
          isPaused={isPaused}
          handlePause={handlePause}
          handleStart={handleStart}
        />
      </Box>
      <Box width="100%" textAlign="right">
        <IconButton
          onClick={() =>
            window.open(
              "https://github.com/alexandramj92/pomodoro-timer",
              "noopener,noreferrer"
            )
          }
          aria-label="github repo"
          component="a"
        >
          <GitHubIcon sx={{ margin: "10px" }} fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
};
