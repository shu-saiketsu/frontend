import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type CandidateActionButtonsProps = {
  onDelete: () => void;
};

export default function CandidateActionButtons({
  onDelete,
}: CandidateActionButtonsProps) {
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
        Delete candidate
      </Button>
    </Stack>
  );
}
