import { SxProps } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import InfoCardItem from "@/common/components/InfoCardItem";
import { Election } from "@/common/types/Election";

type ElectionStatusCardProps = {
  election: Election;
  sx?: SxProps;
};

export default function ElectionStatusCard({ sx }: ElectionStatusCardProps) {
  return (
    <Paper variant="outlined" sx={sx}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Election Status
        </Typography>

        <InfoCardItem title="Status content" content="XYZ" />
      </CardContent>
    </Paper>
  );
}
