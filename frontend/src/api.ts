import axios, { InternalAxiosRequestConfig } from "axios";
import { getTokenFromLocalStorage } from "./utils";

const publicApi = axios.create({ baseURL: "http://localhost:8081/api" });
export const privateApi = axios.create({
  baseURL: "http://localhost:8081/api",
});

privateApi.interceptors.request.use(function (
  request: InternalAxiosRequestConfig
) {
  let token: string = "";
  if (window.location.pathname.startsWith("/dashboard")) {
    token = getTokenFromLocalStorage() || "";
  }
  if (token.trim().length > 0) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
export default publicApi;
