import Typography from "@mui/material/Typography";
import * as React from "react";

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
