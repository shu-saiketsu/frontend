import Stack from "@mui/material/Stack";
import * as React from "react";

import GitHubButton from "../buttons/GitHubButton";
import LoginButton from "../buttons/LoginButton";

export default function VisitorView() {
  return (
    <Stack mt={1} spacing={1}>
      <GitHubButton />
      <LoginButton />
    </Stack>
  );
}
