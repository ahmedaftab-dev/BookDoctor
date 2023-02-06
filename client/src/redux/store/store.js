import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from '../reducer/alertSlice';

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;