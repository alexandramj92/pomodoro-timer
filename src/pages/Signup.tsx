import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { CustomTypography } from "../components/CustomTypography";
import { breakpoints } from "../utils/breakpoints";
import { useAppDispatch } from "../utils/hooks";
import { signupUser } from "../actions";
import { ReactComponent as Logo } from "../icons/Logo.svg";

export const Signup = () => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm}px)`);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupUser(inputValue, navigate));

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        left={isMobile ? -15 : 0}
        position="absolute"
        top={0}
        height={200}
        marginTop={isMobile ? -9 : -7}
      >
        <Logo />
      </Box>
      <Paper
        sx={{
          width: isMobile ? "auto" : "500px",
          marginTop: "50px",
          padding: "20px",
        }}
        elevation={3}
      >
        <CustomTypography marginBottom="15px" variant="h2">
          Create an account
        </CustomTypography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <FormControl variant="standard">
            <TextField
              variant="outlined"
              type="email"
              name="email"
              label="Email"
              color="secondary"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <TextField
              type="text"
              name="username"
              label="Username"
              color="secondary"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <TextField
              type="password"
              name="password"
              value={password}
              label="Password"
              placeholder="Enter your password"
              onChange={handleOnChange}
              color="secondary"
            />
          </FormControl>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
          <CustomTypography variant="p">
            Already have an account? <Link to={"/login"}>Login</Link>
          </CustomTypography>
        </Box>
      </Paper>
    </Box>
  );
};
