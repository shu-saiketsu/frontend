import * as React from "react";
import Typography from "@mui/material/Typography";

type SideBarSpacerTypes = {
  name: string;
};

export default function SideBarSpacer({ name }: SideBarSpacerTypes) {
  return (
    <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
      <strong>{name}</strong>
    </Typography>
  );
}
