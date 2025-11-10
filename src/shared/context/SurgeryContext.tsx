import { message } from "antd";
import React, { createContext, useState } from "react";

import { api } from "@/shared/infra/api";

import { ICreateSurgeryParams, IUserSurgery } from "../types/Surgery";

interface SurgeryContextProps {
  userSurgeries: IUserSurgery[];
  fetchUserSurgeries: () => Promise<void>;
  createUserSurgery: (props: ICreateSurgeryParams) => Promise<void>;
}

export const SurgeryContext = createContext<SurgeryContextProps>({} as SurgeryContextProps);

export const SurgeryProvider = ({ children }: { children: React.ReactNode }) => {
  const [userSurgeries, setUserSurgeries] = useState<IUserSurgery[]>([]);

  const fetchUserSurgeries = async () => {
    try {
      const { data } = await api.get("/medical-history/surgeries");
      setUserSurgeries(data);
    } catch (error) {
      message.error("Erro ao buscar lista de cirurgias");
    }
  };

  const createUserSurgery = async (props: ICreateSurgeryParams) => {
    try {
      await api.post("/users/surgeries", { ...props });
    } catch (error) {
      message.error("Erro ao buscar doenças");
    }
  };

  return (
    <SurgeryContext.Provider
      value={{
        fetchUserSurgeries,
        createUserSurgery,
        userSurgeries
      }}
    >
      {children}
    </SurgeryContext.Provider>
  );
};
