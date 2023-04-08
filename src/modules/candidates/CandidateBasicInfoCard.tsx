import * as React from "react";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InfoCardItem from "@/common/components/InfoCardItem";
import { Candidate } from "@/common/types/Candidate";
import { Party } from "@/common/types/Party";
import Link from "next/link";

type CandidateBasicInfoCardProps = {
  candidate: Candidate;
};

type PartyLinkProps = {
  party: Party;
};

function PartyLink({ party }: PartyLinkProps) {
  return (
    <Link
      href={`/admin/parties/${party.id}`}
      style={{ textDecoration: "none" }}
    >
      {party.name}
    </Link>
  );
}

export default function CandidateBasicInfoCard({
  candidate,
}: CandidateBasicInfoCardProps) {
  return (
    <Paper variant="outlined">
      <CardContent>
        <Typography variant="h6" mb={2}>
          Basic Details
        </Typography>

        <InfoCardItem title="Identifier" content={candidate.id} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Name" content={candidate.name} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem
          title="Party"
          content={
            candidate.party ? <PartyLink party={candidate.party} /> : "N/A"
          }
        />
      </CardContent>
    </Paper>
  );
}
