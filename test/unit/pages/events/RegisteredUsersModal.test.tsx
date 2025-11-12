import { act, fireEvent, screen } from "@testing-library/react";
import { notification } from "antd";
import { describe, expect, it, vi } from "vitest";

import { RegisterUsersModal } from "@/pages/events/components/RegisteredUsersModal";
import { createEventRegistration } from "@/tests/test-utils";
import { renderWithProviders } from "@/tests/test-utils";

describe("RegisterUsersModal", () => {
  it("aplica filtros de nome e gênero", async () => {
    vi.useFakeTimers();
    const listEventRegistrations = vi
      .fn()
      .mockResolvedValue({ success: true });

    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          listEventRegistrations,
          eventRegistrations: [createEventRegistration()],
        },
      },
    });

    expect(listEventRegistrations).toHaveBeenCalledTimes(1);

    const nameInput = screen.getByLabelText(/buscar por nome/i);
    fireEvent.change(nameInput, { target: { value: " Ana  " } });

    const genderSelect = screen.getByLabelText(/filtrar por gênero/i);
    fireEvent.change(genderSelect, { target: { value: "FEMININE" } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(450);
    });

    expect(listEventRegistrations).toHaveBeenCalledWith("event-1", {
      gender: "FEMININE",
      name: "Ana",
    });

    vi.useRealTimers();
  });

  it("exibe notificação quando a listagem falha", async () => {
    vi.useFakeTimers();
    const listEventRegistrations = vi.fn().mockResolvedValue({
      success: false,
      message: { title: "Erro", description: "Falha ao buscar" },
    });
    const errorSpy = vi.spyOn(notification, "error");

    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          listEventRegistrations,
          eventRegistrations: [createEventRegistration()],
        },
      },
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
    vi.useRealTimers();
  });
});
