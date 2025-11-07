import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "event-id" }),
  };
});

vi.mock("../components/RegisteredUsersModal", () => ({
  RegisterUsersModal: ({ visible }: { visible: boolean }) =>
    visible ? <div data-testid="participants-modal">Participantes</div> : null,
}));

// eslint-disable-next-line import/first
import { EventInfo } from "./index";

describe("EventInfo page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    __notificationMock.success.mockReset();
    __notificationMock.error.mockReset();
  });

  it("fetches event data on mount and allows registration", async () => {
    const user = userEvent.setup();
    const fetchEventMock = vi.fn().mockResolvedValue({ success: true });
    const registerUserMock = vi.fn().mockResolvedValue({
      success: true,
      message: { title: "Sucesso", description: "Registrado" },
    });

    renderWithProviders(<EventInfo />, {
      providerOverrides: {
        event: {
          event: {
            id: "event-id",
            name: "Cerimônia",
            description: "Descrição",
            availability: 5,
            date: "2024-12-20T10:00:00.000Z",
            cover: "",
            userStatus: "OPEN" as const,
          },
          fetchEvent: fetchEventMock,
          registerUserInEvent: registerUserMock,
        },
        user: {
          userProfile: {
            name: "Participante",
            email: "user@example.com",
            gender: "OTHER",
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
            role: "USER" as const,
          },
          fetchUserProfile: vi.fn(),
        },
      },
    });

    expect(fetchEventMock).toHaveBeenCalledWith("event-id");

    await user.click(screen.getByRole("button", { name: /Registrar-se no Evento/i }));

    expect(registerUserMock).toHaveBeenCalledWith("event-id");
    expect(__notificationMock.success).toHaveBeenCalledWith({ message: "Sucesso", description: "Registrado" });
    expect(fetchEventMock).toHaveBeenCalledTimes(2);
  });

  it("allows administrators to open the participants modal", async () => {
    const user = userEvent.setup();
    const fetchEventMock = vi.fn().mockResolvedValue({ success: true });

    renderWithProviders(<EventInfo />, {
      providerOverrides: {
        event: {
          event: {
            id: "event-id",
            name: "Cerimônia",
            description: "Descrição",
            availability: 5,
            date: "2024-12-20T10:00:00.000Z",
            cover: "",
            userStatus: "OPEN" as const,
          },
          fetchEvent: fetchEventMock,
        },
        user: {
          userProfile: {
            name: "Admin",
            email: "admin@example.com",
            gender: "OTHER",
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
          },
          fetchUserProfile: vi.fn(),
        },
      },
    });

    const openModalButton = screen.getByRole("button", { name: /ver clientes cadastrados/i });
    await user.click(openModalButton);

    expect(screen.getByTestId("participants-modal")).toBeInTheDocument();
  });
});
