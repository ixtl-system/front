import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RegisterUsersModal } from "@/pages/events/components/RegisteredUsersModal";
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

    await waitFor(() =>
      expect(listEventRegistrations).toHaveBeenCalledWith("event-1", undefined)
    );
    expect(screen.getByText("Participante Teste")).toBeInTheDocument();
  });

  it("applies filters when typing a name and selecting a gender", async () => {
    const listEventRegistrations = vi.fn().mockResolvedValue({ success: true });
    const user = userEvent.setup();

    renderWithProviders(<RegisterUsersModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          eventRegistrations: [createEventRegistration()],
          listEventRegistrations,
          event: {
            id: "event-1",
            name: "",
            description: "",
            availability: 1,
            date: new Date().toISOString(),
            cover: "",
            userStatus: "OPEN",
          },
        },
      },
    });

    await waitFor(() =>
      expect(listEventRegistrations).toHaveBeenCalledWith("event-1", undefined)
    );

    listEventRegistrations.mockClear();

    await user.type(screen.getByLabelText("Buscar por nome"), "Ana");

    await waitFor(() =>
      expect(listEventRegistrations).toHaveBeenLastCalledWith("event-1", { name: "Ana" })
    );

    listEventRegistrations.mockClear();

    await user.selectOptions(screen.getByLabelText("Filtrar por gênero"), "FEMININE");

    await waitFor(() =>
      expect(listEventRegistrations).toHaveBeenLastCalledWith("event-1", {
        name: "Ana",
        gender: "FEMININE",
      })
    );
  });

});
