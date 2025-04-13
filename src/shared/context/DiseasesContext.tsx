import React, { createContext, useState } from "react";
import { message } from "antd";
import { api } from "@/shared/infra/api";

export interface IDisease {
  id: string;
  name: string;
  medicalSpeciality: string;
  createdAt: string;
}

export interface IUserMedication {
  id: string;
  diseaseId: string;
  name: string;
  startUsing: string;
  createdAt: string;
}

export interface IUserDiseases extends Omit<IDisease, "name"> {
  diseaseName: string;
  diseaseId: string;
}

// Nova interface para cruzamento de doenças com medicações
export interface IUserDiseasesAndMedications {
  id: string;
  diseaseName: string;
  medications: IUserMedication[];
}

interface DiseasesContextProps {
  allDiseases: IDisease[];
  userDiseases: IUserDiseases[];
  userMedications: IUserMedication[];
  userDiseasesAndMedications: IUserDiseasesAndMedications[];
  fetchAllDiseases: () => Promise<void>;
  fetchUserDiseases: () => Promise<void>;
  fetchUserMedications: () => Promise<void>;
  createUserDisease: (diseaseId: string) => Promise<void>;
  createUserMedication: (data: CreateUserMedicationProps) => Promise<void>;
  getUserDiseasesAndMedications: () => Promise<void>;
}

interface CreateUserMedicationProps {
  diseaseId: string;
  name: string;
  startUsing: string;
}

export const DiseasesContext = createContext<DiseasesContextProps>({} as DiseasesContextProps);

export const DiseasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allDiseases, setAllDiseases] = useState<IDisease[]>([]);
  const [userDiseases, setUserDiseases] = useState<IUserDiseases[]>([]);
  const [userMedications, setUserMedications] = useState<IUserMedication[]>([]);
  const [userDiseasesAndMedications, setUserDiseasesAndMedications] = useState<IUserDiseasesAndMedications[]>([]);

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

  const createUserDisease = async (diseaseId: string) => {
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

  const fetchUserMedications = async () => {
    try {
      const { data } = await api.get("/profiles/medications");
      setUserMedications(data);
    } catch (error) {
      console.error("Erro ao buscar medicações do usuário", error);
    }
  };

  const createUserMedication = async (medication: CreateUserMedicationProps) => {
    try {
      await api.post("/users/medications", medication);
      message.success("Medicação registrada com sucesso!");
      await fetchUserMedications();
    } catch (error) {
      message.error("Erro ao registrar medicação");
      console.error("Erro ao registrar medicação", error);
    }
  };

  // Função para cruzar as doenças com as medicações
  const getUserDiseasesAndMedications = async () => {
    try {
      // Busca as doenças e medicações em paralelo
      const [diseasesResponse, medicationsResponse] = await Promise.all([
        api.get("/profiles/diseases"),
        api.get("/profiles/medications")
      ]);

      const diseasesData: IUserDiseases[] = diseasesResponse.data;
      const medicationsData: IUserMedication[] = medicationsResponse.data;

      // Atualiza os estados individuais
      setUserDiseases(diseasesData);
      setUserMedications(medicationsData);

      console.log({ diseasesData, medicationsData })

      // Cria o estado combinado, associando as medicações à doença correta
      const combinedData: IUserDiseasesAndMedications[] = diseasesData.map(disease => ({
        id: disease.id,
        diseaseName: disease.diseaseName,
        medications: medicationsData.filter(med => med.diseaseId === disease.diseaseId)
      }));

      setUserDiseasesAndMedications(combinedData);
    } catch (error) {
      console.error("Erro ao buscar doenças e medicações do usuário", error);
    }
  };

  return (
    <DiseasesContext.Provider
      value={{
        allDiseases,
        userDiseases,
        userMedications,
        userDiseasesAndMedications,
        fetchAllDiseases,
        fetchUserDiseases,
        createUserDisease,
        fetchUserMedications,
        createUserMedication,
        getUserDiseasesAndMedications,
      }}
    >
      {children}
    </DiseasesContext.Provider>
  );
};
