import type { ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useForm } from "react-hook-form";

import { CustomSelect } from "@/shared/components/CustomSelect";

const OPTIONS = [
  { label: "Primeira opção", value: "first" },
  { label: "Segunda opção", value: "second" },
];

type CustomSelectTestProps = Partial<ComponentProps<typeof CustomSelect>> & {
  defaultValue?: string;
};

const renderCustomSelect = ({ defaultValue, options, ...props }: CustomSelectTestProps = {}) => {
  const Wrapper = () => {
    const form = useForm({
      defaultValues: { status: defaultValue },
    });

    return (
      <CustomSelect
        name="status"
        control={form.control}
        options={options ?? OPTIONS}
        {...props}
      />
    );
  };

  return render(<Wrapper />);
};

describe("CustomSelect", () => {
  it("renders label and options", async () => {
    const user = userEvent.setup();
    renderCustomSelect({ label: "Status", placeholder: "Selecione" });

    expect(screen.getByText("Status")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByText("Primeira opção")).toBeInTheDocument();
    expect(await screen.findByText("Segunda opção")).toBeInTheDocument();
  });

  it("shows error message when field has error", () => {
    renderCustomSelect({
      error: { message: "Campo obrigatório" } as any,
    });

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("calls onSelect callback when option is chosen", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderCustomSelect({ onSelect, placeholder: "Selecione" });

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("Segunda opção"));

    expect(onSelect).toHaveBeenCalledWith("second", expect.anything());
  });

  it("clears value and triggers onClear when allowClear is enabled", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    renderCustomSelect({
      allowClear: true,
      onClear,
      defaultValue: "first",
    });

    await waitFor(() => {
      expect(document.querySelector(".ant-select-clear")).toBeTruthy();
    });

    const clearButton = document.querySelector(".ant-select-clear") as HTMLElement;
    await user.click(clearButton);

    expect(onClear).toHaveBeenCalled();
  });
});
