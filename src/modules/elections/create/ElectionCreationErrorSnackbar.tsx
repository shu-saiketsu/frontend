import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type ElectionCreationErrorSnackbarProps = {
  open: boolean;
  onClose: () => void;
};

export default function ElectionCreationErrorSnackbar({
  open,
  onClose,
}: ElectionCreationErrorSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        An error occured whilst creating the election.
      </Alert>
    </Snackbar>
  );
}
