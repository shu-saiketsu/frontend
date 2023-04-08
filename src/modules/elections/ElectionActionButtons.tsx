import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type ElectionActionButtonsProps = {
  onDelete: () => void;
  onAddUser: () => void;
  onAddCandidate: () => void;
};

export default function ElectionActionButtons({
  onDelete,
  onAddCandidate,
  onAddUser,
}: ElectionActionButtonsProps) {
  return (
    <Stack spacing={2}>
      <Button
        size="large"
        variant="contained"
        onClick={onAddUser}
        startIcon={<PersonAddIcon />}
        fullWidth
      >
        Add user to election
      </Button>

      <Button
        size="large"
        variant="contained"
        onClick={onAddCandidate}
        startIcon={<PersonAddIcon />}
        fullWidth
      >
        Add candidate to election
      </Button>

      <Button
        size="large"
        variant="outlined"
        color="error"
        onClick={onDelete}
        startIcon={<DeleteIcon />}
        fullWidth
      >
        Delete election
      </Button>
    </Stack>
  );
}
