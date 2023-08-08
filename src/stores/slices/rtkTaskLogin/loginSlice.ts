import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/";
// localstrageに保存したJWT
// if (typeof localStorage !== "undefined") {
//   const token = localStorage.localJWT;
//   console.log("token", token);
// }
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1Nzk5MTI5LCJqdGkiOiJmYWY1MjBkMDAwYmE0NjllYTRlYzdjYzIzZjY2NTczZCIsInVzZXJfaWQiOjJ9.4HHzvRMOz_c5ms5mUfigkhUXJnfdIhLf5FzFDFh8EcQ";

// ユーザー名とPWを渡すとjwtトークン取得API
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res.data;
});

// アカウントが存在しない場合に新規作成するAPI
export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res.data;
  }
);

// ログインユーザーのユーザーIDとユーザー名を取得するAPI
export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiUrl}api/myself/`, {
    headers: {
      Authorization: ` JWT ${token}`,
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: "rtkLogin",
  initialState: {
    authen: {
      username: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      username: "",
    },
  },
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
      console.log(state, action.payload);
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  // 成功、失敗、ペンディング中した後処理
  extraReducers: (builder) => {
    // ログイン成功時
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      // localstrageにJWTトークンをセット
      localStorage.setItem("localJWT", action.payload.access);
      // ログイン成功時にtasksページにに遷移
      action.payload.access && (window.location.href = "/rtkTasks/Tasks");
    });
    // ユーザー情報取得成功時
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      // 取得したユーザーID、ユーザー名をstateに格納
      state.profile = action.payload;
    });
  },
});

// actionをエクスポート
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
// sliceのstateをコンポーネントで参照できるようにする
export const selectAuthen = (state) => state.rtkLogin.authen;
export const selectLoginView = (state) => state.rtkLogin.isLoginView;
export const selectProfile = (state) => state.rtkLogin.profile;

export default loginSlice.reducer;
