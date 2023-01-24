import { AxiosResponse } from "axios";

import axiosInstance, { Response } from "@/axios";

// 取得帳號資料
export const getAccountAPI = () => {
  return axiosInstance.get("/account");
};
