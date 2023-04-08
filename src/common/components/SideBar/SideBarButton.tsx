import Button from "@mui/material/Button";
import { useRouter } from "next/dist/client/router";
import * as React from "react";

type SideButtonProps = {
  content: string;
  href: string;
  target?: string;
  icon?: React.ReactNode;
};

export default function SideBarButton({
  content,
  target,
  href,
  icon,
}: SideButtonProps) {
  const router = useRouter();

  const isOnPage = router.pathname === href;

  return (
    <Button
      href={href}
      target={target}
      fullWidth
      startIcon={icon}
      sx={{
        justifyContent: "flex-start",
        color: isOnPage ? "text.primary" : "text.secondary",
        textTransform: "none",
      }}
    >
      {content}
    </Button>
  );
}
