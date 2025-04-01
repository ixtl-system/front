// DiseasesContext.tsx
import React, { createContext, useState } from "react";
import { message } from "antd";
import { api } from "@/shared/infra/api";

export interface IDisease {
  id: string;
  name: string;
  medicalSpeciality: string;
  createdAt: string;
}

export interface IUserDiseases extends Omit<IDisease, "name"> {
  diseaseName: string;
}

interface DiseasesContextProps {
  allDiseases: IDisease[];
  userDiseases: IUserDiseases[];
  fetchAllDiseases: () => Promise<void>;
  fetchUserDiseases: () => Promise<void>;
  registerUserDisease: (diseaseId: string) => Promise<void>;
}

export const DiseasesContext = createContext<DiseasesContextProps>({} as DiseasesContextProps);

export const DiseasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allDiseases, setAllDiseases] = useState<IDisease[]>([]);
  const [userDiseases, setUserDiseases] = useState<IUserDiseases[]>([]);

  const fetchAllDiseases = async () => {
    try {
      const { data } = await api.get("/diseases");
      setAllDiseases(data);
    } catch (error) {
      console.error("Erro ao buscar doenças", error);
    }
  };

  const fetchUserDiseases = async () => {
    try {
      const { data } = await api.get("/profiles/diseases");
      setUserDiseases(data);
    } catch (error) {
      console.error("Erro ao buscar doenças do usuário", error);
    }
  };

  const registerUserDisease = async (diseaseId: string) => {
    if (userDiseases.some(disease => disease.id === diseaseId)) {
      message.warning("Essa doença já foi cadastrada");
      return;
    }

    try {
      await api.post(`/users/disease/${diseaseId}`);
      message.success("Doença registrada com sucesso!");
      await fetchUserDiseases();
    } catch (error) {
      message.error("Erro ao registrar doença");
    }
  };

  return (
    <DiseasesContext.Provider
      value={{ allDiseases, userDiseases, fetchAllDiseases, fetchUserDiseases, registerUserDisease }}
    >
      {children}
    </DiseasesContext.Provider>
  );
};

