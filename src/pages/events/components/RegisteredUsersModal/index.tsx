import { ArrowLeftOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Empty, Modal, notification, Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PiCaretDownLight, PiSparkleFill } from "react-icons/pi";
import { useParams } from "react-router-dom";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomTitle } from "@/shared/components/CustomStyled";
import { useEvent } from "@/shared/hooks/useEvent";
import { EventRegistration, EventStatus } from "@/shared/types/Event";

import {
  ActionDropdownButton,
  ActionsContainer,
  BackButton,
  CheckInButton,
  ContentWrapper,
  EmptyStateWrapper,
  FilterField,
  FilterLabel,
  FiltersContainer,
  FilterSelect,
  FirstTimerTag,
  FooterContainer,
  LoadingContainer,
  MobileSwitchLabel,
  MobileSwitchSelect,
  MobileSwitchWrapper,
  ModalHeader,
  ParticipantInfo,
  ParticipantsScrollArea,
  RegisterUsersModalContainer,
  StatusBadge,
  SwitchBar,
  SwitchButton,
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
type ParticipantViewId = "reservedConfirmed" | "canceledNoShow" | "checkedIn";

type ParticipantView = {
  id: ParticipantViewId;
  label: string;
  statuses: EventStatus[];
};

type GenderFilterValue = "all" | "MASCULINE" | "FEMININE" | "OTHER";

type FilterParams = {
  name?: string;
  gender?: string;
};

const STATUS_TOKENS: Record<EventStatus, StatusToken> = {
  RESERVED: { label: "Reservado", color: "#6B6B80", background: "#F0F0F5" },
  CONFIRMED: { label: "Confirmado", color: "#1677FF", background: "#E6F4FF" },
  CANCELED: { label: "Cancelado", color: "#E46962", background: "#FFE8E6" },
  CHECKED_IN: { label: "Check-in realizado", color: "#1F9254", background: "#E8F5E9" },
  NO_SHOW: { label: "Não compareceu", color: "#B17710", background: "#FFF4E0" },
};

const PARTICIPANT_VIEWS: ParticipantView[] = [
  {
    id: "reservedConfirmed",
    label: "Reservas",
    statuses: ["RESERVED", "CONFIRMED"],
  },
  {
    id: "canceledNoShow",
    label: "Cancelados",
    statuses: ["CANCELED", "NO_SHOW"],
  },
  {
    id: "checkedIn",
    label: "Check-ins",
    statuses: ["CHECKED_IN"],
  },
];

const GENDER_OPTIONS: { label: string; value: GenderFilterValue }[] = [
  { label: "Todos os gêneros", value: "all" },
  { label: "Masculino", value: "MASCULINE" },
  { label: "Feminino", value: "FEMININE" },
  { label: "Outro", value: "OTHER" },
];

const NAME_FILTER_ID = "participant-name-filter";
const GENDER_FILTER_ID = "participant-gender-filter";
const VIEW_SWITCH_ID = "participant-view-filter";

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
  const [activeView, setActiveView] = useState<ParticipantViewId>("reservedConfirmed");
  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilterValue>("all");
  const [debouncedName, setDebouncedName] = useState("");

  const eventId = params.id || event?.id;
  const selectedView = PARTICIPANT_VIEWS.find((view) => view.id === activeView) ?? PARTICIPANT_VIEWS[0];
  const filters = useMemo(() => {
    const currentFilters: FilterParams = {};
    const trimmedName = debouncedName.trim();

    if (trimmedName) {
      currentFilters.name = trimmedName;
    }

    if (genderFilter !== "all") {
      currentFilters.gender = genderFilter;
    }

    return currentFilters;
  }, [debouncedName, genderFilter]);

  const hasActiveFilters = Boolean(filters.name || filters.gender);

  const filteredParticipants = (eventRegistrations ?? []).filter((participant) =>
    selectedView.statuses.includes(participant.status)
  );

  const fetchParticipants = useCallback(async (currentFilters?: FilterParams) => {
    if (!eventId) return;
    setIsLoading(true);

    try {
      const hasFilters = currentFilters && Object.keys(currentFilters).length > 0;
      const response = await listEventRegistrations(eventId, hasFilters ? currentFilters : undefined);

      if (!response.success) {
        notification.error({
          message: response.message?.title || "Erro ao listar participantes",
          description: response.message?.description,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [eventId, listEventRegistrations]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(nameFilter);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [nameFilter]);

  useEffect(() => {
    if (visible) {
      fetchParticipants(filters);
    }
  }, [visible, fetchParticipants, filters]);

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
    fetchParticipants(filters);
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

    if (!filteredParticipants.length) {
      return (
        <EmptyStateWrapper>
          <Empty
            description={
              hasActiveFilters
                ? "Nenhum participante encontrado com os filtros aplicados."
                : "Nenhum participante com este status."
            }
          />
        </EmptyStateWrapper>
      );
    }

    return (
      <UsersList key={selectedView.id}>
        {filteredParticipants.map((participant) => {
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
    <RegisterUsersModalContainer open={visible} onCancel={handleClose} footer={null}>
      <ContentWrapper>
        <ModalHeader>
          <CustomTitle>Lista de presença</CustomTitle>
        </ModalHeader>

        <FiltersContainer>
          <FilterField>
            <FilterLabel htmlFor={NAME_FILTER_ID}>Buscar por nome</FilterLabel>
            <CustomInput
              id={NAME_FILTER_ID}
              placeholder="Digite o nome do participante"
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
            />
          </FilterField>

          <FilterField>
            <FilterLabel htmlFor={GENDER_FILTER_ID}>Filtrar por gênero</FilterLabel>
            <FilterSelect
              id={GENDER_FILTER_ID}
              value={genderFilter}
              onChange={(event) => setGenderFilter(event.target.value as GenderFilterValue)}
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterField>
        </FiltersContainer>

        <SwitchBar role="tablist" aria-label="Filtro de status dos participantes">
          {PARTICIPANT_VIEWS.map((view) => (
            <SwitchButton
              key={view.id}
              type="button"
              $active={view.id === activeView}
              aria-pressed={view.id === activeView}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </SwitchButton>
          ))}
        </SwitchBar>

        <MobileSwitchWrapper>
          <MobileSwitchLabel htmlFor={VIEW_SWITCH_ID}>Filtrar por status</MobileSwitchLabel>
          <MobileSwitchSelect
            id={VIEW_SWITCH_ID}
            value={activeView}
            onChange={(event) => setActiveView(event.target.value as ParticipantViewId)}
          >
            {PARTICIPANT_VIEWS.map((view) => (
              <option key={view.id} value={view.id}>
                {view.label}
              </option>
            ))}
          </MobileSwitchSelect>
        </MobileSwitchWrapper>

        <ParticipantsScrollArea>{renderContent()}</ParticipantsScrollArea>

        <FooterContainer>
          <BackButton type="button" onClick={handleClose}>
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Voltar
          </BackButton>
        </FooterContainer>
      </ContentWrapper>
    </RegisterUsersModalContainer>
  );
};
