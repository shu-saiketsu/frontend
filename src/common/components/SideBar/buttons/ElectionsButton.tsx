import BallotIcon from "@mui/icons-material/Ballot";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function ElectionsButton() {
  return (
    <SideBarButton
      content="Elections"
      href="/admin/elections"
      icon={<BallotIcon />}
    />
  );
}
