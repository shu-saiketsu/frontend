import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { isUserInRole } from "@/common/utils/roleRetriever";

type AccountImageEmailRoleProps = {
  user: UserProfile;
};

export default function AccountImageEmailRole({
  user,
}: AccountImageEmailRoleProps) {
  const isAdministrator = isUserInRole("Administrator", user);

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Avatar
          src={user.picture ?? undefined}
          sx={{ width: 56, height: 56 }}
        />

        <Stack>
          <Typography variant="h6">{user.email}</Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ textTransform: "uppercase" }}
          >
            {isAdministrator ? "Administrator" : "Voter"}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
