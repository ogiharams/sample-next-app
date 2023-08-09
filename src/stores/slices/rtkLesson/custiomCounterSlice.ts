import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const sleep = (msec: number) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk("fetch/dummy", async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJson = createAsyncThunk("fetch/api", async () => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/users/1");
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState: {
    mode: 0,
    value: 0,
    username: "",
  },
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
        case 1:
          state.value += 100 * action.payload;
        case 2:
          state.value += 10000 * action.payload;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });
    builder.addCase(fetchJson.fulfilled, (state, action) => {
      state.username = action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;
export const selectCounter = (state) => state.customCounter.value;
export const selectUsername = (state) => state.customCounter.username;
export default customCounterSlice.reducer;
