import "./styles.css";

import { useCallback, useEffect, useState } from "react";

import { IUserDrugsHistory } from "@/pages/user/dtos";
// import { Controller, useForm } from "react-hook-form";
import { api } from "@/shared/infra/api";

interface IDrugsProps {
  id: string;
  name: string;
  frequency: string;
  startUsing?: string;
  endUsing?: string;
  isDaimeHelp?: boolean;
}
interface DrugHistoryProps {
  userDrugHistory: IUserDrugsHistory[];
}

export function DrugHistory({ userDrugHistory }: DrugHistoryProps) {
  console.log("userDrugHistory: ", userDrugHistory);
  const [drugs, setDrugs] = useState<IDrugsProps[]>([]);
  const [ShowDrugHistory, setShowDrugHistory] = useState(false);

  const fetchDrugs = useCallback(async () => {
    try {
      const response = await api.get("/profiles/drugs");
      setDrugs(response.data);
    } catch (error) {
      console.error("Failed to fetch user drug history:", error);
    }
  }, []);

  useEffect(() => {
    fetchDrugs();
  }, [fetchDrugs]);

  function ToggleShowDrugHistory() {
    setShowDrugHistory(!ShowDrugHistory);
  }

  const handleFrequency = (drugId: string, usingFrequency: string) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === drugId ? { ...drug, frequency: usingFrequency } : drug
      )
    );
  };

  function handleStartUsing(drugId: string, startUsing: string) {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === drugId ? { ...drug, startUsing: startUsing } : drug
      )
    );
  }

  function handleEndUsing(drugId: string, endUsing: string) {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === drugId ? { ...drug, endUsing: endUsing } : drug
      )
    );
  }

  function handleDaimeHelp(drugId: string, check: boolean) {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug.id === drugId ? { ...drug, isDaimeHelp: check } : drug
      )
    );
  }

  const onSubmitDrugHistory = (data: any) => {
    console.log("Form data:", data);
    alert("Formulário enviado com sucesso!");
  };

  return (
    <div className="drugs-history">
      <div className="toggle-container">
        <button onClick={ToggleShowDrugHistory}>
          {ShowDrugHistory ? "-" : "+"}
        </button>
        <h1>Histórico de drogas</h1>
      </div>
      {ShowDrugHistory && (
        <form onSubmit={onSubmitDrugHistory} className="user-drug-history">
          {drugs.map((drug: any) => (
            <div key={drug.id}>
              <p>{drug.id}</p>
              <h2>{drug.drugName}</h2>
              <div className="frequency-using">
                <select
                  name="frequency"
                  value={drug.frequency || ""}
                  onChange={(e) => handleFrequency(drug.id, e.target.value)}
                >
                  <option value="NEVER">Nunca usei</option>
                  <option value="ALWAYS">Uso com frequência</option>
                  <option value="SOMETIMES">Uso as vezes</option>
                  <option value="STOPPED">Parei de usar</option>
                </select>

                {drug.frequency !== "NEVER" && (
                  <div>
                    {drug.frequency === "STOPPED" && (
                      <>
                        <div>
                          <p>Usou por quanto tempo</p>
                          <select
                            name="start-using"
                            value={drug.startUsing || ""}
                            onChange={(e) =>
                              handleStartUsing(drug.id, e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="SIX_MONTH">6 meses</option>
                            <option value="ONE_YEAR">1 ano</option>
                            <option value="TWO_YEARS">2 anos</option>
                            <option value="THREE_YEARS">3 anos</option>
                            <option value="MORE_THAN_THREE_YEARS">
                              Mais de 3 anos
                            </option>
                          </select>
                        </div>
                        <div>
                          <p>Quando parou de usar?</p>
                          <select
                            name="end-using"
                            value={drug.endUsing || ""}
                            onChange={(e) =>
                              handleEndUsing(drug.id, e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="SIX_MONTH">6 meses</option>
                            <option value="ONE_YEAR">1 ano</option>
                            <option value="TWO_YEARS">2 anos</option>
                            <option value="THREE_YEARS">3 anos</option>
                            <option value="MORE-THAN-THREE_YEARS">
                              Mais de 3 anos
                            </option>
                          </select>
                        </div>
                      </>
                    )}

                    {(drug.frequency === "SOMETIMES" ||
                      drug.frequency === "ALWAYS") && (
                      <div>
                        <p>Usa a quanto tempo</p>
                        <select
                          name="start-using"
                          value={drug.startUsing || ""}
                          onChange={(e) =>
                            handleStartUsing(drug.id, e.target.value)
                          }
                        >
                          <option value=""></option>
                          <option value="SIX_MONTH">6 meses</option>
                          <option value="ONE_YEAR">1 ano</option>
                          <option value="TWO_YEARS">2 anos</option>
                          <option value="THREE_YEARS">3 anos</option>
                          <option value="MORE_THAN_THREE_YEARS">
                            Mais de 3 anos
                          </option>
                        </select>
                      </div>
                    )}

                    {drug.frequency === "STOPPED" && (
                      <div>
                        <p>A ajuda do Daime foi eficaz?</p>
                        <label>
                          <input
                            type="checkbox"
                            checked={drug.isDaimeHelp || false}
                            onChange={(e) =>
                              handleDaimeHelp(drug.id, e.target.checked)
                            }
                          />
                          Sim
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
}
