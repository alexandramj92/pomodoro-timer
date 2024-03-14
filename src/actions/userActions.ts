import axios from "axios";
import { Dispatch } from "redux";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  VERIFY_COOKIE_FAILURE,
  VERIFY_COOKIE_REQUEST,
  VERIFY_COOKIE_SUCCESS,
} from "./actionTypes";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (message: string) => ({
  type: LOGIN_SUCCESS,
  payload: message,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (
  credentials: { email: string; password: string },
  navigate: Function
) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(loginSuccess(data.message));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(loginFailure(data.message));
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message || "Unexpected error occurred"));
    }
  };
};

export const verifyCookieRequest = () => ({
  type: VERIFY_COOKIE_REQUEST,
});

export const verifyCookieSuccess = (username: string) => ({
  type: VERIFY_COOKIE_SUCCESS,
  payload: username,
});

export const verifyCookieFailure = () => ({
  type: VERIFY_COOKIE_FAILURE,
});

export const verifyCookie = (
  token: string | undefined,
  navigate: Function,
  removeCookie: Function
) => {
  return async (dispatch: Dispatch) => {
    dispatch(verifyCookieRequest());
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      if (status) {
        dispatch(verifyCookieSuccess(user));
      } else {
        dispatch(verifyCookieFailure());
        removeCookie("token", { path: "/" });
        navigate("/login");
      }
    } catch (error) {
      dispatch(verifyCookieFailure());
      removeCookie("token", { path: "/" });
      navigate("/login");
    }
  };
};

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user: any) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error: string) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signupUser = (
  userData: { email: string; password: string; username: string },
  navigate: Function
) => {
  return async (dispatch: Dispatch) => {
    dispatch(signupRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        userData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(signupSuccess(data.user));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(signupFailure(data.message));
      }
    } catch (error: any) {
      dispatch(
        signupFailure(
          error.response.data.message || "Unexpected error occurred"
        )
      );
    }
  };
};
