import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Grid, IconButton } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import GitHubIcon from "@mui/icons-material/GitHub";

import { TimerWidget } from "../components/TimerWidget";
import { AccountMenu } from "../components/AccountMenu";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { getTasks, updateTask, verifyCookie } from "../actions";
import { RootState } from "../reducers";
import { CustomTypography } from "../components/CustomTypography";
import { TasksWidget } from "../components/TasksWidget";
import { palette } from "../utils/color";
import { CompletedTasksWidget } from "../components/CompletedTasksWidget";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const { user } = useAppSelector((state: RootState) => state.user);
  const { tasks } = useAppSelector((state: RootState) => state.task);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyCookie(cookies.token, navigate, removeCookie));
    if (user?.id) dispatch(getTasks(user?.id));
  }, [cookies, navigate, removeCookie, dispatch, user?.id]);
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/signup");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = event.target.value;
    const currentStatus = tasks?.find((task) => task._id === taskId)?.status;
    const newStatus =
      currentStatus === "completed"
        ? "to-do"
        : currentStatus === "to-do" || "in-session"
        ? "completed"
        : currentStatus;

    if (newStatus) dispatch(updateTask({ status: newStatus }, taskId));
  };

  return (
    <Grid container height='100vh'  direction="column">
      <Grid item>
        <AccountMenu handleLogout={handleLogout} username={user?.username} />
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
        <Grid height="100%" container item xs={12} md={4}>
          <Grid item xs={12} container>
            <TasksWidget handleChange={handleChange} />
          </Grid>
          <Grid position="relative" item xs={12} container>
            <CompletedTasksWidget handleChange={handleChange} />
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
