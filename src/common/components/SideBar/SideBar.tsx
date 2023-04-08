import { useUser } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import * as React from "react";

import { isUserInRole } from "@/common/utils/roleRetriever";

import SideBarHeader from "./SideBarHeader";
import AdministratorView from "./views/AdministratorView";
import VisitorView from "./views/VisitorView";
import VoterView from "./views/VoterView";

export default function SideBar() {
  const { user } = useUser();

  const isAdministrator = isUserInRole("Administrator", user);

  return (
    <Box padding={2}>
      <SideBarHeader />

      {user ? (
        isAdministrator ? (
          <AdministratorView />
        ) : (
          <VoterView />
        )
      ) : (
        <VisitorView />
      )}
    </Box>
  );
}
