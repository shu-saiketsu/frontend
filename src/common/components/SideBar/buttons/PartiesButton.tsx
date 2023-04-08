import * as React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SideBarButton from "../SideBarButton";

export default function PartiesButton() {
  return (
    <SideBarButton content="Parties" href="/admin/parties" icon={<GroupAddIcon />} />
  );
}
