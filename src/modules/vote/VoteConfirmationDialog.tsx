import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

import useCandidate from "@/common/hooks/useCandidate";

type VoteConfirmationDialogProps = {
  candidateId: number;
  onVote: () => void;
  onClose: () => void;
  visible: boolean;
};

export default function VoteConfirmationDialog({
  candidateId,
  onVote,
  onClose,
  visible,
}: VoteConfirmationDialogProps) {
  const { candidate } = useCandidate(candidateId);

  if (!candidate) return <p>Candidate Error</p>;

  return (
    <Dialog onClose={onClose} open={visible}>
      <DialogTitle>Voting confirmation for {candidate.name}</DialogTitle>
      <DialogContent>
        Are you sure you&apos;d like to vote for {candidate.name}? This action
        is irreversible.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onVote}>Vote</Button>
      </DialogActions>
    </Dialog>
  );
}
