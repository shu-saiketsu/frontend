import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import useCandidate from "@/common/hooks/useCandidate";
import { Candidate } from "@/common/types/Candidate";
import { Election } from "@/common/types/Election";

import PartyButton from "./ViewPartyButton";
import VoteConfirmationDialog from "./VoteConfirmationDialog";

type VoteCandidateCardProps = {
  election: Election;
  preCandidate: Candidate;
  disabled: boolean;
  onSubmitting: () => void;
  onVoteSubmitted: () => void;
  onVoteError: () => void;
};

async function submitVote(electionId: number, candidateId: number) {
  const response = await fetch("/api/votes", {
    method: "POST",
    body: JSON.stringify({ electionId, candidateId }),
  });

  return response.status === 200;
}

export default function VoteCandidateCard({
  preCandidate,
  election,
  disabled,
  onVoteError,
  onVoteSubmitted,
  onSubmitting,
}: VoteCandidateCardProps) {
  const { candidate, isLoading } = useCandidate(preCandidate.id);
  const [confirmationVisible, setConfirmationVisible] =
    React.useState<boolean>(false);

  if (isLoading) return <Typography>Loading</Typography>;
  if (candidate === undefined) return <Typography>Candidate Error</Typography>;

  const handleVote = async () => {
    setConfirmationVisible(false);
    onSubmitting();

    const success = await submitVote(election.id, candidate.id);

    if (success) {
      onVoteSubmitted();
    } else {
      onVoteError();
    }
  };

  const handleConfirmationClosed = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmationOpen = () => {
    setConfirmationVisible(true);
  };

  return (
    <>
      <VoteConfirmationDialog
        candidateId={candidate.id}
        onClose={handleConfirmationClosed}
        onVote={handleVote}
        visible={confirmationVisible}
      />

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
              onClick={handleConfirmationOpen}
              disabled={disabled}
              fullWidth
            >
              Vote for {candidate.name}
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </>
  );
}
