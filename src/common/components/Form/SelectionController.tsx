import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { Controller, RegisterOptions } from "react-hook-form";

type SelectionControllerProps = {
  selections: string[];
  name: string;
  control: any;
  rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: string;
  disabled?: boolean;
};

export default function SelectionController({
  selections,
  name,
  control,
  rules,
  label,
  disabled,
}: SelectionControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error?.message}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            label={label}
            onChange={onChange}
            value={value ?? ""}
            disabled={disabled}
          >
            {selections.map((selection) => (
              <MenuItem key={selection} value={selection}>
                {selection}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
