import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  const unAuthRoutes = [401, 403];
  const status = error.response?.status;
  const isUserAuthenticated = localStorage.getItem("token")

  // if (status && unAuthRoutes.includes(status) && isUserAuthenticated) {
  //   localStorage.clear();
  //   window.open("/", "_self");
  // }

  return Promise.reject(error);
};
