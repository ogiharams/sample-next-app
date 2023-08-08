import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:8000/api/tasks/";
if (typeof localStorage !== "undefined") {
  const token = localStorage.localJWT;
  console.log("token", token);
}
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1Nzk5MTI5LCJqdGkiOiJmYWY1MjBkMDAwYmE0NjllYTRlYzdjYzIzZjY2NTczZCIsInVzZXJfaWQiOjJ9.4HHzvRMOz_c5ms5mUfigkhUXJnfdIhLf5FzFDFh8EcQ";
export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("task/post", async (task) => {
  // 第二引数は登録するデータ
  const res = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task) => {
  // 第二引数は更新するデータ
  const res = await axios.put(`${apiUrl}${task.id}/`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncDelete = createAsyncThunk("task/delete", async (id) => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return id;
});

const taskSlice = createSlice({
  name: "rtkTask",
  initialState: {
    // task作成用
    tasks: [
      {
        id: 0,
        title: "",
        create_at: "",
        update_at: "",
      },
    ],
    // task修正用
    editedTask: {
      id: 0,
      title: "",
      create_at: "",
      update_at: "",
    },
    // 選択されたtask用
    selectedTask: {
      id: 0,
      title: "",
      create_at: "",
      update_at: "",
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        // 先頭に作成したタスクの追加
        tasks: [action.payload, ...state.tasks],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          // idが一致したタスクのみ更新
          t.id === action.payload.id ? action.payload : t
        ),
        // 更新後即時反映
        selectedTask: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTask: { id: 0, title: "", create_at: "", update_at: "" },
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state) => state.rtkTask.selectedTask;
export const selectEditedTask = (state) => state.rtkTask.editedTask;
export const selectTasks = (state) => state.rtkTask.tasks;

export default taskSlice.reducer;
