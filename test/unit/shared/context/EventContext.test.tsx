import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";

import { EventContext, EventProvider } from "@/shared/context/EventContext";
import { createEvent, createEventRegistration, createEventType } from "@/tests/test-utils";

describe("EventContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <EventProvider>{children}</EventProvider>
  );

  it("fetches and reverses events", async () => {
    const events = [
      createEvent({ id: "1", date: new Date("2024-01-01").toISOString() }),
      createEvent({ id: "2", date: new Date("2024-02-01").toISOString() }),
    ];
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: events });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    await act(async () => {
      const response = await result.current.fetchEvents();
      expect(response.success).toBe(true);
    });

    expect(result.current.events.map(event => event.id)).toEqual(["2", "1"]);
  });

  it("fetches event details", async () => {
    const event = createEvent({ id: "event-42" });
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: event });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    await act(async () => {
      const response = await result.current.fetchEvent("event-42");
      expect(response.success).toBe(true);
    });

    expect(result.current.event.id).toBe("event-42");
  });

  it("registers user in event and handles business errors", async () => {
    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    globalThis.axiosApiMock.post.mockResolvedValueOnce({});
    let response;

    await act(async () => {
      response = await result.current.registerUserInEvent("event-10");
    });
    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/events/register", { eventId: "event-10" });
    expect(response).toEqual({
      success: true,
      message: {
        title: "Sucesso ao registrar-se!",
        description: "Registrado no evento com sucesso",
      },
    });

    globalThis.axiosApiMock.post.mockRejectedValueOnce({
      response: { status: 400, data: { message: "Perfil incompleto" } },
    });

    await act(async () => {
      response = await result.current.registerUserInEvent("event-10");
    });
    expect(response?.success).toBe(false);
    expect(response?.message?.title).toBe("Perfil incompleto!");
  });

  it("lists event registrations", async () => {
    const registrations = [
      createEventRegistration({ id: "reg-1" }),
      createEventRegistration({ id: "reg-2" }),
    ];
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: registrations });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    await act(async () => {
      const response = await result.current.listEventRegistrations("event-1");
      expect(response.success).toBe(true);
    });

    expect(result.current.eventRegistrations?.length).toBe(2);
  });

  it("updates registrations status", async () => {
    globalThis.axiosApiMock.patch.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.updateUserRegistration({ registrationId: "reg-1", status: "CONFIRMED" });
    });

    expect(globalThis.axiosApiMock.patch).toHaveBeenCalledWith(
      "/events/registrations/reg-1",
      { status: "CONFIRMED" }
    );
    expect(response.success).toBe(true);
  });

  it("fetches event types", async () => {
    const eventTypes = [createEventType({ id: "type-1" })];
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: eventTypes });

    const { result } = renderHook(() => useContext(EventContext), { wrapper });

    await act(async () => {
      await result.current.fetchEventTypes();
    });

    expect(result.current.eventTypes).toEqual(eventTypes);
  });
});
