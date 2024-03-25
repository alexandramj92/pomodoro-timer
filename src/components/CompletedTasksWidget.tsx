import React, { FunctionComponent } from "react";

import { CustomTypography } from "./CustomTypography";
import { Box, Checkbox, Grid } from "@mui/material";
import { palette } from "../utils/color";

interface CompletedTasksWidgetProps {
  tasks:
    | {
        id: number;
        status: "to-do" | "completed" | "in-session";
        content: string;
        sortOrder: number;
      }[]
    | undefined;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompletedTasksWidget: FunctionComponent<
  CompletedTasksWidgetProps
> = ({ tasks, handleChange }) => {
  return (
    <Grid minHeight='400px' container padding="30px" direction="column">
      <CustomTypography variant="h2" marginBottom="10px">
        Completed
      </CustomTypography>
      {tasks
        ?.filter((task) => task.status === "completed")
        ?.map((task) => (
          <Box
            key={task.id}
            sx={{ backgroundColor: palette.custom.white }}
            height="50px"
            marginBottom="10px"
            border={`2px solid ${palette.custom.darkGrey}`}
            padding="10px"
            display="flex"
            alignItems="center"
            borderRadius="8px"
          >
            <Checkbox
              checked={task.status === "completed" ? true : false}
              onChange={handleChange}
              value={task.id}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
            <CustomTypography>{task.content}</CustomTypography>
          </Box>
        ))}
    </Grid>
  );
};
