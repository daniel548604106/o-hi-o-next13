import { AxiosResponse } from "axios";

import axiosInstance, { Response } from "@/axios";

// 更改使用者密碼
// export const postSetPasswordAPI = (
//   data: PasswordData
// ): Promise<AxiosResponse<Response<PasswordData>>> =>
//   axiosInstance.post("/aprduser/setPassword", data);

// 社群登入
export const postOAuthLoginAPI = (data: { type: string; code: string }) => {
  return axiosInstance.post("/oauth/login", data);
};

// Refresh Token
export const refreshAccessTokenAPI = ({
  email,
  refreshToken,
}: {
  email: string;
  refreshToken: string;
}) => {
  return axiosInstance.post("/auth/refreshToken", { email, refreshToken });
};

// Refresh Token
export const validateAccessTokenAPI = () => {
  return axiosInstance.post("/auth/validateToken");
};
