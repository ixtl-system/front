import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InviteGuestModal } from "@/pages/events/components/InviteGuestModal";
import { renderWithProviders } from "@/tests/test-utils";

describe("InviteGuestModal", () => {
  it("atualiza o status quando o pagamento é confirmado", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InviteGuestModal visible onClose={vi.fn()} />);

    expect(await screen.findByText("Reservado")).toBeInTheDocument();

    const toggle = screen.getByRole("switch", { name: /pagamento confirmado/i });
    await user.click(toggle);

    expect(screen.getByText("Confirmado")).toBeInTheDocument();
  });
});
