import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import taskReducer from "./slices/task/taskSlice";
import fetchReducer from "./slices/fetch/fetchSlice";
import fetch2Reducer from "./slices/fetch2/fetch2Slice";
import rtkLoginReducer from "./slices/rtkTaskLogin/loginSlice";
import rtkTaskReducer from "./slices/rtkTaskTask/taskSlice";
import custiomCounterReducer from "./slices/rtkLesson/custiomCounterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    fetch: fetchReducer,
    fetch2: fetch2Reducer,
    rtkLogin: rtkLoginReducer,
    rtkTask: rtkTaskReducer,
    custiomCounter: custiomCounterReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
