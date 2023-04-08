import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function CandidatesButton() {
  return (
    <SideBarButton
      content="Candidates"
      href="/admin/candidates"
      icon={<PersonAddIcon />}
    />
  );
}
