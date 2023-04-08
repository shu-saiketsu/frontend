import * as React from "react";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InfoCardItem from "@/common/components/InfoCardItem";
import { Election } from "@/common/types/Election";
import { ElectionTypeEnum } from "@/common/enums/ElectionTypeEnum";
import { SxProps } from "@mui/material";

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
