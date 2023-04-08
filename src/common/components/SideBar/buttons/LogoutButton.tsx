import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function LogoutButton() {
  return (
    <SideBarButton
      content="Logout"
      href="/api/auth/logout"
      icon={<LogoutIcon />}
    />
  );
}
