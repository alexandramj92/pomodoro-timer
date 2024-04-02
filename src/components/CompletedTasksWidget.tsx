import React, { FunctionComponent } from "react";
import { Grid } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { CustomTypography } from "./CustomTypography";
import { useAppSelector } from "../utils/hooks";
import { RootState } from "../reducers";
import { TaskItem } from "./TaskItem";

interface CompletedTasksWidgetProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompletedTasksWidget: FunctionComponent<
  CompletedTasksWidgetProps
> = ({ handleChange }) => {
  const { tasks } = useAppSelector((state: RootState) => state.task);

  return (
    <Grid minHeight="200px" container padding="30px">
      <CustomTypography variant="h2" marginBottom="10px">
        Completed
      </CustomTypography>
      <SimpleBar
        style={{ maxHeight: 200, width: "100%", overflowX: "hidden" }}
      >
        {tasks
          ?.filter((task) => task.status === "completed")
          ?.map((task) => (
            <TaskItem handleChange={handleChange} task={task} />
          ))}
      </SimpleBar>
    </Grid>
  );
};
