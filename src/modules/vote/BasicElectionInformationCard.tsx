import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Election } from "@/common/types/Election";

type BasicElectionInformationCard = {
  elections: Election[];
};

export default function BasicElectionInformationCard({
  elections,
}: BasicElectionInformationCard) {
  return (
    <Paper variant="outlined">
      <CardContent>
        <Typography variant="h6">Election Information</Typography>
        <Typography>
          You can vote in <strong>{elections.length}</strong>{" "}
          {elections.length === 0 || elections.length > 1
            ? "elections"
            : "election"}
          .
        </Typography>
      </CardContent>
    </Paper>
  );
}
