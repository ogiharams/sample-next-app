import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type PlayStart = {
  playStart: boolean;
};

const initialState: PlayStart = {
  playStart: false,
};

// ポケモン図鑑がStartしたかどうかを管理するSlice
export const playStartSlice = createSlice({
  name: "PlayStart",
  initialState,
  reducers: {
    // StartボタンとBackボタン押下時のAction
    setPlayStartState: (state, action: PayloadAction<PlayStart>) => {
      state.playStart = action.payload.playStart;
    },
  },
});

export const { setPlayStartState } = playStartSlice.actions;

export const playStart = (state: RootState) => state.playStartState.playStart;

export const playStartReducer = playStartSlice.reducer;
