import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type PageTitleProps = {
  name: string;
  description: string;
};

export default function PageTitle({ name, description }: PageTitleProps) {
  return (
    <Box>
      <Typography
        variant="h4"
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
        variant="subtitle2"
      >
        {description}
      </Typography>
    </Box>
  );
}
