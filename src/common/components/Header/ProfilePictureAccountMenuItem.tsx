import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { UserProfile } from "@auth0/nextjs-auth0/client";

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
