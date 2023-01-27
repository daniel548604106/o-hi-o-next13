import { refreshAccessTokenAPI } from "../api/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "@/lib/cookies";

// types
export interface Response<T> {
  data: T;
  status: {
    code: string;
    message: string;
  };
}

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/v1"
      : "https://o-hi-o-server.onrender.com/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const fetcher = (url: string, params: any = {}) =>
  axiosInstance.get(url, { ...(params && params) }).then((res) => res.data);

// request
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = Cookies.get("accessToken");
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };
  return config;
});

// response
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Response<unknown>>) => res,
  async (error) => {
    const refreshToken = Cookies.get("refreshToken");
    // const { email } = JSON.parse(window?.localStorage.getItem("user") || "");

    const originalRequest = error?.config;

    console.log(originalRequest);

    switch (error.response.status) {
      case 401:
        {
          window.location.href = "/login";
        }

        break;

      // Refresh Token
      case 403: {
        // if (!originalRequest._retry && refreshToken) {
        //   originalRequest._retry = true;
        //   const { accessToken } = await refreshAccessTokenAPI({
        //     email,
        //     refreshToken,
        //   });
        //   axios.defaults.headers.common["Authorization"] =
        //     "Bearer " + accessToken;
        //   return axiosInstance(originalRequest);
        // }
        // return Promise.reject(error);
      }
      default:
        return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// utils
const addAxiosToken = (token: string) => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};

export default axiosInstance;

export { axiosInstance as axios, fetcher, addAxiosToken };
