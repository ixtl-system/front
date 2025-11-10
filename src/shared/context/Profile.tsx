// context/Profile.tsx
import { createContext, ReactNode, useState } from "react";

import { api } from "../infra/api";
import { IDrug } from "../types/Drug";

export type ProfileContextProps = {
  updateDrugHistory: (params: IDrug[]) => Promise<void>;
  fetchDrugs: () => Promise<void>;
  drugs: IDrug[];
  setDrugs: React.Dispatch<React.SetStateAction<IDrug[]>>;
};

export const ProfileContext = createContext({} as ProfileContextProps);

type ProfileContextData = {
  children: ReactNode;
};

export function ProfileContextProvider({ children }: ProfileContextData) {
  const [drugs, setDrugs] = useState<IDrug[]>([]);

  async function updateDrugHistory(params: IDrug[]) {
    try {
      await api.post("/medical-history/drugs", params);
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  async function fetchDrugs() {
    try {
      const response = await api.get<IDrug[]>("/medical-history/drugs");
      const sortedDrugs = response.data.sort((a, b) => {
        const nameA = (a.drugName || "").toLowerCase();
        const nameB = (b.drugName || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });

      setDrugs(sortedDrugs);
    } catch (error) {
      console.error("Erro ao buscar histórico de drogas:", error);
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        updateDrugHistory,
        fetchDrugs,
        drugs,
        setDrugs,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
