import React from "react";

import { AuthContextProvider } from "./AuthContext";
import { ProfileContextProvider } from "./Profile";
import { UserContextProvider } from "./UserContext";
import { EventProvider } from "./EventContext";
import { DiseasesProvider } from "./DiseasesContext";

interface IContextProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProps) => {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <UserContextProvider>
          <EventProvider>
            <DiseasesProvider>
              {children}
            </DiseasesProvider>
          </EventProvider>
        </UserContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};
