import { message } from "antd";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/shared/infra/api";

export type AuthContextData = {
  children: ReactNode;
};
type ISignInProps = {
  email: string;
  password: string;
  confirmPassword: string;
};
type ISignUpProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextProps = {
  isLoggedIn: boolean;
  SignIn: (props: ISignInProps) => Promise<void>;
  SignUp: (props: ISignUpProps) => Promise<void>;
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

  const SignIn = async (props: ISignInProps) => {
    try {
      const response = await api.post("/sessions", props);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setIsLoggedIn(!!token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      message.error(error.response.data.message || "Houve uma falha! Tente novamente ou contate o administrador!");
      setIsLoggedIn(false);
    }
  };

  const SignUp = async ({ email, password, confirmPassword }: ISignInProps) => {
    try {
      await api.post("/users", { email, password, confirmPassword });
      message.success("Conta criada com sucesso!");
    } catch (error) {
      message.error("Erro ao criar conta.");
    }
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, SignIn, SignUp, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
}
