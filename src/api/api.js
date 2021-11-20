import axios from "axios";
import { baseUrl } from "./endpoints";

export const publicApi = axios.create({
  baseURL: baseUrl,
});

export const privateApi = axios.create({
  baseURL: baseUrl,
});

privateApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("matter_token");

  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
});
