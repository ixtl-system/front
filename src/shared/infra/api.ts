import axios from "axios";
import { errorInterceptor } from "./interceptors/errorInterceptor";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// api.interceptors.response.use(function (config) {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     window.alert("Sem token");
//   }
//   return config;
// });


api.interceptors.response.use(config => config, errorInterceptor);
