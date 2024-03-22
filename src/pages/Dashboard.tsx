import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Grid, IconButton } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import GitHubIcon from "@mui/icons-material/GitHub";

import { TimerWidget } from "../components/TimerWidget";
import { AccountMenu } from "../components/AccountMenu";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { verifyCookie } from "../actions";
import { RootState } from "../reducers";
import { CustomTypography } from "../components/CustomTypography";
import { TasksWidget } from "../components/TasksWidget";
import { palette } from "../utils/color";
import { CompletedTasksWidget } from "../components/CompletedTasksWidget";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const { username } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyCookie(cookies.token, navigate, removeCookie));
  }, [cookies, navigate, removeCookie, dispatch]);
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/signup");
  };

  const [tasks, setTasks] = useState<
    | {
        id: number;
        status: "to-do" | "completed" | "in-session";
        content: string;
        sortOrder: number;
      }[]
    | undefined
  >([
    { id: 0, status: "to-do", content: "finish homework", sortOrder: 0 },
    { id: 1, status: "to-do", content: "pay bills", sortOrder: 1 },
    { id: 2, status: "to-do", content: "feed dog", sortOrder: 2 },
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = parseInt(event.target.value, 10); // Assuming the value is the task ID
    const currentStatus = tasks?.find((task) => task.id === taskId)?.status;
    console.log(taskId, currentStatus);
    const newStatus =
      currentStatus === "completed"
        ? "to-do"
        : currentStatus === "to-do" || "in-session"
        ? "completed"
        : currentStatus;

    console.log(newStatus, "newStatus");

    if (newStatus)
      setTasks((currentTasks) =>
        currentTasks?.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
  };

  return (
    <Grid container style={{ height: "100vh" }} direction="column">
      <Grid item>
        <AccountMenu handleLogout={handleLogout} username={username} />
      </Grid>
      <Grid
        container
        item
        xs
        style={{ overflow: "auto", backgroundColor: palette.custom.lightGrey }}
      >
        <Grid
          item
          xs={12}
          md={4}
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
          minHeight="400px"
        >
          <CustomTypography>Productivity stats coming soon</CustomTypography>
          <ConstructionIcon fontSize="large" />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <TimerWidget />
        </Grid>
        <Grid container item xs={12} md={4}>
          <Grid item xs={12} container>
            <TasksWidget tasks={tasks} handleChange={handleChange} />
          </Grid>
          <Grid position="relative" item xs={12} container>
            <CompletedTasksWidget tasks={tasks} handleChange={handleChange} />
            <IconButton
              sx={{ position: "absolute", bottom: "0px", right: "0px" }}
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
