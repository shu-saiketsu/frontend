import { UserProfile } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

type ProfilePictureAccountMenuItemProps = {
  user: UserProfile;
};

export default function ProfilePictureAccountMenuItem({
  user,
}: ProfilePictureAccountMenuItemProps) {
  return (
    <Box p={2}>
      <Stack>
        <Typography variant="h6">{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Stack>
    </Box>
  );
}
