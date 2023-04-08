import * as React from "react";
import BallotIcon from "@mui/icons-material/Ballot";
import SideBarButton from "../SideBarButton";

export default function VoteButton() {
  return <SideBarButton content="Vote" href="/vote" icon={<BallotIcon />} />;
}
