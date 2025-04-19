import { Controller, Control, FieldError } from "react-hook-form";
import { Select } from "antd";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  label?: string;
  error?: FieldError;
  disabled?: boolean;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

export function CustomSelect({
  name,
  control,
  options,
  label,
  error,
  disabled = false,
  placeholder,
  onSelect
}: CustomSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          {label && <p>{label}</p>}
          <Select
            {...field}
            disabled={disabled}
            style={{ width: "100%" }}
            placeholder={placeholder}
            options={options}
            value={field.value}
            onChange={field.onChange}
            onSelect={onSelect}
          />
          {error && <span className="error">{error.message}</span>}
        </div>
      )}
    />
  );
}
