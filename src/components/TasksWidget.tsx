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

import { palette } from "../utils/color";
import { CustomTypography } from "./CustomTypography";

interface TasksWidgetProps {
  tasks:
    | {
        id: number;
        status: "to-do" | "completed" | "in-session";
        content: string;
        sortOrder: number;
      }[]
    | undefined;
  setTasks: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          status: "to-do" | "completed" | "in-session";
          content: string;
          sortOrder: number;
        }[]
      | undefined
    >
  >;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TasksWidget: FunctionComponent<TasksWidgetProps> = ({
  tasks,
  handleChange,
  setTasks,
}) => {
  const [taskBeingUpdated, setTaskBeingUpdated] = useState<
    | {
        id: number;
        status: "to-do" | "completed" | "in-session";
        content: string;
        sortOrder: number;
      }
    | undefined
  >();

  const handleAddTask = () => {
    console.log(tasks, "add task");
    const newId = tasks?.length && tasks[tasks?.length - 1]?.id + 1;
    newId
      ? setTasks(
          (currentTasks) =>
            currentTasks && [
              ...currentTasks,
              { id: newId, status: "to-do", content: "", sortOrder: 0 },
            ]
        )
      : setTasks([{ id: 0, status: "to-do", content: "", sortOrder: 0 }]);
  };

  const handleModifyTask =
    (taskId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("modify task", taskBeingUpdated);
      const taskData = tasks?.find((task) => task.id === taskId);
      setTaskBeingUpdated(
        taskData && { ...taskData, content: event.target.value }
      );
      console.log(taskData, "task data");
    };

  const handleSaveTask = () => {
    console.log("Save Task");
    setTasks((currentTasks) =>
      currentTasks?.map((task) =>
        task.id === taskBeingUpdated?.id
          ? { ...task, content: taskBeingUpdated?.content }
          : task
      )
    );
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
        ?.map((task) => (
          <Box
            key={task.id}
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
              value={task.id}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
            <TextField
              value={
                taskBeingUpdated && taskBeingUpdated.id === task.id
                  ? taskBeingUpdated.content
                  : task.content
              }
              onChange={handleModifyTask(task.id)}
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
          </Box>
        ))}
    </Grid>
  );
};
