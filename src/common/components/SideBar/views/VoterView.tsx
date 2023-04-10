import Stack from "@mui/material/Stack";
import * as React from "react";

import AccountButton from "../buttons/AccountButton";
import GitHubButton from "../buttons/GitHubButton";
import LogoutButton from "../buttons/LogoutButton";
import OverviewButton from "../buttons/OverviewButton";
import VoteButton from "../buttons/VoteButton";
import SideBarSpacer from "../SideBarSpacer";

export default function VoterView() {
  return (
    <Stack mt={1} spacing={1}>
      <OverviewButton />
      <AccountButton />

      <SideBarSpacer name="System" />

      <VoteButton />

      <SideBarSpacer name="Utilities" />

      <GitHubButton />
      <LogoutButton />
    </Stack>
  );
}
