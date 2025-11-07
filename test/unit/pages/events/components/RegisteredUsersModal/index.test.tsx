import { screen, waitFor } from "@testing-library/react";
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

    await waitFor(() => expect(listEventRegistrations).toHaveBeenCalled());
    expect(screen.getByText("Participante Teste")).toBeInTheDocument();
  });

});
