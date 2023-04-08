import GroupAddIcon from "@mui/icons-material/GroupAdd";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function PartiesButton() {
  return (
    <SideBarButton
      content="Parties"
      href="/admin/parties"
      icon={<GroupAddIcon />}
    />
  );
}
