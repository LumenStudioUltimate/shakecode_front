import axios from "axios";

import { logout, refreshJWT } from "@/lib/api/auth.api";
import * as cookie from "@/lib/cookie";

const MAX_REQUESTS_COUNT = 1;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Issue: too slow
// TODO: wait for only auth requests
// wait until previous request is being resolved
instance.interceptors.request.use(
  (config) =>
    new Promise((resolve, reject) => {
      PENDING_REQUESTS++;

      const accessToken = cookie.get("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      const interval = setInterval(() => {
        if (PENDING_REQUESTS <= MAX_REQUESTS_COUNT) {
          clearInterval(interval);
          resolve(config);
        }
      }, INTERVAL_MS);
    }),
);

instance.interceptors.response.use(
  (response) => {
    PENDING_REQUESTS--;
    return Promise.resolve(response);
  },
  async (error) => {
    PENDING_REQUESTS--;
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh") || "";
      try {
        await refreshJWT({ token: refreshToken });
        return instance.request(error.config);
      } catch (e) {
        await logout(true);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
