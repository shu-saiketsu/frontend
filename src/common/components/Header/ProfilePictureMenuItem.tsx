import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

type ProfilePictureMenuProps = {
  href: string;
  content: string;
  onClose: () => void;
};

export default function ProfilePictureMenuItem({
  href,
  content,
  onClose,
}: ProfilePictureMenuProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none", color: "inherit" }}
      passHref
    >
      <MenuItem onClick={onClose}>
        <Typography textAlign="center">{content}</Typography>
      </MenuItem>
    </Link>
  );
}
