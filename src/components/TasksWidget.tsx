import React, { FunctionComponent } from "react";
import { Grid, IconButton, Stack, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { CustomTypography } from "./CustomTypography";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { createTask } from "../actions";
import { RootState } from "../reducers";
import { TaskItem } from "./TaskItem";

interface TasksWidgetProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TasksWidget: FunctionComponent<TasksWidgetProps> = ({
  handleChange,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { tasks } = useAppSelector((state: RootState) => state.task);

  const handleAddTask = () => {
    if (user?.id)
      dispatch(createTask({ status: "to-do", content: "" }, user?.id));
  };

  return (
    <Grid
      maxWidth="100%"
      overflow="hidden"
      height='100%'
      container
      padding="30px"
      direction="column"
      display="flex"
      flex={1}
    >
      <Stack width="100%" direction="row" justifyContent="space-between">
        <CustomTypography variant="h2" marginBottom="10px">
          Tasks
        </CustomTypography>
        <IconButton aria-label="add task" onClick={handleAddTask}>
          <AddIcon />
        </IconButton>
      </Stack>
      <SimpleBar
        style={{ maxHeight: 400, maxWidth: "100%", overflowX: "hidden" }}
      >
        <Box maxHeight='100%' maxWidth="100%" boxSizing="border-box">
          {tasks
            ?.filter((task) => task.status === "to-do")
            ?.map((task) => {
              return <TaskItem handleChange={handleChange} task={task} />;
            })}
        </Box>
      </SimpleBar>
    </Grid>
  );
};
