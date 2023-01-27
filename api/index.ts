import { AxiosResponse } from "axios";

import axiosInstance, { Response } from "@/axios";
import { Banner, PaginatedProducts } from "@/interfaces";

// 取得帳號資料
export const getAccountAPI = () => {
  return axiosInstance.get("/account");
};

export const getBannersAPI = (): Promise<AxiosResponse<Response<Banner>>> => {
  return axiosInstance.get("/banners");
};

export const getDiscountedProductsAPI = (): Promise<
  AxiosResponse<Response<PaginatedProducts>>
> => {
  return axiosInstance.get("/products/discount");
};

export const getRecommendedProductsAPI = (): Promise<
  AxiosResponse<Response<PaginatedProducts>>
> => {
  return axiosInstance.get(`/products/recommendation`);
};

export const getProductsAPI = (): Promise<
  AxiosResponse<Response<PaginatedProducts>>
> => {
  return axiosInstance.get("/products");
};
