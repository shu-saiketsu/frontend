import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";

import NumberTextFieldController from "@/common/components/Form/NumberTextFieldController";

async function addCandidateToElection(electionId: number, candidateId: number) {
  const response = await fetch(
    `/api/elections/${electionId}/candidates/${candidateId}`,
    { method: "POST" }
  );

  return response.status === 200;
}

type AddCandidateDialogueFormProps = {
  electionId: number;
  open: boolean;
  onAdded: () => void;
  onClose: () => void;
};

type FormData = {
  candidateId: number;
};

export default function AddCandidateDialogueForm({
  electionId,
  open,
  onAdded,
  onClose,
}: AddCandidateDialogueFormProps) {
  const { handleSubmit, control, reset, setError } = useForm<FormData>();

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleOnClose = () => {
    reset({ candidateId: 0 });
    if (!submitting) return onClose();
  };

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitting(true);

    const success = await addCandidateToElection(
      electionId,
      formData.candidateId
    );
    if (success) {
      setSubmitting(false);
      return onAdded();
    }

    setSubmitting(false);
    setError("candidateId", {
      message: "Unable to add. Does the candidate already exist?",
      type: "server",
    });
  });

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogTitle>Add Candidate</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the candidiates numeric identifier to add them to this election.
        </DialogContentText>
        <Box mt={2}>
          <NumberTextFieldController
            control={control}
            name="candidateId"
            label="Candidate Identifier"
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
