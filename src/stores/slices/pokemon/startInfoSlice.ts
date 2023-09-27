import { createSlice } from "@reduxjs/toolkit";

export const startInfoSlice = createSlice({
  name: "startInfo",
  initialState: {
    startState: false,
  },
  reducers: {
    handleStartButton: (state) => {
      state.startState = true;
    },
    handleBackButton: (state) => {
      state.startState = false;
    },
  },
});

export const { handleStartButton, handleBackButton } = startInfoSlice.actions;

export const startState = (state: any) => state.startInfo.startState;

export default startInfoSlice.reducer;
