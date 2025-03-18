import { createContext, ReactNode } from "react";
import { api } from "../infra/api";
import { IDrug } from "../types/Drug";



export type ProfileContextData = {
  children: ReactNode;
};


type ProfileContextProps = {
  updateDrugHistory: (params: IDrug[]) => Promise<void>
};

export const ProfileContext = createContext({} as ProfileContextProps);

export function ProfileContextProvider({ children }: ProfileContextData) {

  async function updateDrugHistory(params: IDrug[]) {
    try {
      await api.post("/users/drugs/history", params)
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  return (
    <ProfileContext.Provider value={{
      updateDrugHistory
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
