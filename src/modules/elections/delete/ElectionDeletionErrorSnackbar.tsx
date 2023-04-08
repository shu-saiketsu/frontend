import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

type ElectionDeletionConfirmationDialogueProps = {
  open: boolean;
  onClose: () => void;
};

export default function ElectionDeletionErrorSnackbar({
  open,
  onClose,
}: ElectionDeletionConfirmationDialogueProps) {
  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        An error occured whilst deleting this election.
      </Alert>
    </Snackbar>
  );
}
