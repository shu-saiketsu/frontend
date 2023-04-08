import * as React from "react";
import Stack from "@mui/material/Stack";
import LoginButton from "../buttons/LoginButton";
import GitHubButton from "../buttons/GitHubButton";

export default function VisitorView() {
  return (
    <Stack mt={1} spacing={1}>
      <GitHubButton />
      <LoginButton />
    </Stack>
  );
}
