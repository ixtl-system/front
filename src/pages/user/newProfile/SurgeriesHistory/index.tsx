import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiPlusCircle } from "react-icons/pi";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { useSurgery } from "@/shared/hooks/useSurgery";
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

export const SurgeriesHistory = () => {
  const { medicationsList } = useDiseases();
  const { createUserSurgery, fetchUserSurgeries } = useSurgery();
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<ICreateSurgeryParams>();
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
          <Controller
            name="surgeryDate"
            control={control}
            render={({ field }) => (
              <div>
                <FrequencyLabel>Data da Cirurgia:</FrequencyLabel>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString() : "")}
                />
                {errors.surgeryDate && <span className="error">{errors.surgeryDate.message}</span>}
              </div>
            )}
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
