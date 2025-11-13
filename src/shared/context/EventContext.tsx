import React, { createContext, useCallback, useState } from 'react';

import { api } from '../infra/api';
import {
  CreateEventInvitationPayload,
  Event,
  EventData,
  EventRegistration,
  EventStatus,
  EventType,
} from '../types/Event';

type FeedbackAction = "redirect-to-events" | "retry";

type ApiResponse = {
  success: boolean;
  message?: {
    title: string;
    description?: string;
    actions?: FeedbackAction[];
  }
}

type UpdateUserRegistrationStatusProps = {
  registrationId: string;
  status: EventStatus;
}

type EventRegistrationsFilters = {
  name?: string;
  gender?: string;
}

type EventContextType = {
  event: Event;
  events: Event[];
  eventRegistrations: EventRegistration[] | null;
  eventTypes: EventType[];
  fetchEventTypes: () => Promise<ApiResponse>;
  fetchEvent: (id: string) => Promise<ApiResponse>;
  fetchEvents: () => Promise<ApiResponse>;
  registerUserInEvent: (id: string) => Promise<ApiResponse>;
  createEvent: (eventData: EventData) => Promise<ApiResponse>;
  updateEvent: (eventId: string, eventData: Partial<EventData>) => Promise<ApiResponse>;
  listEventRegistrations: (eventId: string, filters?: EventRegistrationsFilters) => Promise<ApiResponse>;
  updateUserRegistration: (props: UpdateUserRegistrationStatusProps) => Promise<ApiResponse>;
  createEventInvitation: (
    eventId: string,
    payload: CreateEventInvitationPayload,
  ) => Promise<ApiResponse>;
};

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);

  const fetchEvent = async (id: string) => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: {
          title: "Evento não encontrado!",
          description: error.response?.data?.message || "Erro ao buscar detalhes do evento"
        }
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: { title: "Erro ao buscar eventos!" },
      };
    }
  }

  const updateUserRegistration = useCallback(async ({ registrationId, status }: UpdateUserRegistrationStatusProps) => {
    try {
      await api.patch(`/events/registrations/${registrationId}`, { status });

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: { title: "Erro ao solicitar mudança de status!" },
      };
    }
  }, []);

  const registerUserInEvent = async (id: string) => {
    try {
      await api.post("/events/register", { eventId: id });
      return {
        success: true,
        message: {
          title: "Sucesso ao registrar-se!",
          description: "Registrado no evento com sucesso"
        }
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        return {
          success: false,
          message: {
            title: "Perfil incompleto!",
            description: error.response.data.message
          }
        }
      } else if (error.response?.status === 409) {
        return {
          success: false,
          message: {
            title: "Você já está registrado!",
            description: "error.response.data.message"
          }
        }
      } else {
        return {
          success: false,
          message: {
            title: "Erro inesperado!",
            description: "Ocorreu um erro durante o registro"
          }
        }
      }
    }
  };

  const listEventRegistrations = useCallback(async (eventId: string, filters?: EventRegistrationsFilters) => {
    try {
      const params: Record<string, string> = {};

      if (filters?.name) {
        params.name = filters.name;
      }

      if (filters?.gender) {
        params.gender = filters.gender;
      }

      const response = await api.get<EventRegistration[]>(`/events/participants/${eventId}`, {
        params: Object.keys(params).length ? params : undefined,
      });
      setEventRegistrations(response.data);

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: {
          title: "Erro ao buscar registros!",
          description: error.response?.data?.message || "Erro ao listar os usuários registrados no evento.",
        },
      };
    }
  }, []);

  const createEventInvitation = useCallback(
    async (eventId: string, payload: CreateEventInvitationPayload) => {
      try {
        await api.post(`/events/${eventId}/invite`, payload);

        return {
          success: true,
          message: {
            title: "Convite criado com sucesso!",
            description: "O convidado foi reservado para o evento.",
          },
        };
      } catch (error: any) {
        return {
          success: false,
          message: {
            title: "Erro ao criar convite!",
            description:
              error.response?.data?.message ||
              "Não foi possível criar o convite para o convidado.",
          },
        };
      }
    },
    [],
  );

  const createEvent = async (eventData: EventData) => {
    try {
      await api.post("/events", { ...eventData });

      return {
        success: true,
        message: {
          title: "Evento criado com sucesso!",
          description: "O evento foi criado e está disponível para registros.",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: {
          title: "Erro ao criar evento!",
          description: error.response?.data?.message || "Ocorreu um erro ao tentar criar o evento.",
        },
      };
    }
  };

  const updateEvent = async (eventId: string, eventData: Partial<EventData>) => {
    try {
      await api.put(`/events/${eventId}`, eventData);

      setEvent((previous) => previous?.id === eventId
        ? { ...previous, ...eventData }
        : previous,
      );

      setEvents((previous) => previous.map((currentEvent) => (
        currentEvent.id === eventId ? { ...currentEvent, ...eventData } : currentEvent
      )));

      return {
        success: true,
        message: {
          title: "Evento atualizado com sucesso!",
        },
      };
    } catch (error: any) {
      if (error.response?.status === 409) {
        return {
          success: false,
          message: {
            title: "O evento não foi encontrado.",
            description: error.response?.data?.message || "O evento não está mais disponível para atualização.",
            actions: ["redirect-to-events", "retry"] as FeedbackAction[],
          },
        };
      }

      return {
        success: false,
        message: {
          title: "Erro ao atualizar evento!",
          description: error.response?.data?.message || "Não foi possível atualizar o evento. Tente novamente.",
          actions: ["retry"] as FeedbackAction[],
        },
      };
    }
  };

  const fetchEventTypes = async () => {
    try {
      const response = await api.get("/events-types");
      setEventTypes(response.data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: {
          title: "Erro ao buscar tipos de evento!",
          description: error.response?.data?.message,
        },
      };
    }
  };


  return (
    <EventContext.Provider value={{
      event,
      events,
      eventRegistrations,
      updateUserRegistration,
      listEventRegistrations,
      registerUserInEvent,
      fetchEvent,
      fetchEvents,
      createEvent,
      updateEvent,
      eventTypes,
      fetchEventTypes,
      createEventInvitation,
    }}>
      {children}
    </EventContext.Provider>
  );
};
