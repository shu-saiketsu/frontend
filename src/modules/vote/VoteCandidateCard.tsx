import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import useCandidate from "@/common/hooks/useCandidate";
import { Candidate } from "@/common/types/Candidate";

import PartyButton from "./ViewPartyButton";

type VoteCandidateCardProps = {
  preCandidate: Candidate;
};

export default function VoteCandidateCard({
  preCandidate,
}: VoteCandidateCardProps) {
  const { candidate, isLoading } = useCandidate(preCandidate.id);

  if (isLoading) return <Typography>Loading</Typography>;

  if (candidate === undefined) return <Typography>Candidate Error</Typography>;

  return (
    <Paper variant="outlined">
      <CardContent>
        <Typography variant="h6">{candidate.name}</Typography>
        <Typography variant="subtitle1">
          {candidate.party ? (
            <PartyButton party={candidate.party} />
          ) : (
            "Independent Candidate"
          )}
        </Typography>
        <Box mt={1}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<HowToVoteIcon />}
            fullWidth
          >
            Vote for {candidate.name}
          </Button>
        </Box>
      </CardContent>
    </Paper>
  );
}
