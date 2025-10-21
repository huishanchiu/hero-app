import axios from "axios";
import CustomError from "./CustomError";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://hahow-recruit.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // HTTP 錯誤
    if (error.response) {
      const httpStatus = error.response.status;
      const statusText = error.response.statusText;
      return Promise.reject(new CustomError(httpStatus, statusText));
    }

    // 網路錯誤（沒有 response）
    return Promise.reject(new CustomError(0, error.statusText || "Network Error"));
  }
);
