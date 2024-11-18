import axios from "axios";

import axiosClient from "@/lib/api/axiosClient";
import * as cookie from "@/lib/cookie";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ping = async () => {
  try {
    const res = await axiosClient.get("/auth/ping");
    return res.status.toString().at(0) === "2";
  } catch (e) {
    return false;
  }
};

export const register = async (
  name: string,
  email: string,
  nickname: string,
  password: string,
) => {
  const { data } = await client.post("/user/register", {
    name,
    email,
    nickname,
    password,
  });

  if (data.name !== name) throw new Error("회원가입에 실패하였습니다");

  return data;
};

export const passwordLogin = async (email: string, password: string) => {
  console.log(process.env);
  const { data } = await client.post("/auth/login/password", {
    email,
    password,
  });
  cookie.set("token", data.accessToken, {});
  localStorage.setItem("refresh", data.refreshToken);
  return data;
};

export const logout = async (doNotRemoveToken = false) => {
  if (doNotRemoveToken)
    await axiosClient.post("/auth/logout", {
      token: localStorage.getItem("refresh"),
    });

  cookie.remove("token");
  localStorage.clear();
  window.location.href = "/";
};

export const refreshJWT = async ({ token }: { token: string }) => {
  const { data } = await client.post("/auth/refresh", { token });
  cookie.set("token", data.accessToken, {});
  localStorage.setItem("refresh", data.refreshToken);
};