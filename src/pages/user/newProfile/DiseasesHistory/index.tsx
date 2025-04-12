import { useState } from "react";
import { Select, Button } from "antd";
import { PiPlusCircle, PiXCircle } from "react-icons/pi";
import { Controller, useForm } from "react-hook-form";
import { ActionButtons, AddButton, DiseaseItem, DiseasesContainer, FormColumn, FormRow, StyledSelect } from "./styles";
import { CustomTextArea } from "@/shared/components/CustomTextArea";
import { CustomInput } from "@/shared/components/CustomInput";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { IDisease } from "@/shared/context/DiseasesContext";

export const DiseasesHistory = () => {
  const { allDiseases, userDiseasesAndMedications, createUserDisease, createUserMedication, getUserDiseasesAndMedications } = useDiseases();
  const [selectedDisease, setSelectedDisease] = useState<IDisease>({} as IDisease);
  const { control, handleSubmit, register, reset } = useForm();

  const onSubmit = ({ name, medication }: { name?: string, medication?: string }) => {
    if (!name) return;

    const diseaseData = allDiseases.find(disease => disease.name === name);
    if (!diseaseData) return;

    const diseaseExists = userDiseasesAndMedications.find(userDisease => userDisease.diseaseName === name);

    if (!diseaseExists?.id) {
      createUserDisease(diseaseData.id);
    } else {
      if (medication && medication.trim() !== '') {
        const medicationExists = diseaseExists.medications.find(med => med.diseaseId === diseaseData.id && med.name === medication);
        if (!medicationExists?.id) {
          const startUsing = new Date().toISOString();
          createUserMedication({ diseaseId: diseaseData.id, name: medication, startUsing });
        }
      }
    }

    reset();
    setSelectedDisease({} as IDisease);
    getUserDiseasesAndMedications()
  };


  const handleRemoveDisease = (id: string) => {
    console.log(id)
  };

  const handleRemoveMedication = (diseaseId: string, medToRemove: string) => {
    console.log(diseaseId, medToRemove)
  };

  return (
    <DiseasesContainer>
      <h3>Adicionar doença:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormColumn>
            <p>Selecione a doença:</p>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  placeholder="Nome da doença"
                  options={allDiseases.map(disease => ({ value: disease.name }))}
                />
              )}
            />
          </FormColumn>

          {selectedDisease?.name === "Outras doenças" ? (
            <FormColumn>
              <p>Descrição:</p>
              <CustomTextArea
                name="description"
                register={register}
                placeholder="Descreva detalhes sobre a doença"
                maxLength={180}
              />
              <small>Máx. 180 caracteres</small>
            </FormColumn>
          ) : (
            <FormColumn>
              <p>Remédio utilizado:</p>
              <CustomInput name="medication" register={register} placeholder="Nome do medicamento" />
            </FormColumn>
          )}

          <AddButton type="submit">
            Adicionar
            <PiPlusCircle />
          </AddButton>
        </FormRow>
      </form>

      {userDiseasesAndMedications.length > 0 && (
        <>
          <h3>Lista de doenças adicionadas:</h3>
          {userDiseasesAndMedications.map(disease => (
            <DiseaseItem key={disease.id}>
              <div>
                <strong>{disease.diseaseName}</strong>

                {!!disease?.medications?.length && (
                  <div>
                    <p>Remédios:</p>
                    <ul>
                      {disease.medications.map((med, idx) => (
                        <li key={idx}>
                          <button type="button" onClick={() => handleRemoveMedication(disease.id, med.name)}>
                            {med.name}{" "}
                            <PiXCircle />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <ActionButtons>
                <button onClick={() => handleRemoveDisease(disease.id)}>Remover doença</button>
              </ActionButtons>
            </DiseaseItem>
          ))}
        </>
      )}
    </DiseasesContainer>
  );
};
