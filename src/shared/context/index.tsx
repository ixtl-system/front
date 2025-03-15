import React from "react";

import { AuthContextProvider } from "@/shared/context/AuthContext";

interface IContextProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
