import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import InfoCardItem from "@/common/components/InfoCardItem";
import { ElectionTypeEnum } from "@/common/enums/ElectionTypeEnum";
import { Election } from "@/common/types/Election";

type ElectionBasicInfoCardProps = {
  election: Election;
  sx?: SxProps;
};

export default function ElectionBasicInfoCard({
  election,
  sx,
}: ElectionBasicInfoCardProps) {
  return (
    <Paper variant="outlined" sx={sx}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Basic Details
        </Typography>

        <InfoCardItem title="Identifier" content={election.id} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Name" content={election.name} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Owner" content={election.ownerId} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem
          title="Type"
          content={ElectionTypeEnum[election.typeId]}
        />
      </CardContent>
    </Paper>
  );
}
