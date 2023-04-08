import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type InfoCardItemProps = {
  title: string;
  content: string | number | React.ReactElement;
};

export default function InfoCardItem({ title, content }: InfoCardItemProps) {
  return (
    <Box>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
