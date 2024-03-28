import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
} from "./actionTypes";

export const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
});

export const createTaskSuccess = (message: string) => ({
  type: CREATE_TASK_SUCCESS,
  payload: message,
});

export const createTaskFailure = (error: string) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const createTask = (
  task: {
    status: "to-do" | "completed" | "in-session";
    content: string;
    sortOrder?: number;
    secondsSpent?: number;
  },
  userId: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(createTaskRequest());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/user/${userId}/task`,
        task,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(createTaskSuccess(data));
      } else {
        dispatch(createTaskFailure(data.message));
      }
    } catch (error: any) {
      dispatch(createTaskFailure(error.message || "Unexpected error occurred"));
    }
  };
};

export const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST,
});

export const getTasksSuccess = (user: any) => ({
  type: GET_TASKS_SUCCESS,
  payload: user,
});

export const getTasksFailure = (error: string) => ({
  type: GET_TASKS_FAILURE,
  payload: error,
});

export const getTasks = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getTasksRequest());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/user/${userId}/tasks`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(getTasksSuccess(data.tasks));
      } else {
        dispatch(getTasksFailure(data.message));
      }
    } catch (error: any) {
      dispatch(
        getTasksFailure(
          error.response.data.message || "Unexpected error occurred"
        )
      );
    }
  };
};

export const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

export const updateTaskSuccess = (message: string) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: message,
});

export const updateTaskFailure = (error: string) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const updateTask = (
  task: {
    status: "to-do" | "completed" | "in-session";
    content?: string;
    sortOrder?: number;
    secondsSpent?: number;
  },
  taskId: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateTaskRequest());
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/task/${taskId}`,
        task,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(updateTaskSuccess(data));
      } else {
        dispatch(updateTaskFailure(data.message));
      }
    } catch (error: any) {
      dispatch(updateTaskFailure(error.message || "Unexpected error occurred"));
    }
  };
};

export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (message: string) => ({
  type: DELETE_TASK_SUCCESS,
  payload: message,
});

export const deleteTaskFailure = (error: string) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const deleteTask = (taskId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/task/${taskId}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(deleteTaskSuccess(data));
      } else {
        dispatch(deleteTaskFailure(data.message));
      }
    } catch (error: any) {
      dispatch(deleteTaskFailure(error.message || "Unexpected error occurred"));
    }
  };
};
