import { LoadingOutlined } from "@ant-design/icons";
import { notification, Spin } from "antd";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PiArrowLeftLight, PiUserPlus, PiUsers } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

import { SunHorizon } from "@/assets/icons/SunHorizon";
import { UserContext } from "@/shared/context/UserContext";
import { useEvent } from "@/shared/hooks/useEvent";

import { InviteGuestModal } from "../components/InviteGuestModal";
import { RegisterUsersModal } from "../components/RegisteredUsersModal";
import {
  ContentContainer,
  DateBadge,
  DescriptionText,
  DescriptionTitle,
  EventInfoContainer,
  EventRegisterContainer,
  EventSubtitle,
  EventTitle,
  HeaderActions,
  HeaderContainer,
  InfoText,
  RequestButton,
  StyledButton
} from "./styles";

export const EventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchUserProfile, userProfile } = useContext(UserContext);
  const { event, fetchEvent, registerUserInEvent } = useEvent();
  const [isAttendanceListVisible, setIsAttendanceListVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

  const isSoldOut = event.userStatus === "OPEN" && event.availability === 0;

  const eventStatusLabels = {
    OPEN: "Registrar-se no Evento",
    RESERVED: "Reservado",
    CONFIRMED: "Confirmado",
    CANCELED: "Solicitado",
    CHECKED_IN: "Check-in realizado",
    NO_SHOW: "Não compareceu",
  };

  const handleRegister = async () => {
    const { success, message } = await registerUserInEvent(String(id));

    if (!success) return notification.error({ message: message?.title, description: message?.description });
    notification.success({ message: message?.title, description: message?.description });
    fetchEvent(String(params.id));
  };

  const toggleAttendanceListVisibility = () => {
    setIsAttendanceListVisible((previous) => !previous);
  };

  const toggleInviteModalVisibility = () => {
    setIsInviteModalVisible((previous) => !previous);
  };

  useEffect(() => {
    async function fetchEventDetails(id: string) {
      const { success, message } = await fetchEvent(id);
      if (!success) notification.error({ message: message?.title, description: message?.description });
    }

    if (id) {
      fetchEventDetails(id);
      fetchUserProfile();
    }
  }, []);

  if (!event)
    return (
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    );

  return (
    <EventRegisterContainer>
      <Helmet title={`Evento - ${event.name}`} />

      {userProfile.role === "ADMIN" ? (
        <>
          <RegisterUsersModal
            visible={isAttendanceListVisible}
            onClose={toggleAttendanceListVisibility}
          />
          <InviteGuestModal visible={isInviteModalVisible} onClose={toggleInviteModalVisibility} />
        </>
      ) : null}

      <HeaderContainer>
        <StyledButton onClick={() => navigate("/events")}>
          <PiArrowLeftLight />
          Voltar
        </StyledButton>

        {userProfile.role === "ADMIN" ? (
          <HeaderActions>
            <StyledButton onClick={toggleAttendanceListVisibility}>
              Lista de presença
              <PiUsers />
            </StyledButton>
            <StyledButton onClick={toggleInviteModalVisibility}>
              Convidar para o evento
              <PiUserPlus />
            </StyledButton>
          </HeaderActions>
        ) : null}
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

        <RequestButton onClick={handleRegister} disabled={isSoldOut || event.userStatus !== "OPEN"}>
          {isSoldOut ? "Esgotado" : eventStatusLabels[event.userStatus] }
        </RequestButton>

        <DescriptionTitle>Descrição do evento:</DescriptionTitle>

        <DescriptionText>
          {event.description}
        </DescriptionText>
      </ContentContainer>
    </EventRegisterContainer>
  );
};
