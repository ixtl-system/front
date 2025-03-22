import { useCallback, useContext, useEffect, useState } from "react";
import { api } from "@/shared/infra/api";
import { IDrug } from "@/shared/types/Drug";
import { DrugItem } from "./components/DrugItem";
import { Button, message } from "antd";
import { ProfileContext } from "@/shared/context/Profile";
import { FiMinus, FiPlus } from "react-icons/fi";
import { DrugHistoryContainer } from "./styles";

export function DrugHistory() {
  const [drugs, setDrugs] = useState<IDrug[]>([]);
  const [showDrugHistory, setShowDrugHistory] = useState(false);

  const { updateDrugHistory } = useContext(ProfileContext)

  const fetchDrugs = useCallback(async () => {
    try {
      const response = await api.get<IDrug[]>("/profiles/drugs");
      setDrugs(response.data);
    } catch (error) {
      console.error("Failed to fetch user drug history:", error);
    }
  }, []);

  useEffect(() => {
    fetchDrugs();
  }, [fetchDrugs]);

  const toggleShowDrugHistory = () => {
    setShowDrugHistory(prev => !prev);
  };

  const cleanRequestData = (drugs: IDrug[]) => {
    const cleanedData = drugs.map((drug) => {
      const { drugId, drugName, frequency, userId, endUsing, id, isDaimeHelp, startUsing } = drug;
      const updatedDrug: IDrug = { drugId, drugName, frequency, userId };

      if (id) Object.assign(updatedDrug, { id })

      if (frequency !== "NEVER" && startUsing) {
        Object.assign(updatedDrug, { startUsing })

        if (frequency === "STOPPED" && endUsing) {
          Object.assign(updatedDrug, { endUsing })

          if (isDaimeHelp) Object.assign(updatedDrug, { isDaimeHelp })
        }
      }
      return updatedDrug
    })
    return cleanedData
  }

  const updateDrug = (drugId: string, field: string, value: string | boolean) => {
    const updatedDrugs = drugs.map(drug => {
      if (drug.drugId === drugId) return { ...drug, [field]: value }
      return drug
    })

    setDrugs(updatedDrugs);
  };

  const onSubmitDrugHistory = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const request = cleanRequestData(drugs)
      updateDrugHistory(request)
      message.success("Formulário enviado com sucesso!");
    } catch (error) {
      message.error("Houve um falha ao salvar o formulário!")
    }
  };

  return (
    <DrugHistoryContainer>
      <div className="toggle-container" onClick={toggleShowDrugHistory}>
        {showDrugHistory ? <FiMinus /> : <FiPlus />}

        <h1>Histórico de drogas</h1>
      </div>

      {showDrugHistory && (
        <form onSubmit={onSubmitDrugHistory} className="user-drug-history">
          {drugs.map(drug => (
            <DrugItem
              drug={drug}
              key={drug.drugId}
              updateDrug={updateDrug}
            />
          ))}

          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>Salvar</Button>
        </form>
      )}
    </DrugHistoryContainer>
  );
}