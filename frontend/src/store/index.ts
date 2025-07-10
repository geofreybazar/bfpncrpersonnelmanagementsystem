import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import filteredPersonnelSlice from "./filteredPersonnelSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  personnel: filteredPersonnelSlice.reducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootState = ReturnType<typeof store.getState>;
