import GroupIcon from "@mui/icons-material/Group";
import Button from "@mui/material/Button";
import * as React from "react";

import { Party } from "@/common/types/Party";

import PartyInformationDialogue from "./PartyInformationDialog";

type PartyButtonProps = {
  party: Party;
};

export default function PartyButton({ party }: PartyButtonProps) {
  const [showPartyDialog, setPartyDialog] = React.useState<boolean>(false);

  const handleClose = () => {
    setPartyDialog(false);
  };

  const handleOpen = () => {
    setPartyDialog(true);
  };

  return (
    <>
      <PartyInformationDialogue
        preParty={party}
        onClose={handleClose}
        open={showPartyDialog}
      />
      <Button
        color="inherit"
        variant="text"
        startIcon={<GroupIcon />}
        sx={{ justifyContent: "flex-start" }}
        size="large"
        fullWidth
        onClick={handleOpen}
      >
        View {party.name}
      </Button>
    </>
  );
}
