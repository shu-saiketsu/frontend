import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ProfilePictureMenu from "./ProfilePictureMenu";
import { UserProfile } from "@auth0/nextjs-auth0/client";

function getPicture(user?: UserProfile) {
  if (!user) return undefined;

  return user.picture || undefined;
}

type ProfilePictureProps = {
  user?: UserProfile;
};

export default function ProfilePicture({ user }: ProfilePictureProps) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Avatar
          imgProps={{ referrerPolicy: "no-referrer" }}
          src={getPicture(user)}
        />
      </IconButton>

      <ProfilePictureMenu menuAnchor={menuAnchor} onClose={handleCloseMenu} />
    </>
  );
}
