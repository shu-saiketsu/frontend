import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

async function deleteCandidate(id: number) {
  const response = await fetch(`/api/candidates/${id}`, { method: "DELETE" });

  return response.status === 200;
}

type CandidateDeletionConfirmationDialogueProps = {
  candidateId: number;
  open: boolean;
  onDelete: () => void;
  onDeleteFailure: () => void;
  onClose: () => void;
};

export default function CandidateDeletionConfirmationDialogue({
  candidateId,
  open,
  onDelete,
  onDeleteFailure,
  onClose,
}: CandidateDeletionConfirmationDialogueProps) {
  const handleClick = async () => {
    const response = await deleteCandidate(candidateId);

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
          Are you sure you would like to delete this candidate? Once deleted, it
          <strong> cannot</strong> be recovered.
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClick}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
