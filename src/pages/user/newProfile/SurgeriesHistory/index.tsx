import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiPlusCircle } from "react-icons/pi";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { useSurgery } from "@/shared/hooks/useSurgery";
import { IUsingTime } from "@/shared/types/Drug";
import { IMedication } from "@/shared/types/Medication";
import { ICreateSurgeryParams } from "@/shared/types/Surgery";

import {
  AddButton,
  FormColumn,
  FormRow,
  FrequencyLabel,
  SurgeriesContainer
} from "./styles";
import { SurgeriesAndMedications } from "./SurgeriesAndMedications";

const timeOptions = (
  Object.entries({
    SIX_MONTH: "6 meses",
    ONE_YEAR: "1 ano",
    TWO_YEARS: "2 anos",
    THREE_YEARS: "3 anos",
    MORE_THAN_THREE_YEARS: "Mais de 3 anos",
  }) as [IUsingTime, string][]
).map(([value, label]) => ({ value, label }));

export const SurgeriesHistory = () => {
  const { medicationsList } = useDiseases();
  const { createUserSurgery, fetchUserSurgeries } = useSurgery();
  const { control, handleSubmit, register, reset } = useForm<ICreateSurgeryParams>();
  const [showCustomMedication, setShowCustomMedication] = useState(false);

  const onSubmit = async (data: ICreateSurgeryParams) => {
    const params = { 
      name: data.name, 
      surgeryDate: data.surgeryDate,
      ...(data.observation && { observation: data.observation }),
      ...(data.medicine && { medicine: data.medicine.toLowerCase() === "outra" ? data.medicineDescription : data.medicine })
    }

    await createUserSurgery(params);
    await fetchUserSurgeries();
    reset();
  };

  const handleSelectMedication = (value: string) => {
    setShowCustomMedication(value?.toLowerCase() === "outra");
  }

  return (
    <SurgeriesContainer onSubmit={handleSubmit(onSubmit)}>
      <h3>Adicionar doença e medicação:</h3>
      <FormRow>
        <FormColumn>
          <FrequencyLabel>Cirurgia:</FrequencyLabel>
          <CustomInput
            register={register}
            name="name"
            placeholder="Ex: Colecistectomia"
          />
        </FormColumn>

        <FormColumn>
          <FrequencyLabel>Data da Cirurgia:</FrequencyLabel>
          <CustomSelect
            name="surgeryDate"
            control={control}
            placeholder="Selecione uma data"
            options={timeOptions}
          />
        </FormColumn>

        <FormColumn>
          <FrequencyLabel>Medicação:</FrequencyLabel>
          <CustomSelect
            name="medicine"
            control={control}
            placeholder="Selecione uma medicação"
            options={[{ value: '', label: 'Nenhuma' }, ...medicationsList.map((m: IMedication) => ({ value: m.name, label: m.name }))]}
            onSelect={handleSelectMedication}
          />

          {showCustomMedication && (
            <FormColumn>
              <FrequencyLabel>Outra medicação:</FrequencyLabel>
              <CustomInput
                name="medicineDescription"
                register={register}
                placeholder="Descreva o medicamento"
              />
            </FormColumn>
          )}
        </FormColumn>

        <FormColumn>
          <FrequencyLabel>Observação:</FrequencyLabel>
          <CustomInput
            register={register}
            name="observation"
            placeholder="Detalhes adicionais sobre a cirurgia"
          />
        </FormColumn>
      </FormRow>
      
      <SurgeriesAndMedications />

      <AddButton type="submit">
        Adicionar <PiPlusCircle />
      </AddButton>
    </SurgeriesContainer>
  );
};
