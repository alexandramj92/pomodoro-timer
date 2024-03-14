import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Grid } from "@mui/material";
import { TimerWidget } from "../components/TimerWidget";
import { AccountMenu } from "../components/AccountMenu";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { verifyCookie } from "../actions";
import { RootState } from "../reducers";


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
  return (
    <Box width="100%">
      <AccountMenu handleLogout={handleLogout} username={username} />
      <Grid container spacing={1}>
        <Grid container item spacing={3} xs={4}>
          <TimerWidget />
        </Grid>
        <Grid container item spacing={3} xs={4}>
          <Box
            sx={{ width: "100%", height: "100%", backgroundColor: "red" }}
          ></Box>
        </Grid>
        <Grid container item spacing={3} xs={4}>
          {" "}
          <Box
            sx={{ width: "100%", height: "100%", backgroundColor: "blue" }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};
