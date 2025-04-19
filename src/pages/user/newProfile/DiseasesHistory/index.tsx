import { PiPlusCircle, PiXCircle } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  ActionButtons,
  AddButton,
  DiseaseItem,
  DiseasesContainer,
  FormColumn,
  FormRow,
} from "./styles";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { IDisease } from "@/shared/types/Diseases";
import { IMedication } from "@/shared/types/Medication";
import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";

interface FormData {
  diseaseId: string;
  customName?: string;
  medication?: string;
  medication_description?: string;
}

export const DiseasesHistory = () => {
  const {
    allDiseases,
    userDiseasesAndMedications,
    medicationsList,
    createUserDisease,
    createUserMedication,
    getUserDiseasesAndMedications,
  } = useDiseases();

  const { control, handleSubmit, register, reset } = useForm<FormData>();
  const [showCustomDisease, setShowCustomDisease] = useState(false);
  const [showCustomMedication, setShowCustomMedication] = useState(false);

  const findDiseaseName = (id: string): string => {
    const disease = allDiseases.find((d) => d.id === id);
    return disease ? disease.name : "";
  }

  const onSubmit = async (data: FormData) => {
    const { diseaseId, customName, medication, medication_description } = data;
    console.log(data)
    if (!diseaseId) return;
    if (medication?.toLowerCase() === "outra" && !medication_description) return;

    const diseaseName = findDiseaseName(diseaseId);
    const diseaseIsNotRegistered = String(diseaseName).toLowerCase() === "outra";

    const exists = userDiseasesAndMedications.some((ud) => ud.id === diseaseId);
    if (!exists) {
      await createUserDisease(
        diseaseId,
        diseaseIsNotRegistered ? customName : ""
      );
    }

    if (medication) {
      const medsForDisease = userDiseasesAndMedications.find(
        (ud) => ud.id === diseaseId
      )?.medications;

      const hasMed = medsForDisease?.some(
        (med) => med.name === medication
      );

      if (!hasMed) {
        const name = medication?.toLowerCase() === "outra" ? medication_description : medication;
        await createUserMedication({
          diseaseId,
          name: String(name),
          startUsing: new Date().toISOString(),
        });
      }
    }

    reset();
    getUserDiseasesAndMedications();
  };

  const handleSelectDisease = (value: string) => {
    const selectedDisease = allDiseases.find((d) => d.id === value);
    setShowCustomDisease(selectedDisease?.name.toLowerCase() === "outra");
  };

  const handleSelectMedication = (value: string) => {
    const selectedMedication = medicationsList.find((m) => m.name === value);
    setShowCustomMedication(selectedMedication?.name.toLowerCase() === "outra");
  }

  const handleRemoveDisease = (id: string) => console.log(id);
  const handleRemoveMedication = (dId: string, med: string) => console.log(dId, med);

  return (
    <DiseasesContainer>
      <h3>Adicionar doença e medicação:</h3>
      <FormRow onSubmit={handleSubmit(onSubmit)}>
        <FormColumn>
          <p>Doença:</p>
          <CustomSelect
            name="diseaseId"
            placeholder="Selecione uma doença"
            options={allDiseases.map((d: IDisease) => ({ value: d.id, label: d.name }))}
            onSelect={handleSelectDisease}
            control={control}
          />

          {showCustomDisease && (
            <FormColumn>
              <p>Descreva a doença:</p>
              <CustomInput
                name="customName"
                register={register}
                placeholder="Digite o nome da doença"
              />
            </FormColumn>
          )}
        </FormColumn>

        <FormColumn>
          <p>Medicação:</p>
          <CustomSelect
            name="medication"
            placeholder="Selecione uma medicação"
            options={medicationsList.map((m: IMedication) => ({ value: m.name, label: m.name }))}
            control={control}
            onSelect={handleSelectMedication}
          />

          {showCustomMedication && (
            <FormColumn>
              <p>Descreva o medicamento:</p>
              <CustomInput
                name="medication_description"
                register={register}
                placeholder="Digite o nome do medicamento"
              />
            </FormColumn>
          )}
        </FormColumn>

        <AddButton type="submit">
          Adicionar <PiPlusCircle />
        </AddButton>
      </FormRow>

      {userDiseasesAndMedications.length > 0 && (
        <>
          <h3>Lista adicionada:</h3>
          {userDiseasesAndMedications.map((d) => (
            <DiseaseItem key={d.id}>
              <div>
                <strong>{d.customName || d.diseaseName}</strong>
                {d.medications?.length > 0 && (
                  <div>
                    <p>Remédio:</p>
                    <ul>
                      {d.medications.map((med, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => handleRemoveMedication(d.id, med.name)}
                          >
                            {med.name} <PiXCircle />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <ActionButtons>
                <button onClick={() => handleRemoveDisease(d.id)}>
                  Remover
                </button>
              </ActionButtons>
            </DiseaseItem>
          ))}
        </>
      )}
    </DiseasesContainer>
  );
};
