import * as React from "react";
import Stack from "@mui/material/Stack";
import OverviewButton from "../buttons/OverviewButton";
import AccountButton from "../buttons/AccountButton";
import SideBarSpacer from "../SideBarSpacer";
import ElectionsButton from "../buttons/ElectionsButton";
import PartiesButton from "../buttons/PartiesButton";
import CandidatesButton from "../buttons/CandidatesButton";
import UsersButton from "../buttons/UsersButton";
import GitHubButton from "../buttons/GitHubButton";
import LogoutButton from "../buttons/LogoutButton";

export default function AdministratorView() {
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
