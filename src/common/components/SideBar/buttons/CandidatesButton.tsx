import * as React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
