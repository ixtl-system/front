import { IDisease } from "../types/Diseases";
import { IMedication } from "../types/Medication";

export const findDiseaseName = (id: string, allDiseases:IDisease[]): string => {
  const disease = allDiseases.find((d) => d.id === id);
  return disease ? disease.name : "";
}

export const findMedicationName = (id: string, allMedication: IMedication[]): string => {
  const medication = allMedication.find((d) => d.id === id);
  return medication ? medication.name : "";
}