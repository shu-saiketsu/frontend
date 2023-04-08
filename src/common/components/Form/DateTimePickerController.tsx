import * as React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

type DateTimePickerProps = {
  control: any;
  label: string;
  name: string;
  rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export default function DateTimePickerController({
  control,
  rules,
  label,
  name,
}: DateTimePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <DatePicker
          label={label}
          sx={{ width: 1 }}
          onChange={onChange}
          value={value ?? ""}
          slotProps={{
            textField: {
              name,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
            },
          }}
        />
      )}
    />
  );
}
