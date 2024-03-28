import {
  GET_TASKS_FAILURE,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
} from "../actions";

export interface TaskState {
  loading: boolean;
  message: string | null;
  error: string | null;
  tasks: {
    _id: string;
    status: "to-do" | "completed" | "in-session";
    content?: string;
    sortOrder?: number;
    secondsSpent?: number;
  }[];
}

const initialState: TaskState = {
  loading: false,
  message: null,
  error: null,
  tasks: [],
};

export const taskReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): TaskState => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload, error: null };
    case GET_TASKS_FAILURE:
      return { ...state, loading: false, tasks: [], error: action.payload };
    case CREATE_TASK_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_TASK_SUCCESS:
      const newTask = action.payload.task;
      const newTasks = [...state.tasks, newTask];
      return {
        ...state,
        loading: false,
        tasks: newTasks,
        message: action.payload.message,
        error: null,
      };
    case CREATE_TASK_FAILURE:
      return { ...state, loading: false, message: null, error: action.payload };
    case UPDATE_TASK_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_TASK_SUCCESS:
      const updatedTask = action.payload.task;

      const mergedTasks = state.tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );

      // If the updatedTask does not exist in the current tasks array, add it.
      if (!state.tasks.find((task) => task._id === updatedTask._id)) {
        mergedTasks.push(updatedTask);
      }
      return {
        ...state,
        loading: false,
        tasks: mergedTasks,
        message: action.payload.message,
        error: null,
      };
    case UPDATE_TASK_FAILURE:
      return { ...state, loading: false, message: null, error: action.payload };
    case DELETE_TASK_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_TASK_SUCCESS:
      const deletedTaskId = action.payload._id;
      const updatedTasks = state.tasks.filter(
        (task) => task._id !== deletedTaskId
      );

      return { ...state, loading: false, tasks: updatedTasks, error: null };
    case DELETE_TASK_FAILURE:
      return { ...state, loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};
