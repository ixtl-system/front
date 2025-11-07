import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { Modal } from "antd";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const listRegistrationsMock = vi.fn().mockResolvedValue({ success: true });
const updateRegistrationMock = vi.fn().mockResolvedValue({ success: true });

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "event-id" }),
  };
});

// eslint-disable-next-line import/first
import { RegisterUsersModal } from "./index";

describe("RegisterUsersModal", () => {
  beforeEach(() => {
    listRegistrationsMock.mockClear();
    updateRegistrationMock.mockClear();
    __notificationMock.success.mockReset();
    __notificationMock.error.mockReset();
  });

  const registrations = [
    {
      id: "1",
      eventId: "event-id",
      userId: "user-1",
      invitedByUserId: "admin",
      status: "RESERVED" as const,
      name: "Convidado Reservado",
      email: "reserved@example.com",
      gender: "OTHER",
      firstTimer: true,
      hasPaid: false,
      checkedInAt: "",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      eventId: "event-id",
      userId: "user-2",
      invitedByUserId: "admin",
      status: "CONFIRMED" as const,
      name: "Convidado Confirmado",
      email: "confirmed@example.com",
      gender: "OTHER",
      firstTimer: false,
      hasPaid: true,
      checkedInAt: "",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      eventId: "event-id",
      userId: "user-3",
      invitedByUserId: "admin",
      status: "CANCELED" as const,
      name: "Convidado Cancelado",
      email: "canceled@example.com",
      gender: "OTHER",
      firstTimer: false,
      hasPaid: false,
      checkedInAt: "",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      eventId: "event-id",
      userId: "user-4",
      invitedByUserId: "admin",
      status: "NO_SHOW" as const,
      name: "Convidado No Show",
      email: "noshow@example.com",
      gender: "OTHER",
      firstTimer: false,
      hasPaid: false,
      checkedInAt: "",
      createdAt: "",
      updatedAt: "",
    },
  ];

  const renderModal = () =>
    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providerOverrides: {
        event: {
          event: {
            id: "event-id",
            name: "Evento",
            description: "",
            availability: 10,
            date: "2024-12-20T10:00:00.000Z",
            cover: "",
            userStatus: "OPEN" as const,
          },
          eventRegistrations: registrations,
          listEventRegistrations: listRegistrationsMock,
          updateUserRegistration: updateRegistrationMock,
        },
      },
    });

  it("lists reserved and confirmed participants by default", async () => {
    renderModal();

    expect(listRegistrationsMock).toHaveBeenCalledWith("event-id");
    expect(screen.getByText("Convidado Reservado")).toBeInTheDocument();
    expect(screen.getByText("Convidado Confirmado")).toBeInTheDocument();
    expect(screen.queryByText("Convidado Cancelado")).not.toBeInTheDocument();
  });

  it("filters participants when switching views", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("button", { name: /canceled & no-show/i }));

    expect(screen.getByText("Convidado Cancelado")).toBeInTheDocument();
    expect(screen.getByText("Convidado No Show")).toBeInTheDocument();
    expect(screen.queryByText("Convidado Confirmado")).not.toBeInTheDocument();
  });

  it("performs check-in for confirmed participants", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(Modal, "confirm").mockImplementation(({ onOk }) => {
      onOk?.();
      return { destroy: vi.fn() } as any;
    });

    renderModal();

    await user.click(screen.getAllByRole("button", { name: /fazer check-in/i })[0]);

    await waitFor(() => {
      expect(updateRegistrationMock).toHaveBeenCalledWith({ registrationId: "2", status: "CHECKED_IN" });
    });

    confirmSpy.mockRestore();
  });

  it("updates participant status via the actions dropdown", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(Modal, "confirm").mockImplementation(({ onOk }) => {
      onOk?.();
      return { destroy: vi.fn() } as any;
    });

    renderModal();

    const manageButtons = screen.getAllByRole("button", { name: /gerenciar status/i });
    await user.click(manageButtons[0]);

    const cancelOption = await screen.findByText("Cancelar reserva");
    await user.click(cancelOption);

    await waitFor(() => {
      expect(updateRegistrationMock).toHaveBeenCalledWith({ registrationId: "1", status: "CANCELED" });
    });

    confirmSpy.mockRestore();
  });
});
