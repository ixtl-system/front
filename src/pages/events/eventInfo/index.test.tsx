import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EventInfo } from ".";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "event-1" }),
  };
});

vi.mock("../components/RegisteredUsersModal", () => ({
  RegisterUsersModal: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
    visible ? <div data-testid="registered-users" onClick={onClose}>Modal aberto</div> : null
  ),
}));

describe("EventInfo", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("allows admin to open participants modal", async () => {
    const fetchEvent = vi.fn().mockResolvedValue({ success: true });
    const fetchUserProfile = vi.fn().mockResolvedValue(undefined);

    renderWithProviders(<EventInfo />, {
      providers: {
        event: {
          event: {
            id: "event-1",
            name: "Vivência",
            description: "Descrição",
            availability: 5,
            date: new Date("2024-05-10T18:00:00Z").toISOString(),
            cover: "",
            userStatus: "OPEN",
          },
          fetchEvent,
          registerUserInEvent: vi.fn().mockResolvedValue({ success: true, message: { title: "ok" } }),
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

    await waitFor(() => expect(fetchEvent).toHaveBeenCalledWith("event-1"));
    expect(fetchUserProfile).toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /Ver clientes cadastrados/i }));
    expect(screen.getByTestId("registered-users")).toBeInTheDocument();
  });

  it("registers user and shows notifications", async () => {
    const registerUserInEvent = vi.fn().mockResolvedValue({
      success: true,
      message: { title: "Registrado", description: "Sucesso" },
    });
    const fetchEvent = vi.fn().mockResolvedValue({ success: true });

    renderWithProviders(<EventInfo />, {
      providers: {
        event: {
          event: {
            id: "event-1",
            name: "Vivência",
            description: "Descrição",
            availability: 1,
            date: new Date().toISOString(),
            cover: "",
            userStatus: "OPEN",
          },
          registerUserInEvent,
          fetchEvent,
        },
        user: {
          userProfile: {
            name: "Usuário",
            email: "user@test.com",
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
            role: "USER",
          },
          fetchUserProfile: vi.fn(),
        },
      },
    });

    await userEvent.click(screen.getByRole("button", { name: /Registrar-se no Evento/i }));

    await waitFor(() => expect(registerUserInEvent).toHaveBeenCalledWith("event-1"));
    expect(globalThis.antdNotificationMock.success).toHaveBeenCalledWith({
      message: "Registrado",
      description: "Sucesso",
    });
    expect(fetchEvent).toHaveBeenCalledWith("event-1");
  });

  it("shows error notification when registration fails", async () => {
    const registerUserInEvent = vi.fn().mockResolvedValue({
      success: false,
      message: { title: "Erro", description: "Falha" },
    });

    renderWithProviders(<EventInfo />, {
      providers: {
        event: {
          event: {
            id: "event-1",
            name: "Vivência",
            description: "Descrição",
            availability: 1,
            date: new Date().toISOString(),
            cover: "",
            userStatus: "OPEN",
          },
          registerUserInEvent,
          fetchEvent: vi.fn(),
        },
        user: {
          userProfile: {
            name: "Usuário",
            email: "user@test.com",
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
            role: "USER",
          },
          fetchUserProfile: vi.fn(),
        },
      },
    });

    await userEvent.click(screen.getByRole("button", { name: /Registrar-se no Evento/i }));

    await waitFor(() => expect(registerUserInEvent).toHaveBeenCalled());
    expect(globalThis.antdNotificationMock.error).toHaveBeenCalledWith({
      message: "Erro",
      description: "Falha",
    });
  });
});
