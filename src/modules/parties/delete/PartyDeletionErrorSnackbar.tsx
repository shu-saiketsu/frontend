import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type PartyDeletionConfirmationDialogueProps = {
  open: boolean;
  onClose: () => void;
};

export default function PartyDeletionErrorSnackbar({
  open,
  onClose,
}: PartyDeletionConfirmationDialogueProps) {
  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        An error occured whilst deleting this party.
      </Alert>
    </Snackbar>
  );
}
