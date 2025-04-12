import { useContext } from "react";
import { message, Select } from "antd";
import { ProfileContext } from "@/shared/context/Profile";
import {
  DrugHistoryContainer,
  DrugGrid,
  DrugSection,
  DrugTitle,
  FrequencyLabel,
  SelectWrapper,
  SaveButton,
} from "./styles";
import { PiFloppyDisk } from "react-icons/pi";
import { IDrug } from "@/shared/types/Drug";

type FrequencyType = "NEVER" | "ALWAYS" | "SOMETIMES" | "STOPPED"
type TimeType = "SIX_MONTH" | "ONE_YEAR" | "TWO_YEARS" | "THREE_YEARS" | "MORE_THAN_THREE_YEARS"

const frequencyLabels: Record<FrequencyType, string> = {
  NEVER: "Nunca usou",
  ALWAYS: "Usa com frequência",
  SOMETIMES: "Usa às vezes",
  STOPPED: "Parou de usar",
}

const timeLabels: Record<TimeType, string> = {
  SIX_MONTH: "6 meses",
  ONE_YEAR: "1 ano",
  TWO_YEARS: "2 anos",
  THREE_YEARS: "3 anos",
  MORE_THAN_THREE_YEARS: "Mais de 3 anos",
}


export function DrugHistory() {
  const { drugs, updateDrugHistory, setDrugs } = useContext(ProfileContext);

  const updateDrug = (drugId: string, field: keyof typeof drugs[0], value: string | boolean) => {
    setDrugs((prev) =>
      prev.map((drug) => (drug.drugId === drugId ? { ...drug, [field]: value } : drug))
    );
  };

  const cleanRequestData = (drugs: IDrug[]) => {
    return drugs.map((drug) => {
      const { drugId, drugName, frequency, userId, endUsing, id, isDaimeHelp, startUsing } = drug;
      const updatedDrug = { drugId, drugName, frequency, userId };

      if (id) Object.assign(updatedDrug, { id });
      if (frequency !== "NEVER" && startUsing) {
        Object.assign(updatedDrug, { startUsing });

        if (frequency === "STOPPED" && endUsing) {
          Object.assign(updatedDrug, { endUsing });
          if (typeof isDaimeHelp !== "undefined") {
            Object.assign(updatedDrug, { isDaimeHelp });
          }
        }
      }

      return updatedDrug;
    });
  };

  const onSubmitDrugHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const request = cleanRequestData(drugs);
      await updateDrugHistory(request);
      message.success("Histórico de drogas salvo com sucesso!");
    } catch (error) {
      message.error("Erro ao salvar o formulário.");
    }
  };

  const renderFrequencySelect = (drug: IDrug) => (
    <>
      <FrequencyLabel>Frequência de uso</FrequencyLabel>
      <SelectWrapper>
        <Select
          value={drug.frequency}
          onChange={(value) => updateDrug(drug.drugId, "frequency", value)}
          style={{ width: "100%" }}
        >
          {Object.entries(frequencyLabels).map(([key, label]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>
    </>
  )

  const renderTimeSelect = (
    drug: IDrug,
    label: string,
    field: "startUsing" | "endUsing"
  ) => (
    <>
      <FrequencyLabel>{label}</FrequencyLabel>
      <SelectWrapper>
        <Select
          value={drug[field]}
          onChange={(value) => updateDrug(drug.drugId, field, value)}
          style={{ width: "100%" }}
        >
          {Object.entries(timeLabels).map(([key, label]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </SelectWrapper>
    </>
  )

  const renderDaimeHelpSelect = (drug: IDrug) => (
    <>
      <FrequencyLabel>A ajuda do Daime foi eficaz?</FrequencyLabel>
      <SelectWrapper>
        <Select
          value={drug.isDaimeHelp ? "Sim" : "Não"}
          onChange={(value) =>
            updateDrug(drug.drugId, "isDaimeHelp", value === "Sim")
          }
          style={{ width: "100%" }}
        >
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </SelectWrapper>
    </>
  )

  return (
    <DrugHistoryContainer>
      <form onSubmit={onSubmitDrugHistory}>
        <DrugGrid>
          {drugs.map((drug) => (
            <DrugSection key={drug.drugId}>
              <DrugTitle>{drug.drugName}</DrugTitle>
              {renderFrequencySelect(drug)}
              {drug.frequency !== "NEVER" &&
                renderTimeSelect(drug, "Usa há quanto tempo?", "startUsing")}
              {drug.frequency === "STOPPED" && (
                <>
                  {renderTimeSelect(drug, "Parou há quanto tempo?", "endUsing")}
                  {renderDaimeHelpSelect(drug)}
                </>
              )}
            </DrugSection>
          ))}
        </DrugGrid>

        <SaveButton htmlType="submit" type="primary">
          <PiFloppyDisk size={20} />
          Salvar dados
        </SaveButton>
      </form>
    </DrugHistoryContainer>
  );
}