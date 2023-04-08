import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

async function deleteElection(id: number) {
  const response = await fetch(`/api/elections/${id}`, { method: "DELETE" });

  return response.status === 200;
}

type ElectionDeletionConfirmationDialogueProps = {
  electionId: number;
  open: boolean;
  onDelete: () => void;
  onDeleteFailure: () => void;
  onClose: () => void;
};

export default function ElectionDeletionConfirmationDialogue({
  electionId: partyId,
  open,
  onDelete,
  onDeleteFailure,
  onClose,
}: ElectionDeletionConfirmationDialogueProps) {
  const handleClick = async () => {
    let response = await deleteElection(partyId);

    if (response) {
      return onDelete();
    }

    return onDeleteFailure();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deletion Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you would like to delete this election? Once deleted, it
          <strong> cannot</strong> be recovered.
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClick}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
