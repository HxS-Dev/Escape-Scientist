import { combineReducers } from "redux";
import { timerReducer } from "./reducers/timer";

export const reducers = combineReducers({
  timer: timerReducer,
});
