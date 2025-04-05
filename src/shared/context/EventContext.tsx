import React, { createContext, useState } from 'react';
import { api } from '../infra/api';
import { Event, EventData, EventRegistration } from '../types/Event';

type ReturnType = {
  success: boolean;
  message?: {
    title: string;
    description?: string;
  }
}

type EventContextType = {
  event: Event;
  events: Event[];
  eventRegistrations: EventRegistration[] | null;
  fetchEvent: (id: string) => Promise<ReturnType>;
  fetchEvents: () => Promise<ReturnType>;
  registerUserInEvent: (id: string) => Promise<ReturnType>;
  createEvent: (eventData: EventData) => Promise<ReturnType>;
  updateEvent: (eventId: string, eventData: EventData) => Promise<ReturnType>;
  listEventRegistrations: (eventId: string) => Promise<[] | ReturnType>;
};

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<Event>({} as Event);
  const [events, setEvents] = useState<Event[]>([]);
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
      setEvents(response.data.reverse());

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: { title: "Erro ao buscar eventos!" },
      };
    }
  }

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

  const listEventRegistrations = async (eventId: string) => {
    try {
      const response = await api.get<EventRegistration[]>(`/events/registrations/${eventId}`);
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
  };

  const createEvent = async (eventData: EventData) => {
    try {
      await api.post("/events", { ...eventData, eventTypeId: "68279336-1f8a-4d21-b8cc-fd55a5c4854d" });

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

  return (
    <EventContext.Provider value={{
      event,
      events,
      eventRegistrations,
      listEventRegistrations,
      registerUserInEvent,
      fetchEvent,
      fetchEvents,
      createEvent,
      updateEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};
