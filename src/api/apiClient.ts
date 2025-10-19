import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://hahow-recruit.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
