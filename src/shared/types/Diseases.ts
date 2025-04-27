import { IUserMedication } from "./Medication";

export interface IDisease {
  id: string;
  name: string;
  medicalSpeciality: string;
  createdAt: string;
}

export interface IUserDiseases extends IDisease {
  diseaseId: string;
}

export interface IUserDiseasesAndMedications {
  id: string;
  name: string;
  medications: IUserMedication[];
}
