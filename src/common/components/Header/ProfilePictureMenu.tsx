import { useUser } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import * as React from "react";

import ProfilePictureAccountMenuItem from "./ProfilePictureAccountMenuItem";
import ProfilePictureMenuItem from "./ProfilePictureMenuItem";

type ProfilePictureMenuProps = {
  menuAnchor: null | HTMLElement;
  onClose: () => void;
};

export default function ProfilePictureMenu({
  onClose,
  menuAnchor,
}: ProfilePictureMenuProps) {
  const { user } = useUser();

  return (
    <Menu
      sx={{ mt: "50px" }}
      anchorEl={menuAnchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menuAnchor)}
      onClose={onClose}
    >
      {user && (
        <Box>
          <ProfilePictureAccountMenuItem user={user} />

          <Box mb={1}>
            <Divider />
          </Box>

          <ProfilePictureMenuItem
            href="/account"
            content="Account"
            onClose={onClose}
          />
        </Box>
      )}

      <ProfilePictureMenuItem
        href={user ? "/api/auth/logout" : "/api/auth/login"}
        content={user ? "Logout" : "Login"}
        onClose={onClose}
      />
    </Menu>
  );
}
