import { useForm } from "react-hook-form";
import { PiPlusCircle } from "react-icons/pi";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { IDisease } from "@/shared/types/Diseases";
import { IFrequency } from "@/shared/types/Drug";
import { IMedication } from "@/shared/types/Medication";
import { findDiseaseName, findMedicationName } from "@/shared/utils/findDiseaseName";
import { useState } from "react";
import { DiseasesAndMedications } from "./DiseasesAndMedications";
import { DynamicFields } from "./MedicationFrequency";
import {
  AddButton,
  DiseasesContainer,
  FormColumn,
  FormRow,
  FrequencyLabel
} from "./styles";

export interface FormData {
  diseaseId: string;
  customName?: string;
  medicationId?: string;
  medicationDescription?: string;
  frequency?: IFrequency;
  startUsing?: string;
  endUsing?: string;
  isDaimeHelp?: boolean;
}

type MedicationFrequency = Exclude<IFrequency, "NEVER" | "SOMETIMES">;
const frequencyOptions = (
  Object.entries({
    ALWAYS: "Usa com frequência",
    STOPPED: "Parou de usar",
  }) as [MedicationFrequency, string][]
).map(([value, label]) => ({ value, label }));

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
  const [showCustomMedication, setShowCustomMedication] = useState(false);
  const [showCustomDisease, setShowCustomDisease] = useState(false);
  const [showMedicationFrequency, setShowMedicationFrequency] = useState(false);

  const onSubmit = async ({
    diseaseId, 
    customName, 
    medicationId, 
    medicationDescription, 
    endUsing, 
    startUsing, 
    isDaimeHelp, 
    frequency
  }: FormData) => {
    if (!diseaseId) return;

    const diseaseName = findDiseaseName(diseaseId, allDiseases);
    const exists = userDiseasesAndMedications.some((ud) => ud.id === diseaseId);
    if (!exists) {
      await createUserDisease(diseaseId, customName || diseaseName);
    }

    if (medicationId) {
      const medicationName = findMedicationName(medicationId, medicationsList);
      const medsForDisease = userDiseasesAndMedications.find((ud) => ud.id === diseaseId)
        ?.medications;

      const hasMed = medsForDisease?.some((med) => med.name === medicationName);
      if (!hasMed) {
        await createUserMedication({
          diseaseId,
          medicationId,
          name: medicationDescription || medicationName,
          ...(frequency === "ALWAYS" && startUsing ? { startUsing } : {}),
          ...(frequency === "STOPPED" && endUsing ? { endUsing } : {}),
          ...(frequency === "STOPPED" && isDaimeHelp ? { isDaimeHelp } : {})
        });
      }
    }

    reset();
    getUserDiseasesAndMedications();
  };

  const handleSelectMedication = (value: string) => {
    setShowMedicationFrequency(value !== "");
    const selectedMedication = medicationsList.find((m) => m.id === value);
    setShowCustomMedication(selectedMedication?.name.toLowerCase() === "outra");
  }

  const handleSelectDisease = (value: string) => {
    const selectedDisease = allDiseases.find((m) => m.id === value);
    setShowCustomDisease(selectedDisease?.name.toLowerCase() === "outra");
  }

  return (
    <DiseasesContainer>
      <h3>Adicionar doença e medicação:</h3>
      <FormRow onSubmit={handleSubmit(onSubmit)}>
        <FormColumn>
          <FrequencyLabel>Doença:</FrequencyLabel>

          <CustomSelect
            control={control}
            name="diseaseId"
            placeholder="Selecione uma doença"
            options={allDiseases.map((d: IDisease) => ({ value: d.id, label: d.name }))}
            onSelect={handleSelectDisease}
          />

          {showCustomDisease && (
            <FormColumn>
              <FrequencyLabel>Outra doença:</FrequencyLabel>
              <CustomInput
                name="customName"
                register={register}
                placeholder="Descreva a doença"
              />
            </FormColumn>
          )}
        </FormColumn>

        <FormColumn>
          <FrequencyLabel>Medicação:</FrequencyLabel>
          <CustomSelect
            name="medicationId"
            control={control}
            placeholder="Selecione uma medicação"
            options={[{ value: '', label: 'Nenhuma' }, ...medicationsList.map((m: IMedication) => ({ value: m.id, label: m.name }))]}
            onSelect={handleSelectMedication}
          />

          {showCustomMedication && (
            <FormColumn>
              <FrequencyLabel>Outra medicação:</FrequencyLabel>
              <CustomInput
                name="medicationDescription"
                register={register}
                placeholder="Descreva o medicamento"
              />
            </FormColumn>
          )}

          {showMedicationFrequency && (
            <>
              <FormColumn>
                <FrequencyLabel>Frequência de uso</FrequencyLabel>
                <CustomSelect
                  name="frequency"
                  control={control}
                  placeholder="Selecione a frequência"
                  options={frequencyOptions}
                />
                
              </FormColumn>
              <DynamicFields control={control} />
            </>
          )}
        </FormColumn>

        <AddButton type="submit">
          Adicionar <PiPlusCircle />
        </AddButton>
      </FormRow>

      {userDiseasesAndMedications.length > 0 && <DiseasesAndMedications />}
    </DiseasesContainer>
  );
};
