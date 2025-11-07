import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateTime } from "luxon";
import { describe, expect, it, vi } from "vitest";

import { EventList } from ".";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("EventList", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("renders events and allows admin actions", async () => {
    const eventDate = DateTime.fromISO("2024-05-10T18:00:00");
    const fetchEvents = vi.fn().mockResolvedValue({ success: true });
    const fetchUserProfile = vi.fn().mockResolvedValue(undefined);
    const fetchEventTypes = vi.fn().mockResolvedValue({ success: true });

    renderWithProviders(<EventList />, {
      providers: {
        event: {
          events: [
            {
              id: "event-1",
              name: "Vivência Xamânica",
              description: "Descrição",
              availability: 12,
              date: eventDate.toISO(),
              cover: "",
              userStatus: "OPEN",
            },
          ],
          fetchEvents,
          fetchEventTypes,
        },
        user: {
          userProfile: {
            name: "Admin",
            email: "admin@test.com",
            gender: "OTHER",
            rg: "1",
            cpf: "1",
            street: "Rua",
            number: "1",
            neighborhood: "Bairro",
            city: "Cidade",
            state: "ST",
            zipCode: "00000000",
            cellPhone: "(11) 99999-9999",
            birth: "2000-01-01",
            role: "ADMIN",
          },
          fetchUserProfile,
        },
      },
    });

    expect(await screen.findByText("Criar Evento")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Vivência Xamânica"));

    expect(navigateMock).toHaveBeenCalledWith("/events/event-1");
    expect(fetchEvents).toHaveBeenCalled();
    expect(fetchUserProfile).toHaveBeenCalled();
    expect(fetchEventTypes).toHaveBeenCalled();
  });
});
