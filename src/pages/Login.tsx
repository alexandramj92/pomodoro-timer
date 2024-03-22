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
import { loginUser } from "../actions";
import { useAppDispatch } from "../utils/hooks";
import { ReactComponent as Logo } from "../icons/Logo.svg";

export const Login = () => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm}px)`);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(inputValue, navigate));

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>
       <Box left={0} position="absolute" top={0} height={200} marginTop={-7}>
          <Logo />
        </Box>
      <Paper
        sx={{
          width: isMobile ? "auto" : "500px",
          padding: "20px",
        }}
        elevation={3}
      >
        <CustomTypography marginBottom="15px" variant="h2">
          Login Account
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
              type="email"
              label="Email"
              color="secondary"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <TextField
              label="Password"
              type="password"
              name="password"
              color="secondary"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </FormControl>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
          <CustomTypography variant="p">
            First time here? <Link to={"/signup"}>Create an account</Link>
          </CustomTypography>
        </Box>
      </Paper>
    </Box>
  );
};
