import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "antd";
import { describe, expect, it, vi } from "vitest";

import { RegisterUsersModal } from ".";
import { renderWithProviders, createEventRegistration } from "@/tests/test-utils";

describe("RegisterUsersModal", () => {
  it("fetches participants when opened", async () => {
    const listEventRegistrations = vi.fn().mockResolvedValue({ success: true });

    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          eventRegistrations: [createEventRegistration()],
          listEventRegistrations,
          event: { id: "event-1", name: "", description: "", availability: 1, date: new Date().toISOString(), cover: "", userStatus: "OPEN" },
        },
      },
    });

    await waitFor(() => expect(listEventRegistrations).toHaveBeenCalled());
    expect(screen.getByText("Participante Teste")).toBeInTheDocument();
  });

  it("confirms status change actions", async () => {
    const updateUserRegistration = vi.fn().mockResolvedValue({ success: true });
    const listEventRegistrations = vi.fn().mockResolvedValue({ success: true });
    const confirmSpy = vi.spyOn(Modal, "confirm").mockImplementation(({ onOk }: any) => {
      onOk?.();
      return { destroy: vi.fn() } as any;
    });

    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          eventRegistrations: [
            createEventRegistration({ id: "reg-1", status: "RESERVED" }),
          ],
          updateUserRegistration,
          listEventRegistrations,
          event: { id: "event-1", name: "", description: "", availability: 1, date: new Date().toISOString(), cover: "", userStatus: "OPEN" },
        },
      },
    });

    await userEvent.click(screen.getByRole("button", { name: /Gerenciar status/i }));
    await userEvent.click(await screen.findByRole("menuitem", { name: /Confirmar pagamento/i }));

    expect(confirmSpy).toHaveBeenCalled();
    expect(updateUserRegistration).toHaveBeenCalledWith({ registrationId: "reg-1", status: "CONFIRMED" });

    confirmSpy.mockRestore();
  });
});
