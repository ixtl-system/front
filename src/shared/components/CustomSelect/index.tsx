import { Select } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

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
  allowClear?: boolean;
  onClear?: () => void;
}

export function CustomSelect({
  name,
  control,
  options,
  label,
  error,
  disabled = false,
  placeholder,
  onSelect,
  allowClear = false,
  onClear,
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
            allowClear={allowClear}
            onClear={onClear}
          />
          {error && <span className="error">{error.message}</span>}
        </div>
      )}
    />
  );
}
