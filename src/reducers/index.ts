import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { UserState } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = {
  user: UserState;
};

export default rootReducer;
