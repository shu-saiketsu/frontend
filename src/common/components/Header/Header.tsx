import { useUser } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";

import ProfilePicture from "./ProfilePicture";

export default function Header() {
  const { user } = useUser();

  return (
    <Grid container p={1}>
      <Grid item sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="flex-end">
          <ProfilePicture user={user} />
        </Box>
      </Grid>
    </Grid>
  );
}
