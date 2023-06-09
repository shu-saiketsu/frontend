import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

type UserDeletionConfirmationDialogueProps = {
  open: boolean;
  onClose: () => void;
};

export default function UserDeletionErrorSnackbar({
  open,
  onClose,
}: UserDeletionConfirmationDialogueProps) {
  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        An error occured whilst deleting this user.
      </Alert>
    </Snackbar>
  );
}
