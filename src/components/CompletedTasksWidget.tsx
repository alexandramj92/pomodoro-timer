import React, { FunctionComponent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { CustomTypography } from "./CustomTypography";
import { palette } from "../utils/color";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { RootState } from "../reducers";
import { deleteTask } from "../actions";

interface CompletedTasksWidgetProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompletedTasksWidget: FunctionComponent<
  CompletedTasksWidgetProps
> = ({ handleChange }) => {
  const { tasks } = useAppSelector((state: RootState) => state.task);
  const dispatch = useAppDispatch();

  return (
    <Grid minHeight="200px" container padding="30px" direction="column">
      <CustomTypography variant="h2" marginBottom="10px">
        Completed
      </CustomTypography>
      <SimpleBar
        style={{ maxHeight: 200, maxWidth: "100%", overflowX: "hidden" }}
      >
        {tasks
          ?.filter((task) => task.status === "completed")
          ?.map((task) => (
            <Box
              key={task._id}
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
                value={task._id}
                inputProps={{ "aria-label": "controlled" }}
                color="secondary"
              />
              <CustomTypography width="100%">{task.content}</CustomTypography>
              <IconButton
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(deleteTask(task._id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
      </SimpleBar>
    </Grid>
  );
};
