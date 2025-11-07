import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { CustomSelect } from ".";

const SelectForm = ({ onSelect = vi.fn() }: { onSelect?: (value: string) => void }) => {
  const {
    control,
    formState: { errors },
  } = useForm<{ option: string }>({
    defaultValues: { option: "" },
  });

  return (
    <form>
      <CustomSelect
        name="option"
        control={control}
        options={[
          { label: "Primeira", value: "1" },
          { label: "Segunda", value: "2" },
        ]}
        label="Escolha"
        placeholder="Selecione"
        error={errors.option}
        onSelect={onSelect}
      />
    </form>
  );
};

describe("CustomSelect", () => {
  it("renders label and placeholder", () => {
    render(<SelectForm />);

    expect(screen.getByText("Escolha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Selecione")).toBeInTheDocument();
  });

  it("calls onSelect when an option is chosen", async () => {
    const onSelect = vi.fn();
    render(<SelectForm onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Primeira"));

    await waitFor(() => expect(onSelect).toHaveBeenCalledWith("1"));
  });
});
