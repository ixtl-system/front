import { ArrowLeftOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Empty, Modal, notification, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { PiCaretDownLight, PiSparkleFill } from "react-icons/pi";
import { useParams } from "react-router-dom";

import { CustomSubtitle, CustomTitle } from "@/shared/components/CustomStyled";
import { useEvent } from "@/shared/hooks/useEvent";
import { EventRegistration, EventStatus } from "@/shared/types/Event";

import {
  ActionDropdownButton,
  ActionsContainer,
  BackButton,
  CheckInButton,
  FirstTimerTag,
  FooterContainer,
  LoadingContainer,
  ParticipantInfo,
  RegisterUsersModalContainer,
  StatusBadge,
  UserListItem,
  UsersList,
} from "./styles";

interface RegisterUsersModalProps {
  visible: boolean;
  onClose: () => void;
}

type ActionKey = "cancel" | "confirm" | "noShow";

type StatusToken = {
  label: string;
  color: string;
  background: string;
};

type MenuItems = NonNullable<MenuProps["items"]>;

const STATUS_TOKENS: Record<EventStatus, StatusToken> = {
  RESERVED: { label: "Reservado", color: "#6B6B80", background: "#F0F0F5" },
  CONFIRMED: { label: "Confirmado", color: "#1677FF", background: "#E6F4FF" },
  CANCELED: { label: "Cancelado", color: "#E46962", background: "#FFE8E6" },
  CHECKED_IN: { label: "Check-in realizado", color: "#1F9254", background: "#E8F5E9" },
  NO_SHOW: { label: "Não compareceu", color: "#B17710", background: "#FFF4E0" },
};

const ACTIONS: {
  key: ActionKey;
  label: string;
  status: Extract<EventStatus, "CANCELED" | "CONFIRMED" | "NO_SHOW">;
  description: string;
  visible: (status: EventStatus) => boolean;
}[] = [
  {
    key: "confirm",
    label: "Confirmar pagamento",
    status: "CONFIRMED",
    description: "Confirmar a presença do participante após pagamento.",
    visible: (status) => status === "RESERVED",
  },
  {
    key: "cancel",
    label: "Cancelar reserva",
    status: "CANCELED",
    description: "Cancelar a reserva do participante.",
    visible: (status) => status !== "CANCELED" && status !== "CHECKED_IN",
  },
  {
    key: "noShow",
    label: "Marcar como No Show",
    status: "NO_SHOW",
    description: "Marcar que o participante não compareceu à cerimônia.",
    visible: (status) => status === "CONFIRMED",
  },
];

export const RegisterUsersModal = ({ visible, onClose }: RegisterUsersModalProps) => {
  const params = useParams();
  const { listEventRegistrations, event, eventRegistrations, updateUserRegistration } = useEvent();

  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const eventId = params.id || event?.id;

  const fetchParticipants = useCallback(async () => {
    if (!eventId) return;
    setIsLoading(true);
    const response = await listEventRegistrations(eventId);
    if (!response.success) {
      notification.error({
        message: response.message?.title || "Erro ao listar participantes",
        description: response.message?.description,
      });
    }
    setIsLoading(false);
  }, [eventId, listEventRegistrations]);

  useEffect(() => {
    if (visible) {
      fetchParticipants();
    }
  }, [visible, fetchParticipants]);

  const handleClose = () => onClose();

  const handleStatusUpdate = async (registrationId: string, status: EventStatus) => {
    setUpdatingId(registrationId);
    const response = await updateUserRegistration({ registrationId, status });
    setUpdatingId(null);

    if (!response.success) {
      notification.error({
        message: response.message?.title || "Falha ao atualizar status",
        description: response.message?.description,
      });
      return;
    }

    notification.success({
      message: "Status atualizado",
      description: "O status do participante foi atualizado com sucesso.",
    });
    fetchParticipants();
  };

  const confirmStatusChange = (
    participant: EventRegistration,
    nextStatus: EventStatus,
    description: string
  ) => {
    Modal.confirm({
      title: `Confirmar atualização para ${STATUS_TOKENS[nextStatus].label}?`,
      content: (
        <>
          <strong>{participant.name}</strong>
          <p>{description}</p>
        </>
      ),
      okText: "Confirmar",
      cancelText: "Voltar",
      centered: true,
      onOk: () => handleStatusUpdate(participant.id, nextStatus),
    });
  };

  const handleDropdownClick = (participant: EventRegistration, actionKey: ActionKey) => {
    const action = ACTIONS.find(({ key }) => key === actionKey);
    if (!action) return;
    confirmStatusChange(participant, action.status, action.description);
  };

  const availableActions = (status: EventStatus): MenuItems =>
    ACTIONS.filter((action) => action.visible(status)).map((action) => ({
      key: action.key,
      label: action.label,
    }));

  const handleCheckIn = (participant: EventRegistration) => {
    confirmStatusChange(participant, "CHECKED_IN", "Registrar presença e liberar o participante no local.");
  };

  const isProcessing = (participantId: string) => updatingId === participantId;

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <Spin tip="Carregando participantes..." />
        </LoadingContainer>
      );
    }

    if (!eventRegistrations?.length) {
      return <Empty description="Não há participantes registrados neste evento." />;
    }

    return (
      <UsersList>
        {(eventRegistrations ?? []).map((participant) => {
          const statusToken = STATUS_TOKENS[participant.status];
          const menuItems = availableActions(participant.status);
          const isCheckInEnabled = participant.status === "CONFIRMED";

          return (
            <UserListItem key={participant.id}>
              <ParticipantInfo>
                <div>
                  <h5>{participant.name}</h5>
                  {participant.firstTimer ? (
                    <FirstTimerTag>
                      <PiSparkleFill />
                      Primeira vez
                    </FirstTimerTag>
                  ) : null}
                </div>

                <StatusBadge $color={statusToken.color} $background={statusToken.background}>
                  {statusToken.label}
                </StatusBadge>
              </ParticipantInfo>

              <ActionsContainer>
                <CheckInButton
                  type="button"
                  disabled={!isCheckInEnabled || isProcessing(participant.id)}
                  onClick={() => handleCheckIn(participant)}
                >
                  {isProcessing(participant.id) ? "Atualizando..." : "Fazer check-in"}
                </CheckInButton>

                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: menuItems,
                    onClick: ({ key }) => handleDropdownClick(participant, key as ActionKey),
                  }}
                  disabled={!menuItems.length || isProcessing(participant.id)}
                >
                  <ActionDropdownButton type="button" disabled={!menuItems.length || isProcessing(participant.id)}>
                    Gerenciar status
                    <PiCaretDownLight />
                  </ActionDropdownButton>
                </Dropdown>
              </ActionsContainer>
            </UserListItem>
          );
        })}
      </UsersList>
    );
  };

  return (
    <RegisterUsersModalContainer open={visible} onCancel={handleClose} width={980} footer={null}>
      <CustomTitle>Participantes cadastrados</CustomTitle>
      <CustomSubtitle>Gerencie o status de cada participante durante o evento.</CustomSubtitle>

      {renderContent()}

      <FooterContainer>
        <BackButton type="button" onClick={handleClose}>
          <ArrowLeftOutlined style={{ marginRight: 8 }} />
          Voltar
        </BackButton>
      </FooterContainer>
    </RegisterUsersModalContainer>
  );
};
