import { rejects } from "assert";
import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { resolve } from "path";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const API_URL = apiUrl || "http://localhost:1337";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
};
type Login = {
  identifier: string;
  password: string;
};

// 新しいユーザーを登録
export const registerUser = (
  username: RegisterUser,
  email: RegisterUser,
  password: RegisterUser
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
      })
      .then((res: AxiosResponse<any>) => {
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/foodDelivery";
        // console.log(res.data.jwt);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

// ログイン
export const login = (identifier: Login, password: Login) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local`, {
        identifier,
        password,
      })
      .then((res: AxiosResponse<any>) => {
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/foodDelivery";
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
