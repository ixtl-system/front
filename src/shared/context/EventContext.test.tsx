import { act, renderHook } from "@testing-library/react";
import { ReactNode, useContext } from "react";

import { EventContext, EventProvider } from "./EventContext";

describe("EventContext", () => {
  const wrapper = ({ children }: { children: ReactNode }) => <EventProvider>{children}</EventProvider>;

  beforeEach(() => {
    __apiMock.get.mockReset();
    __apiMock.post.mockReset();
    __apiMock.patch.mockReset();
  });

  it("fetches a single event and updates state", async () => {
    const event = {
      id: "1",
      name: "Cerimônia",
      description: "Evento especial",
      availability: 10,
      date: "2024-01-01T10:00:00.000Z",
      cover: "capa.png",
      userStatus: "OPEN",
    };
    __apiMock.get.mockResolvedValueOnce({ data: event });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.fetchEvent("1");
    });

    expect(response).toEqual({ success: true });
    expect(result.current?.event).toEqual(event);
    expect(__apiMock.get).toHaveBeenCalledWith("/events/1");
  });

  it("fetches and reverses the events list", async () => {
    const events = [
      { id: "1", name: "A", description: "", availability: 5, date: "2024-01-01", cover: "", userStatus: "OPEN" },
      { id: "2", name: "B", description: "", availability: 3, date: "2024-01-02", cover: "", userStatus: "OPEN" },
    ];
    __apiMock.get.mockResolvedValueOnce({ data: events });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.fetchEvents();
    });

    expect(response).toEqual({ success: true });
    expect(result.current?.events).toEqual([...events].reverse());
    expect(__apiMock.get).toHaveBeenCalledWith("/events");
  });

  it("registers a user in an event and handles success feedback", async () => {
    __apiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.registerUserInEvent("event-id");
    });

    expect(__apiMock.post).toHaveBeenCalledWith("/events/register", { eventId: "event-id" });
    expect(response).toEqual({
      success: true,
      message: {
        title: "Sucesso ao registrar-se!",
        description: "Registrado no evento com sucesso",
      },
    });
  });

  it("handles registration validation errors", async () => {
    __apiMock.post.mockRejectedValueOnce({ response: { status: 400, data: { message: "Complete o perfil" } } });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.registerUserInEvent("event-id");
    });

    expect(response).toEqual({
      success: false,
      message: {
        title: "Perfil incompleto!",
        description: "Complete o perfil",
      },
    });
  });

  it("lists event registrations and stores them in state", async () => {
    const registrations = [
      {
        id: "reg-1",
        eventId: "1",
        userId: "user",
        invitedByUserId: "admin",
        status: "CONFIRMED" as const,
        name: "Convidado",
        email: "guest@example.com",
        gender: "OTHER",
        firstTimer: true,
        hasPaid: true,
        checkedInAt: "",
        createdAt: "",
        updatedAt: "",
      },
    ];

    __apiMock.get.mockResolvedValueOnce({ data: registrations });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.listEventRegistrations("1");
    });

    expect(response).toEqual({ success: true });
    expect(result.current?.eventRegistrations).toEqual(registrations);
    expect(__apiMock.get).toHaveBeenCalledWith("/events/participants/1");
  });

  it("returns failure when updating a registration fails", async () => {
    __apiMock.patch.mockRejectedValueOnce({});

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current?.updateUserRegistration({ registrationId: "reg-1", status: "CANCELED" });
    });

    expect(response).toEqual({
      success: false,
      message: { title: "Erro ao solicitar mudança de status!" },
    });
  });
});
