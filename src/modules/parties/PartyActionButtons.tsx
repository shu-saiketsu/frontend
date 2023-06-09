import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";

type PartyActionButtonsProps = {
  onDelete: () => void;
};

export default function PartyActionButtons({
  onDelete,
}: PartyActionButtonsProps) {
  return (
    <Stack spacing={2}>
      <Button
        size="large"
        variant="outlined"
        color="error"
        onClick={onDelete}
        startIcon={<DeleteIcon />}
        fullWidth
      >
        Delete party
      </Button>
    </Stack>
  );
}
