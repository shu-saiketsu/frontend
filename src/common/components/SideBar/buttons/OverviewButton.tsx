import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function OverviewButton() {
  return <SideBarButton content="Overview" href="/" icon={<HomeIcon />} />;
}
