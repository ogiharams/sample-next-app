import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    idCount: 3,
    tasks: [
      {
        id: 1,
        title: "TAKS A",
        completed: false,
      },
      {
        id: 2,
        title: "TAKS B",
        completed: true,
      },
      {
        id: 3,
        title: "TAKS C",
        completed: false,
      },
    ],
  },
  reducers: {
    newTask: (state, action) => {
      state.idCount++;
      const newItem = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      // 配列の前に追加
      state.tasks = [newItem, ...state.tasks];
      // 配列の後に追加
      // state.tasks = [...state.tasks, newItem];
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id == action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { newTask, completeTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
