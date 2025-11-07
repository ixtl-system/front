import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CreateEventModal } from ".";
import { renderWithProviders, createEventType } from "@/tests/test-utils";

vi.mock("./styles", async () => {
  const actual = await vi.importActual<any>("./styles");
  return {
    ...actual,
    StyledDatePicker: ({ value, onChange, placeholder }: any) => (
      <input
        data-testid="date-picker"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={event => onChange?.(event.target.value, event.target.value)}
      />
    ),
  };
});

describe("CreateEventModal", () => {
  it("submits event data", async () => {
    const createEvent = vi.fn().mockResolvedValue({ success: true, message: { title: "ok" } });
    const fetchEvents = vi.fn().mockResolvedValue({ success: true });

    renderWithProviders(<CreateEventModal visible onClose={vi.fn()} />, {
      providers: {
        event: {
          eventTypes: [createEventType({ id: "type-1", name: "Vivência" })],
          createEvent,
          fetchEvents,
        },
      },
    });

    await userEvent.type(screen.getByPlaceholderText("Nome"), "Novo Evento");
    await userEvent.type(screen.getByPlaceholderText("Descrição"), "Descrição longa");
    await userEvent.type(screen.getByPlaceholderText("Quantidade de lugares disponíveis"), "25");

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(await screen.findByRole("option", { name: "Vivência" }));

    await userEvent.type(screen.getByTestId("date-picker"), "2024-12-01");

    await userEvent.click(screen.getByRole("button", { name: /Salvar evento/i }));

    await waitFor(() => expect(createEvent).toHaveBeenCalled());
    expect(createEvent).toHaveBeenCalledWith({
      name: "Novo Evento",
      description: "Descrição longa",
      availability: 25,
      eventTypeId: "type-1",
      date: "2024-12-01",
    });
    expect(fetchEvents).toHaveBeenCalled();
  });
});
