import * as React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import TextField from "@mui/material/TextField";

type TextFieldControllerProps = {
  control: any;
  name: string;
  label: string;
  type: string;
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export default function TextFieldController({
  control,
  name,
  label,
  type,
  rules,
  fullWidth,
  disabled,
  required,
}: TextFieldControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          label={label}
          type={type}
          helperText={error?.message}
          onChange={onChange}
          value={value}
          fullWidth={fullWidth}
          disabled={disabled}
          required={required}
        />
      )}
    />
  );
}
