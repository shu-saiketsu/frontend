import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "next/link";

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
    <MenuItem onClick={onClose}>
      <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography textAlign="center">{content}</Typography>
      </Link>
    </MenuItem>
  );
}
