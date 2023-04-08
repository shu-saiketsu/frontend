import Stack from "@mui/material/Stack";
import * as React from "react";

import AccountButton from "../buttons/AccountButton";
import CandidatesButton from "../buttons/CandidatesButton";
import ElectionsButton from "../buttons/ElectionsButton";
import GitHubButton from "../buttons/GitHubButton";
import LogoutButton from "../buttons/LogoutButton";
import OverviewButton from "../buttons/OverviewButton";
import PartiesButton from "../buttons/PartiesButton";
import UsersButton from "../buttons/UsersButton";
import SideBarSpacer from "../SideBarSpacer";

export default function VoterView() {
  return (
    <Stack mt={1} spacing={1}>
      <OverviewButton />
      <AccountButton />

      <SideBarSpacer name="System" />

      <ElectionsButton />
      <PartiesButton />
      <CandidatesButton />
      <UsersButton />

      <SideBarSpacer name="Utilities" />

      <GitHubButton />
      <LogoutButton />
    </Stack>
  );
}
