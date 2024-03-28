import React, { FunctionComponent, useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { palette } from "../utils/color";
import { CustomTypography } from "./CustomTypography";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { createTask, deleteTask, updateTask } from "../actions";
import { RootState } from "../reducers";

interface TasksWidgetProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TasksWidget: FunctionComponent<TasksWidgetProps> = ({
  handleChange,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { tasks } = useAppSelector((state: RootState) => state.task);
  const [taskBeingUpdated, setTaskBeingUpdated] = useState<
    | {
        _id: string;
        status: "to-do" | "completed" | "in-session";
        content: string;
        sortOrder?: number;
      }
    | undefined
  >();

  const handleAddTask = () => {
    if (user?.id)
      dispatch(createTask({ status: "to-do", content: "" }, user?.id));
  };

  const handleModifyTask =
    (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const taskData = tasks?.find((task) => task._id === taskId);
      setTaskBeingUpdated(
        taskData && { ...taskData, content: event.target.value }
      );
    };

  const handleSaveTask = () => {
    if (taskBeingUpdated) {
      const { _id, ...taskDataWithoutId } = taskBeingUpdated;
      dispatch(updateTask(taskDataWithoutId, _id));
    }

    setTaskBeingUpdated(undefined);
  };

  return (
    <Grid minHeight="400px" container padding="30px" direction="column">
      <Stack direction="row" justifyContent="space-between">
        <CustomTypography variant="h2" marginBottom="10px">
          Tasks
        </CustomTypography>
        <IconButton aria-label="add task" onClick={handleAddTask}>
          <AddIcon />
        </IconButton>
      </Stack>

      {tasks
        ?.filter((task) => task.status === "to-do")
        ?.map((task) => {
          return (
            <Box
              key={task._id}
              sx={{ backgroundColor: palette.custom.white }}
              minHeight="50px"
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
              <TextField
                value={
                  taskBeingUpdated && taskBeingUpdated._id === task._id
                    ? taskBeingUpdated.content
                    : task.content
                }
                onChange={handleModifyTask(task._id)}
                onBlur={handleSaveTask}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveTask();
                    const target = e.target as HTMLInputElement;

                    target.blur();
                  }
                }}
                multiline
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent", // Hide default border
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Hide border on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent", // Hide border on focus
                    },
                  },
                }}
              />
              <IconButton
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(deleteTask(task._id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
    </Grid>
  );
};
