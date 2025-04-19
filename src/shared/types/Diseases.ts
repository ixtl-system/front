import { IUserMedication } from "./Medication";

export interface IDisease {
  id: string;
  name: string;
  medicalSpeciality: string;
  createdAt: string;
}

export interface IUserDiseases extends Omit<IDisease, "name"> {
  customName: string;
  diseaseName: string;
  diseaseId: string;
}

export interface IUserDiseasesAndMedications {
  id: string;
  diseaseName: string;
  customName: string;
  medications: IUserMedication[];
}
