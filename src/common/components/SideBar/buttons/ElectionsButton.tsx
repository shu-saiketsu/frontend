import * as React from "react";
import BallotIcon from "@mui/icons-material/Ballot";
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
