import React from "react";

import { AuthContextProvider } from "./AuthContext";
import { ProfileContextProvider } from "./Profile";
import { UserContextProvider } from "./UserContext";

interface IContextProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProps) => {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};
