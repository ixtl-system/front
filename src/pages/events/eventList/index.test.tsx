import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const navigateMock = vi.fn();
const fetchEventsMock = vi.fn().mockResolvedValue({ success: true });
const fetchEventTypesMock = vi.fn().mockResolvedValue({ success: true });
const fetchUserProfileMock = vi.fn().mockResolvedValue(undefined);

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../components/CreateEventModal", () => ({
  CreateEventModal: ({ visible }: { visible: boolean }) =>
    visible ? <div data-testid="create-event-modal">Modal aberto</div> : null,
}));

// eslint-disable-next-line import/first
import { EventList } from "./index";

describe("EventList page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    fetchEventsMock.mockClear();
    fetchEventTypesMock.mockClear();
    fetchUserProfileMock.mockClear();
  });

  it("loads events and renders them for the user", () => {
    const events = [
      {
        id: "1",
        name: "Cerimônia do Sol",
        description: "Descrição",
        availability: 10,
        date: "2024-12-20T10:00:00.000Z",
        cover: "",
        userStatus: "OPEN" as const,
      },
      {
        id: "2",
        name: "Encontro da Lua",
        description: "Descrição",
        availability: 5,
        date: "2024-12-22T10:00:00.000Z",
        cover: "",
        userStatus: "OPEN" as const,
      },
    ];

    renderWithProviders(<EventList />, {
      providerOverrides: {
        event: {
          events,
          fetchEvents: fetchEventsMock,
          fetchEventTypes: fetchEventTypesMock,
        },
        user: {
          fetchUserProfile: fetchUserProfileMock,
        },
      },
    });

    expect(screen.getByText("Cerimônia do Sol")).toBeInTheDocument();
    expect(screen.getByText("Encontro da Lua")).toBeInTheDocument();
    expect(fetchEventsMock).toHaveBeenCalled();
    expect(fetchEventTypesMock).toHaveBeenCalled();
    expect(fetchUserProfileMock).toHaveBeenCalled();
  });

  it("shows the create event button for administrators and toggles the modal", async () => {
    const user = userEvent.setup();

    const adminProfile = {
      name: "Admin",
      email: "admin@example.com",
      gender: "OTHER" as const,
      rg: "123456789",
      cpf: "12345678901",
      street: "Rua",
      number: "123",
      neighborhood: "Bairro",
      city: "Cidade",
      state: "SP",
      zipCode: "01001000",
      phone: "1199999999",
      cellPhone: "11999999999",
      passport: "AB123456",
      birth: "1990-01-01",
      role: "ADMIN" as const,
    };

    renderWithProviders(<EventList />, {
      providerOverrides: {
        event: {
          events: [],
          fetchEvents: fetchEventsMock,
          fetchEventTypes: fetchEventTypesMock,
        },
        user: {
          userProfile: adminProfile,
          fetchUserProfile: fetchUserProfileMock,
        },
      },
    });

    const createButton = screen.getByRole("button", { name: /criar evento/i });
    await user.click(createButton);

    expect(screen.getByTestId("create-event-modal")).toBeInTheDocument();
  });

  it("navigates to the event details when a card is clicked", async () => {
    const user = userEvent.setup();

    const events = [
      {
        id: "1",
        name: "Cerimônia do Sol",
        description: "Descrição",
        availability: 10,
        date: "2024-12-20T10:00:00.000Z",
        cover: "",
        userStatus: "OPEN" as const,
      },
    ];

    renderWithProviders(<EventList />, {
      providerOverrides: {
        event: {
          events,
          fetchEvents: fetchEventsMock,
          fetchEventTypes: fetchEventTypesMock,
        },
        user: {
          fetchUserProfile: fetchUserProfileMock,
        },
      },
    });

    await user.click(screen.getByRole("button", { name: /cerimônia do sol/i }));

    expect(navigateMock).toHaveBeenCalledWith("/events/1");
  });
});
