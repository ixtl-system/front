import React, { createContext, useCallback, useState } from 'react';

import { api } from '../infra/api';
import { Event, EventData, EventRegistration, EventStatus, EventType } from '../types/Event';

type ApiResponse = {
  success: boolean;
  message?: {
    title: string;
    description?: string;
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
  updateEvent: (eventId: string, eventData: EventData) => Promise<ApiResponse>;
  listEventRegistrations: (eventId: string, filters?: EventRegistrationsFilters) => Promise<ApiResponse>;
  updateUserRegistration: (props: UpdateUserRegistrationStatusProps) => Promise<ApiResponse>;
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
      setEvents([...response.data].reverse());

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

  const updateEvent = async () => {
    return {
      success: false,
      message: {
        title: "Rota não implementada!",
        description: "A rota para atualização de eventos ainda não está disponível.",
      },
    };
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
    }}>
      {children}
    </EventContext.Provider>
  );
};
