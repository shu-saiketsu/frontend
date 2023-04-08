import * as React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

type CheckboxControllerProps = {
  control: any;
  rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: string;
  name: string;
  disabled?: boolean;
};

export default function CheckboxController({
  control,
  rules,
  label,
  name,
  disabled,
}: CheckboxControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box>
          <FormControlLabel
            control={<Checkbox onChange={onChange} value={value} />}
            label={label}
            disabled={disabled}
            sx={{ color: error ? "error.main" : "text.primary" }}
          />

          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Box>
      )}
    />
  );
}
