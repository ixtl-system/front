import { ConfigProvider } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import React from "react";

import { AuthContextProvider } from "./AuthContext";
import { DiseasesProvider } from "./DiseasesContext";
import { EventProvider } from "./EventContext";
import { ProfileContextProvider } from "./Profile";
import { SurgeryProvider } from "./SurgeryContext";
import { UserContextProvider } from "./UserContext";

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
            <SurgeryProvider>
              <ConfigProvider locale={ptBR}>
                {children}
              </ConfigProvider>
            </SurgeryProvider>
            </DiseasesProvider>
          </EventProvider>
        </UserContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};
