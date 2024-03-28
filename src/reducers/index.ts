import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { UserState } from "./userReducer";
import { TaskState, taskReducer } from "./taskReducer";

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

export type RootState = {
  user: UserState;
  task: TaskState;
};

export default rootReducer;
