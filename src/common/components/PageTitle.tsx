import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

type PageTitleProps = {
  name: string;
  description: string;
};

export default function PageTitle({ name, description }: PageTitleProps) {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          whiteSpace: "nowrap",
        }}
        variant="subtitle1"
      >
        {description}
      </Typography>
    </Box>
  );
}
