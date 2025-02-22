import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  id: string | null;
}

const clickedPersonnelSlice = createSlice({
  name: "clickedPersonnel",
  initialState: {
    id: null,
  } as state,
  reducers: {
    setClickedPersonnel(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    removeClickedPersonnel(state) {
      state.id = null;
    },
  },
});

export const clickedPersonnelActions = clickedPersonnelSlice.actions;

export default clickedPersonnelSlice;
