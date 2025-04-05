import { PiArrowLeftLight, PiUsers } from "react-icons/pi";
import { LoadingOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification, Spin } from "antd";
import { DateTime } from "luxon";

import { useEvent } from "@/shared/hooks/useEvent";
import { SunHorizon } from "@/assets/icons/SunHorizon";
import { UserContext } from "@/shared/context/UserContext";

import {
  ContentContainer,
  DateBadge,
  DescriptionText,
  DescriptionTitle,
  EventInfoContainer,
  EventRegisterContainer,
  EventSubtitle,
  EventTitle,
  HeaderContainer,
  InfoText,
  RequestButton,
  StyledButton
} from "./styles";
import { Helmet } from "react-helmet-async";
import { RegisterUsersModal } from "../components/RegisteredUsersModal";

export const EventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchUserProfile } = useContext(UserContext);
  const { event, fetchEvent, registerUserInEvent } = useEvent();
  const [isModalVisible, setIsModalVisible] = useState(false)

  const event_status = {
    OPEN: "Registrar-se no Evento",
    RESERVED: "Reservado",
    CONFIRMED: "Confirmado",
    CANCELED: "Solicitado",
  }

  const handleRegister = async () => {
    const { success, message } = await registerUserInEvent(String(id));

    if (!success) return notification.error({ message: message?.title, description: message?.description });
    notification.success({ message: message?.title, description: message?.description });
    fetchEvent(String(params.id));
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    async function fetchEventDetails(id: string) {
      const { success, message } = await fetchEvent(id)
      if (!success) notification.error({ message: message?.title, description: message?.description });
    }

    if (id) {
      fetchEventDetails(id);
      fetchUserProfile();
    }
  }, []);

  if (!event) return (
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  )

  return (
    <EventRegisterContainer>
      <Helmet title={`Evento - ${event.name}`} />

      <RegisterUsersModal visible={isModalVisible} onClose={toggleModalVisibility} />

      <HeaderContainer>
        <StyledButton onClick={() => navigate("/events")}>
          <PiArrowLeftLight />
          Voltar
        </StyledButton>
        <StyledButton onClick={toggleModalVisibility}>
          Ver clientes cadastrados
          <PiUsers />
        </StyledButton>
      </HeaderContainer>

      <ContentContainer>
        <EventTitle>{event.name}</EventTitle>
        <EventSubtitle>Cerimônias programadas</EventSubtitle>

        <EventInfoContainer>
          <SunHorizon />
          <InfoText>ás {DateTime.fromISO(event.date).toFormat("hh:mm")}</InfoText>
          <DateBadge>{DateTime.fromISO(event.date).toFormat("dd/MM/yyyy")}</DateBadge>
          <InfoText>{event.availability} Vagas disponíveis</InfoText>
        </EventInfoContainer>

        <RequestButton onClick={handleRegister} disabled={event.userStatus !== "OPEN"}>
          {event_status[event.userStatus]}
        </RequestButton>

        <DescriptionTitle>Descrição do evento:</DescriptionTitle>

        <DescriptionText>
          {event.description}
        </DescriptionText>
      </ContentContainer>
    </EventRegisterContainer>
  );
};
