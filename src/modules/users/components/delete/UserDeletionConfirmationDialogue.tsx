import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

async function deleteUser(id: string) {
  const response = await fetch(`/api/users/${id}`, { method: "DELETE" });

  return response.status === 200;
}

type UserDeletionConfirmationDialogueProps = {
  userId: string;
  open: boolean;
  onDelete: () => void;
  onDeleteFailure: () => void;
  onClose: () => void;
};

export default function UserDeletionConfirmationDialogue({
  userId,
  open,
  onDelete,
  onDeleteFailure,
  onClose,
}: UserDeletionConfirmationDialogueProps) {
  const handleClick = async () => {
    let response = await deleteUser(userId);

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
          Are you sure you would like to delete this user? Once deleted, it
          <strong> cannot</strong> be recovered.
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClick}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
