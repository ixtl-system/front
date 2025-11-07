import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { CustomSelect } from "./index";

describe("CustomSelect", () => {
  const options = [
    { label: "Primeira opção", value: "1" },
    { label: "Segunda opção", value: "2" },
  ];

  const Wrapper = ({
    label = "Status",
    error,
    onSelect,
    disabled,
  }: {
    label?: string;
    error?: { message?: string };
    onSelect?: (value: string) => void;
    disabled?: boolean;
  }) => {
    const { control } = useForm({
      defaultValues: {
        status: "",
      },
    });

    return (
      <CustomSelect
        name="status"
        control={control}
        options={options}
        label={label}
        error={error as any}
        onSelect={onSelect}
        disabled={disabled}
        placeholder="Selecione"
      />
    );
  };

  it("renders the label and placeholder", () => {
    render(<Wrapper />);

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Selecione")).toBeInTheDocument();
  });

  it("displays the validation message when provided", () => {
    render(<Wrapper error={{ message: "Campo obrigatório" }} />);

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("triggers onSelect when an option is chosen", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<Wrapper onSelect={handleSelect} />);

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);

    const option = await screen.findByText("Primeira opção");
    await user.click(option);

    expect(handleSelect).toHaveBeenCalledWith("1");
  });
});
