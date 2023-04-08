import BallotIcon from "@mui/icons-material/Ballot";
import * as React from "react";

import SideBarButton from "../SideBarButton";

export default function VoteButton() {
  return <SideBarButton content="Vote" href="/vote" icon={<BallotIcon />} />;
}
