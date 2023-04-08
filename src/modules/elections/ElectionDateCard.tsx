import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import * as React from "react";

import InfoCardItem from "@/common/components/InfoCardItem";
import { Election } from "@/common/types/Election";

type ElectionDateCardProps = {
  election: Election;
  sx?: SxProps;
};

export default function ElectionDateCard({
  election,
  sx,
}: ElectionDateCardProps) {
  const [startDate, setStartDate] = React.useState<null | string>(null);
  const [endDate, setEndDate] = React.useState<null | string>(null);

  React.useEffect(() => {
    setStartDate(DateTime.fromISO(election.startDate).toLocaleString());
    setEndDate(DateTime.fromISO(election.endDate).toLocaleString());
  }, [election.startDate, election.endDate]);

  return (
    <Paper variant="outlined" sx={sx}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Date Details
        </Typography>

        <InfoCardItem title="Start Date" content={startDate ?? "N/A"} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="End Date" content={endDate ?? "N/A"} />
      </CardContent>
    </Paper>
  );
}
