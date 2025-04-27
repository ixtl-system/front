import { CustomSelect } from "@/shared/components/CustomSelect";
import { IUsingTime } from "@/shared/types/Drug";
import { Control, useWatch } from "react-hook-form";
import { FormData } from "..";
import { FormColumn, FrequencyLabel } from "../styles";

interface MedicationFrequencyProps {
  control: Control<FormData, any> 
}

const timeOptions = (
  Object.entries({
    SIX_MONTH: "6 meses",
    ONE_YEAR: "1 ano",
    TWO_YEARS: "2 anos",
    THREE_YEARS: "3 anos",
    MORE_THAN_THREE_YEARS: "Mais de 3 anos",
  }) as [IUsingTime, string][]
).map(([value, label]) => ({ value, label }));

export const DynamicFields = ({ control }: MedicationFrequencyProps) => {

  
  const frequency = useWatch<FormData>({ control, name: 'frequency' });
  if (!frequency) return null;

  return (
    <>
      <FormColumn>
        <FrequencyLabel>{frequency === 'STOPPED' ? "Usou por quanto tempo?" : "Usa há quanto tempo?"}</FrequencyLabel>
        <CustomSelect
          name="startUsing"
          control={control}
          placeholder="Selecione duração"
          options={timeOptions}
        />
      </FormColumn>

      {frequency === 'STOPPED' && (
        <>
          <FormColumn>
            <FrequencyLabel>Parou há quanto tempo?</FrequencyLabel>
            <CustomSelect
              name="endUsing"
              control={control}
              placeholder="Selecione duração"
              options={timeOptions}
            />
          </FormColumn>

          <FormColumn>
            <FrequencyLabel>Daime ajudou?</FrequencyLabel>
            <CustomSelect
              name="isDaimeHelp"
              control={control}
              placeholder="Selecione"
              options={[{ value: 'true', label: 'Sim' }, { value: 'false', label: 'Não' }]}
            />
          </FormColumn>
        </>
      )}
    </>
  );
};
