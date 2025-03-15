import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/shared/infra/api";

export type AuthContextData = {
  children: ReactNode;
};
type ISignInProps = {
  email: string;
  password: string;
};

type AuthContextProps = {
  isLoggedIn: boolean;
  SignIn: (props: ISignInProps) => void;
  LogOut: any;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextData) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  //todo Insert a validate-token
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       try {
  //         // Verifique a validade do token no backend
  //         await api.get("/validate-token", { headers: { Authorization: `Bearer ${token}` } });
  //         setIsLoggedIn(true);
  //       } catch {
  //         localStorage.removeItem("token");
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const SignIn = async (props: ISignInProps) => {
    try {
      const response = await api.post("/sessions", props);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setIsLoggedIn(!!token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      window.alert("Falha no login");
      api.defaults.headers.common["Authorization"] = null;
    }
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, SignIn, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
}
