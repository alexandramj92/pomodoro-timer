import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "../reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;


export default store;
