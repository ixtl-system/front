import { useContext, useEffect, useState } from "react";
import { PiPill, PiPlus, PiUser } from "react-icons/pi";
import { UserContext } from "@/shared/context/UserContext";
import { useDiseases } from "@/shared/hooks/useDiseases";
import { ProfileContext } from "@/shared/context/Profile";
import Loader from "@/shared/components/Loader";

import { Header, ProfileContainer, Subtitle, Tab, TabContainer, Title } from "./styles";
import { PersonalInfo } from "./PersonalInfo";
import { DrugHistory } from "./DrugHistory";
import { DiseasesHistory } from "./DiseasesHistory";

export function Profile() {
  const { fetchAllDiseases, getUserDiseasesAndMedications } = useDiseases();
  const { fetchUserProfile } = useContext(UserContext);
  const { fetchDrugs } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"dados" | "historico" | "diseases">("dados");

  useEffect(() => {
    async function getUserProfile() {
      setLoading(true);

      await Promise.all([
        fetchAllDiseases(),
        fetchUserProfile(),
        fetchDrugs(),
        getUserDiseasesAndMedications(),
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
      </TabContainer>

      {activeTab === "dados" ? (
        <PersonalInfo />
      ) : activeTab === "historico" ? (
        <DrugHistory />
      ) : (
        <DiseasesHistory />
      )}
    </ProfileContainer>
  );
}
