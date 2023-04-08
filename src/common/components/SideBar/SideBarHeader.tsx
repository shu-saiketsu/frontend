import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export default function SideBarHeader() {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <HowToVoteIcon fontSize="large" />
        <Stack>
          <Typography variant="h6">Saiketsu</Typography>
          <Typography variant="body2">Production</Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
