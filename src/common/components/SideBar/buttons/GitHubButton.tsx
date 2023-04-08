import GitHubIcon from "@mui/icons-material/GitHub";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function GitHubButton() {
  return (
    <SideBarButton
      content="GitHub"
      target="_blank"
      href="https://github.com/shu-saiketsu/"
      icon={<GitHubIcon />}
    />
  );
}
