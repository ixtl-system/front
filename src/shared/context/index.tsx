import React from "react";

import { AuthContextProvider } from "./AuthContext";
import { ProfileContextProvider } from "./Profile";

interface IContextProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProps) => {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        {children}
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};
