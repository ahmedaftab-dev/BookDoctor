import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from '../reducer/alertSlice';
import { userSlice } from "../reducer/userSlice";
const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  user : userSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;