import { Box, IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";

interface TimerControlsProps {
  handleStart: () => void;
  isActive: boolean;
  isPaused: boolean;
  handlePause: () => void;
  handleReset: () => void;
}

export const TimerControls: FunctionComponent<TimerControlsProps> = ({
  handleStart,
  isActive,
  isPaused,
  handlePause,
  handleReset,
}) => {
  const iconStyles = { fontSize: "5rem" };
  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        onClick={handleStart}
        disabled={isActive && !isPaused}
        aria-label="play"
      >
        <PlayCircleFilledIcon sx={iconStyles} />
      </IconButton>
      <IconButton
        onClick={handlePause}
        disabled={isPaused || isActive === false}
        aria-label="pause"
      >
        <PauseCircleIcon sx={iconStyles} fontSize="large" />
      </IconButton>
      <IconButton onClick={handleReset} aria-label="reset">
        <ReplayCircleFilledIcon sx={iconStyles} />
      </IconButton>
    </Box>
  );
};
