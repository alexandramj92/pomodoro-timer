import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import { CustomTypography } from "./CustomTypography";
import { breakpoints } from "../utils/breakpoints";

interface TimerProps {
  minutes: string;
  seconds: string;
}

export const Timer: FunctionComponent<TimerProps> = ({ minutes, seconds }) => {
  const timeBoxStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: "65px",
    height: "65px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
    [`@media (max-width:${breakpoints.sm}px)`]: {
        height: "40px",
        width: "40px",
      },
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      position="absolute"
      sx={{
        top: "225px",
        [`@media (max-width:${breakpoints.sm}px)`]: {
          top: "125px",
        },
      }}
    >
      <Box sx={timeBoxStyle}>
        <CustomTypography variant="h2">{minutes}</CustomTypography>
      </Box>
      <CustomTypography sx={{ color: "white", padding: "5px" }} variant="h2">
        :
      </CustomTypography>
      <Box sx={timeBoxStyle}>
        <CustomTypography variant="h2">{seconds}</CustomTypography>
      </Box>
    </Box>
  );
};
