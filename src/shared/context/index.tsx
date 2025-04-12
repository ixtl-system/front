import React from "react";
import ptBR from "antd/es/locale/pt_BR";
import { ConfigProvider } from "antd";

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
              <ConfigProvider locale={ptBR}>
                {children}
              </ConfigProvider>
            </DiseasesProvider>
          </EventProvider>
        </UserContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};
