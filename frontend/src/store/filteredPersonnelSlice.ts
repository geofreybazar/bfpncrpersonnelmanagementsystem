import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReturnedGetFilteredPersonnel } from "../utilities/models.ts";

interface UserState {
  personnel: ReturnedGetFilteredPersonnel | null;
}

const filteredPersonnelSlice = createSlice({
  name: "personnel",
  initialState: {
    personnel: null,
  } as UserState,
  reducers: {
    setFilteredPersonnel(
      state,
      action: PayloadAction<ReturnedGetFilteredPersonnel>
    ) {
      state.personnel = action.payload;
    },
  },
});

export const filteredPersonnelSliceActions = filteredPersonnelSlice.actions;

export default filteredPersonnelSlice;
