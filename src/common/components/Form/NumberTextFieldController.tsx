import TextField from "@mui/material/TextField";
import * as React from "react";
import { Controller } from "react-hook-form";

type NumberTextFieldControllerProps = {
  control: any;
  name: string;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export default function NumberTextFieldController({
  control,
  name,
  label,
  fullWidth,
  disabled,
  required,
}: NumberTextFieldControllerProps) {
  const output = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const output = parseInt(event.target.value, 10);
    return isNaN(output) ? 0 : output;
  };

  const input = (value: string) => {
    const isNan = Number.isNaN(value);

    if (isNan || Number(value) === 0) return "";

    return value;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={0}
      rules={{
        validate: (value: string) => {
          if (value === "") return;

          const number = Number(value);
          if (Number.isNaN(number)) return "Must be a number";
          if (number < 0) return "Must be above 0";
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          label={label}
          type="number"
          helperText={error?.message}
          onChange={(event) => onChange(output(event))}
          value={input(value)}
          fullWidth={fullWidth}
          disabled={disabled}
          required={required}
        />
      )}
    />
  );
}
