import React, { FunctionComponent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, TextField } from "@mui/material";

import { CustomTypography } from "./CustomTypography";
import { palette } from "../utils/color";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { deleteTask, updateTask } from "../actions";
import { RootState } from "../reducers";

interface TaskItemProps {
  task: {
    _id: string;
    status: "to-do" | "completed" | "in-session";
    content?: string | undefined;
    sortOrder?: number | undefined;
    secondsSpent?: number | undefined;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TaskItem: FunctionComponent<TaskItemProps> = ({
  task,
  handleChange,
}) => {
  const dispatch = useAppDispatch();
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
    <Box
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
      {task.status === "completed" ? (
        <CustomTypography width="100%">{task.content}</CustomTypography>
      ) : (
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
      )}
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => dispatch(deleteTask(task._id))}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
