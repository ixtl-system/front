import { api } from "@/shared/infra/api";
import { message } from "antd";
import React, { createContext, useState } from "react";
import { IDisease, IUserDiseases, IUserDiseasesAndMedications } from "../types/Diseases";
import { IMedication, IUserMedication } from "../types/Medication";


interface DiseasesContextProps {
  allDiseases: IDisease[];
  userDiseases: IUserDiseases[];
  userMedications: IUserMedication[];
  userDiseasesAndMedications: IUserDiseasesAndMedications[];
  medicationsList: IMedication[];
  fetchMedicationsList: () => Promise<void>;
  fetchAllDiseases: () => Promise<void>;
  fetchUserDiseases: () => Promise<void>;
  fetchUserMedications: () => Promise<void>;
  removeUserDisease: (id: string) => Promise<{ success:boolean, message?: string }>;
  removeUserMedication: (id: string) => Promise<{ success:boolean, message?: string }>;
  createUserDisease: (diseaseId: string, diseaseName: string) => Promise<void>;
  createUserMedication: (data: CreateUserMedicationProps) => Promise<void>;
  getUserDiseasesAndMedications: () => Promise<void>;
}

interface CreateUserMedicationProps {
  medicationId: string;
  diseaseId: string;
  startUsing?:string,
  endUsing?: string,
  name: string;
  isDaimeHelp?: boolean;
}

export const DiseasesContext = createContext<DiseasesContextProps>({} as DiseasesContextProps);

export const DiseasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allDiseases, setAllDiseases] = useState<IDisease[]>([]);
  const [userDiseases, setUserDiseases] = useState<IUserDiseases[]>([]);
  const [medicationsList, setMedicationsList] = useState<IMedication[]>([]);
  const [userMedications, setUserMedications] = useState<IUserMedication[]>([]);
  const [userDiseasesAndMedications, setUserDiseasesAndMedications] = useState<IUserDiseasesAndMedications[]>([]);

  const fetchMedicationsList = async () => {
    try {
      const { data } = await api.get("/medications");
      setMedicationsList(data);
    } catch (error) {
      console.error("Erro ao buscar lista de medicações", error);
    }
  };

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

  const createUserDisease = async (diseaseId: string, diseaseName: string) => {
    const params = { 
      diseaseId, 
      diseaseName
    };

    try {
      await api.post(
        `/medical-history/disease`,
        params
      );
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
      await api.post("/medical-history/medications", { ...medication, startUsing: "SIX_MONTH", isDaimeHelp: false});
      message.success("Medicação registrada com sucesso!");
      await fetchUserMedications();
    } catch (error) {
      message.error("Erro ao registrar medicação");
      console.error("Erro ao registrar medicação", error);
    }
  };

  const getUserDiseasesAndMedications = async () => {
    try {
      const [diseasesResponse, medicationsResponse] = await Promise.all([
        api.get("/profiles/diseases"),
        api.get("/profiles/medications")
      ]);

      const diseasesData: IUserDiseases[] = diseasesResponse.data;
      const medicationsData: IUserMedication[] = medicationsResponse.data;

      setUserDiseases(diseasesData);
      setUserMedications(medicationsData);

      const combinedData: IUserDiseasesAndMedications[] = diseasesData.map(disease => ({
        id: disease.id,
        name: disease.name,
        medications: medicationsData.filter(med => med.userDiseaseId === disease.id)
      }));

      setUserDiseasesAndMedications(combinedData);
    } catch (error) {
      console.error("Erro ao buscar doenças e medicações do usuário", error);
    }
  };

  const removeUserDisease = async (id: string) => {
    try {
      await api.delete(`/medical-history/diseases/${id}`);
      getUserDiseasesAndMedications();

      return { success: true }
    } catch {
      return { success: false, message: "Falha ao remover medicação!" }
    }
  }

  const removeUserMedication = async (id: string) => {
    try {
      await api.delete(`/medical-history/medications/${id}`);
      getUserDiseasesAndMedications();
      
      return { success: true }
    } catch {
      return { success: false, message: "Falha ao remover medicação!" }
    }
  }

  return (
    <DiseasesContext.Provider
      value={{
        allDiseases,
        userDiseases,
        userMedications,
        userDiseasesAndMedications,
        medicationsList,
        removeUserDisease,
        removeUserMedication,
        fetchMedicationsList,
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
