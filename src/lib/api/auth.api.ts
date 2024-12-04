import axios from "axios";

import axiosClient from "@/lib/api/axiosClient";
import * as cookie from "@/lib/cookie";
import SessionChecker from "@/lib/util/sessionChecker";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ping = async () => {
  try {
    const res = await client.get("/auth/ping", {
      headers: { Authorization: `Bearer ${cookie.get("token")}` },
    });
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
  if (!doNotRemoveToken)
    axiosClient
      .post("/auth/logout", {
        token: localStorage.getItem("refresh"),
      })
      .finally(() => {
        cookie.remove("token");
        localStorage.clear();

        SessionChecker();
      });
  else {
    cookie.remove("token");
    localStorage.clear();

    SessionChecker();
  }
};

export const refreshJWT = async ({ token }: { token: string }) => {
  const { data } = await client.post("/auth/refresh", { refreshToken: token });
  cookie.set("token", data.accessToken, {});
  localStorage.setItem("refresh", data.refreshToken);
};
