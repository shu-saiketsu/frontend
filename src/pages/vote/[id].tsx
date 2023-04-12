import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import { Candidate } from "@/common/types/Candidate";
import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";
import ElectionBasicInfoCard from "@/modules/elections/ElectionBasicInfoCard";
import VoteCandidateCard from "@/modules/vote/VoteCandidateCard";

import { getElection } from "../api/elections/[electionId]";
import { getElectionCandidates } from "../api/elections/[electionId]/candidates";

type VotePageProps = {
  election: Election;
  electionCandidates: Candidate[];
};

export default function VotePage({
  election,
  electionCandidates,
}: VotePageProps) {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const router = useRouter();

  const handleSubmitting = () => {
    setSubmitting(true);
    router.push("/");
  };

  const handleVoteSubmitted = () => {
    setSubmitting(false);
  };

  const handleVoteError = () => {
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - Vote ${election.id}`}</title>
      </Head>

      <PageTitle
        name="Vote"
        description={`Vote page for election ${election.name}`}
      />

      <Box mt={1}>
        <ElectionBasicInfoCard election={election} />
      </Box>

      <Box mt={1}>
        <Paper variant="outlined">
          <Box ml={2} mt={2}>
            <Typography variant="h6">Candidates</Typography>
            <Typography>Candidates eligible to be selected.</Typography>
          </Box>

          <Grid container p={2} spacing={2}>
            {electionCandidates.map((candidate) => {
              return (
                <Grid key={candidate.id} xs={12} item>
                  <VoteCandidateCard
                    onVoteSubmitted={handleVoteSubmitted}
                    onSubmitting={handleSubmitting}
                    onVoteError={handleVoteError}
                    election={election}
                    preCandidate={candidate}
                    disabled={submitting}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const id = Number(context.query.id);
    const { req, res } = context;

    if (Number.isNaN(id))
      return {
        redirect: {
          destination: "/",
        },
      };

    try {
      const { accessToken } = await auth0.getAccessToken(req, res);
      if (!accessToken)
        return {
          redirect: {
            destination: "/",
          },
        };

      const election = await getElection(accessToken, id);
      const electionCandidates = await getElectionCandidates(accessToken, id);

      if (!election || !electionCandidates)
        return {
          redirect: {
            destination: "/",
          },
        };

      return { props: { election, electionCandidates } };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  },
} as any);
