import * as React from "react";
import Box from "@mui/material/Box";
import SideBarHeader from "./SideBarHeader";

import { useUser } from "@auth0/nextjs-auth0/client";
import { isUserInRole } from "@/common/utils/roleRetriever";
import AdministratorView from "./views/AdministratorView";
import VoterView from "./views/VoterView";
import VisitorView from "./views/VisitorView";

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
