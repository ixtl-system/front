import { IDrug } from "@/shared/types/Drug";
import { DrugContainer } from "./styles";
import { Checkbox, Select } from "antd";

interface IDrugProps {
  drug: IDrug;
  updateDrug: (drugId: string, field: string, value: string | boolean) => void;
}

export const DrugItem = ({ drug, updateDrug }: IDrugProps) => {
  return (
    <DrugContainer>
      <h2>{drug.drugName}</h2>
      <div className="frequency-using">
        <p>Frequência</p>
        <Select
          style={{ width: '100%' }}
          value={drug.frequency}
          onChange={value => updateDrug(drug.drugId, "frequency", value)}
        >
          <Select.Option value="NEVER">Nunca usei</Select.Option>
          <Select.Option value="ALWAYS">Uso com frequência</Select.Option>
          <Select.Option value="SOMETIMES">Uso as vezes</Select.Option>
          <Select.Option value="STOPPED">Parei de usar</Select.Option>
        </Select>

        {drug.frequency !== "NEVER" && (
          <div>
            {drug.frequency === "STOPPED" && (
              <>
                <div>
                  <p>Usou por quanto tempo</p>
                  <Select
                    style={{ width: '100%' }}
                    value={drug.startUsing || ""}
                    onChange={value => updateDrug(drug.drugId, "startUsing", value)}
                  >
                    <Select.Option value="SIX_MONTH">6 meses</Select.Option>
                    <Select.Option value="ONE_YEAR">1 ano</Select.Option>
                    <Select.Option value="TWO_YEARS">2 anos</Select.Option>
                    <Select.Option value="THREE_YEARS">3 anos</Select.Option>
                    <Select.Option value="MORE_THAN_THREE_YEARS">
                      Mais de 3 anos
                    </Select.Option>
                  </Select>
                </div>
                <div>
                  <p>Quando parou de usar?</p>
                  <Select
                    style={{ width: '100%' }}
                    value={drug.endUsing || ""}
                    onChange={value => updateDrug(drug.drugId, "endUsing", value)}
                  >
                    <Select.Option value="SIX_MONTH">6 meses</Select.Option>
                    <Select.Option value="ONE_YEAR">1 ano</Select.Option>
                    <Select.Option value="TWO_YEARS">2 anos</Select.Option>
                    <Select.Option value="THREE_YEARS">3 anos</Select.Option>
                    <Select.Option value="MORE_THAN_THREE_YEARS">
                      Mais de 3 anos
                    </Select.Option>
                  </Select>
                </div>
              </>
            )}

            {(drug.frequency === "SOMETIMES" ||
              drug.frequency === "ALWAYS") && (
                <div>
                  <p>Usa a quanto tempo</p>
                  <Select
                    style={{ width: '100%' }}
                    value={drug.startUsing || ""}
                    onChange={value => updateDrug(drug.drugId, "startUsing", value)}
                  >
                    <Select.Option value="SIX_MONTH">6 meses</Select.Option>
                    <Select.Option value="ONE_YEAR">1 ano</Select.Option>
                    <Select.Option value="TWO_YEARS">2 anos</Select.Option>
                    <Select.Option value="THREE_YEARS">3 anos</Select.Option>
                    <Select.Option value="MORE_THAN_THREE_YEARS">
                      Mais de 3 anos
                    </Select.Option>
                  </Select>
                </div>
              )}

            {drug.frequency === "STOPPED" && (
              <div>
                <p>A ajuda do Daime foi eficaz?</p>
                <label>
                  <Checkbox
                    checked={drug.isDaimeHelp || false}
                    onChange={e => updateDrug(drug.drugId, "isDaimeHelp", e.target.checked)}
                  />

                  <p>
                    Sim
                  </p>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </DrugContainer>
  );
};