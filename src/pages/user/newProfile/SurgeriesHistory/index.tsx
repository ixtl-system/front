import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiPlusCircle } from "react-icons/pi";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { IMedication } from "@/shared/types/Medication";
import {
  AddButton,
  FormColumn,
  FormRow,
  FrequencyLabel,
  SurgeriesContainer
} from "./styles";

export interface FormData {
  name: string;
  surgeryDate: string;
  medicine?: string;
  observation?: string;
}

export const SurgeriesHistory = () => {
  const {medicationsList} = useDiseases();
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm<FormData>();
  const [showCustomMedication, setShowCustomMedication] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log(data)
    reset();
  };

  const handleSelectMedication = (value: string) => {
    const selectedMedication = medicationsList.find((m) => m.id === value);
    setShowCustomMedication(selectedMedication?.name.toLowerCase() === "outra");
  }

  return (
    <SurgeriesContainer>
      <h3>Adicionar doença e medicação:</h3>
      <FormRow onSubmit={handleSubmit(onSubmit)}>
        <FormColumn>
          <FrequencyLabel>Cirurgia:</FrequencyLabel>
          <CustomInput
            register={register}
            name="name"
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
        </FormColumn>

        <FormColumn>
          <FrequencyLabel>Cirurgia:</FrequencyLabel>
          <CustomInput
            register={register}
            name="name"
          />
        </FormColumn>

        <AddButton type="submit">
          Adicionar <PiPlusCircle />
        </AddButton>
      </FormRow>
    </SurgeriesContainer>
  );
};
