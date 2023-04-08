import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function LoginButton() {
  return (
    <SideBarButton
      content="Login"
      href="/api/auth/login"
      icon={<LoginIcon />}
    />
  );
}
