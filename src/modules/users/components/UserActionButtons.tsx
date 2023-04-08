import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import VerifiedIcon from "@mui/icons-material/Verified";

type UserActionButtonsProps = {
  onDelete: () => void;
  onBlock: () => void;
  onVerify: () => void;
};

export default function UserActionButtons({
  onDelete,
  onBlock,
  onVerify,
}: UserActionButtonsProps) {
  return (
    <Stack spacing={2}>
      <Button
        size="large"
        variant="contained"
        onClick={onBlock}
        startIcon={<BlockIcon />}
        disabled
        fullWidth
      >
        Block User
      </Button>

      <Button
        size="large"
        variant="contained"
        onClick={onVerify}
        startIcon={<VerifiedIcon />}
        disabled
        fullWidth
      >
        Verify email
      </Button>

      <Button
        size="large"
        variant="outlined"
        color="error"
        onClick={onDelete}
        startIcon={<DeleteIcon />}
        fullWidth
      >
        Delete user
      </Button>
    </Stack>
  );
}
