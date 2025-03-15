import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

// api.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     window.alert("Sem token");
//   }
//   return config;
// });
