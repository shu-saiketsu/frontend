import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";

import TextFieldController from "@/common/components/Form/TextFieldController";

async function addUserToElection(electionId: number, userId: string) {
  const response = await fetch(`/api/elections/${electionId}/users/${userId}`, {
    method: "POST",
  });

  return response.status === 200;
}

type AddUserDialogueFormProps = {
  electionId: number;
  open: boolean;
  onAdded: () => void;
  onClose: () => void;
};

type FormData = {
  userId: string;
};

export default function AddUserDialogueForm({
  electionId,
  open,
  onAdded,
  onClose,
}: AddUserDialogueFormProps) {
  const { handleSubmit, control, reset, setError } = useForm<FormData>();

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleOnClose = () => {
    reset({ userId: "" });
    if (!submitting) return onClose();
  };

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitting(true);

    const success = await addUserToElection(electionId, formData.userId);
    if (success) {
      setSubmitting(false);
      return onAdded();
    }

    setSubmitting(false);
    setError("userId", {
      message: "Unable to add. Does the user already exist?",
      type: "server",
    });
  });

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the user&apos;s identifier to add them to this election.
        </DialogContentText>
        <Box mt={2}>
          <TextFieldController
            control={control}
            name="userId"
            type="text"
            label="User Identifier"
            fullWidth={true}
            disabled={submitting}
            required={true}
          />
        </Box>

        <DialogActions>
          <Button onClick={onSubmit} disabled={submitting}>
            Add to election
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
