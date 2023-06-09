import PeopleIcon from "@mui/icons-material/People";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function UsersButton() {
  return (
    <SideBarButton content="Users" href="/admin/users" icon={<PeopleIcon />} />
  );
}
