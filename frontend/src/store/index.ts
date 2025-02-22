import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import clickedPersonnelSlice from "./clickedPersonnelSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  clickedPersonnel: clickedPersonnelSlice.reducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootState = ReturnType<typeof store.getState>;
