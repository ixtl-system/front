// DiseasesHistory.tsx
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Button, Select, Space, Tag } from "antd";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { DiseasesHistoryContainer } from "./styles";
import { IDisease } from "@/shared/types/Diseases";

export const DiseasesHistory = () => {
  const { allDiseases, userDiseases, createUserDisease } = useDiseases();
  const [showHistory, setShowHistory] = useState(false);
  const [showRegisterFields, setShowRegisterFields] = useState(false);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("");

  const handleRegisterDisease = async () => {
    if (!selectedDiseaseId) return;
    await createUserDisease(selectedDiseaseId);
    setSelectedDiseaseId("");
    setShowRegisterFields(false);
  };

  const toggleRegisterFieldsVisibility = async () => {
    setShowRegisterFields(!showRegisterFields);
  };

  return (
    <DiseasesHistoryContainer>
      <div className="toggle-container" onClick={() => setShowHistory(prev => !prev)}>
        {showHistory ? <FiMinus /> : <FiPlus />}
        <h1>Histórico de doenças</h1>
      </div>

      {showHistory && (
        <section className="user-diseases-history">
          {userDiseases.length ? (
            <Space size="middle" wrap style={{ marginBottom: 20 }}>
              {userDiseases.map(disease => (
                <Tag color="geekblue" key={disease.id} style={{ fontSize: "16px", padding: "5px 10px" }}>
                  {disease.diseaseName}
                </Tag>
              ))}
            </Space>
          ) : null}

          {showRegisterFields ? (
            <section>
              <Select
                style={{ width: "100%", marginBottom: 10 }}
                showSearch
                placeholder="Selecione uma doença"
                options={allDiseases.map((disease: IDisease) => ({
                  value: disease.id,
                  label: disease.name,
                }))}
                onChange={(value) => setSelectedDiseaseId(value)}
                value={selectedDiseaseId || undefined}
              />
              <Button onClick={handleRegisterDisease} disabled={!selectedDiseaseId}>
                Aprovar
              </Button>
              <Button danger onClick={toggleRegisterFieldsVisibility}>
                Remover
              </Button>

            </section>
          ) : (
            <Button type="dashed" onClick={toggleRegisterFieldsVisibility}>
              <FiPlus />
            </Button>
          )}
        </section>
      )}
    </DiseasesHistoryContainer>
  );
};
