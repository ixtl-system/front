import Loader from "@/shared/components/Loader";
import { ProfileContext } from "@/shared/context/Profile";
import { UserContext } from "@/shared/context/UserContext";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { useContext, useEffect, useState } from "react";
import { PiHospitalLight, PiPill, PiPlus, PiUser } from "react-icons/pi";

import { DiseasesHistory } from "./DiseasesHistory";
import { DrugHistory } from "./DrugHistory";
import { PersonalInfo } from "./PersonalInfo";
import { Header, ProfileContainer, Subtitle, Tab, TabContainer, Title } from "./styles";
import { SurgeriesHistory } from "./SurgeriesHistory";

export function Profile() {
  const { fetchAllDiseases, getUserDiseasesAndMedications, fetchMedicationsList } = useDiseases();
  const { fetchUserProfile } = useContext(UserContext);
  const { fetchDrugs } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"dados" | "historico" | "diseases" | "surgeries">("dados");

  useEffect(() => {
    async function getUserProfile() {
      setLoading(true);

      await Promise.all([
        fetchAllDiseases(),
        fetchUserProfile(),
        fetchDrugs(),
        getUserDiseasesAndMedications(),
        fetchMedicationsList()
      ]);

      setLoading(false);
    }

    getUserProfile();
  }, []);




  if (loading) return (
    <ProfileContainer>
      <Header>
        <Title>Perfil</Title>
        <Subtitle>Informações do usuário</Subtitle>
      </Header>

      <TabContainer>
        <Tab active={activeTab === "dados"} onClick={() => setActiveTab("dados")}>
          <PiUser /> Dados pessoais
        </Tab>
        <Tab active={activeTab === "historico"} onClick={() => setActiveTab("historico")}>
          <PiPill /> Histórico de drogas
        </Tab>
        <Tab active={activeTab === "diseases"} onClick={() => setActiveTab("diseases")}>
          <PiPlus /> Histórico Médico
        </Tab>
        <Tab active={activeTab === "surgeries"} onClick={() => setActiveTab("surgeries")}>
          <PiHospitalLight /> Histórico de Cirurgias
        </Tab>
      </TabContainer>

      <Loader />
    </ProfileContainer>
  )

  return (
    <ProfileContainer>
      <Header>
        <Title>Perfil</Title>
        <Subtitle>Informações do usuário</Subtitle>
      </Header>

      <TabContainer>
        <Tab active={activeTab === "dados"} onClick={() => setActiveTab("dados")}>
          <PiUser /> Dados pessoais
        </Tab>
        <Tab active={activeTab === "historico"} onClick={() => setActiveTab("historico")}>
          <PiPill /> Histórico de drogas
        </Tab>
        <Tab active={activeTab === "diseases"} onClick={() => setActiveTab("diseases")}>
          <PiPlus /> Histórico Médico
        </Tab>
        <Tab active={activeTab === "surgeries"} onClick={() => setActiveTab("surgeries")}>
          <PiHospitalLight /> Histórico de Cirurgias
        </Tab>
      </TabContainer>

      {activeTab === "dados" ? (
        <PersonalInfo />
      ) : activeTab === "historico" ? (
        <DrugHistory />
      ) : activeTab === "diseases" ? (
        <DiseasesHistory />
      ) : (
        <SurgeriesHistory />
      )}
    </ProfileContainer>
  );
}
