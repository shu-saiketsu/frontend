import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

import useParty from "@/common/hooks/useParty";
import { Party } from "@/common/types/Party";

type PartyInformationDialogueProps = {
  preParty: Party;
  onClose: () => void;
  open: boolean;
};

export default function PartyInformationDialogue({
  preParty,
  onClose,
  open,
}: PartyInformationDialogueProps) {
  const { party } = useParty(preParty.id);

  if (!party) return <p>Party Error</p>;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{party.name}</DialogTitle>
      <DialogContent>{party.description}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
