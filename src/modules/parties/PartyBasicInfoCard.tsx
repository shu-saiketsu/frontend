import * as React from "react";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InfoCardItem from "@/common/components/InfoCardItem";
import { Party } from "@/common/types/Party";

type PartyBasicInfoCardProps = {
  party: Party;
};

export default function PartyBasicInfoCard({ party }: PartyBasicInfoCardProps) {
  return (
    <Paper variant="outlined" >
      <CardContent>
        <Typography variant="h6" mb={2}>
          Basic Details
        </Typography>

        <InfoCardItem title="Identifier" content={party.id} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Name" content={party.name} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Description" content={party.description} />
      </CardContent>
    </Paper>
  );
}
