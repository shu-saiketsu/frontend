import * as React from "react";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import auth0 from "@/common/utils/auth0";
import { GetServerSidePropsContext } from "next";

import { getElection } from "@/pages/api/elections/[id]";
import { Election } from "@/common/types/Election";
import ElectionBasicInfoCard from "@/modules/elections/ElectionBasicInfoCard";
import ElectionCandidateDataGrid from "@/modules/elections/grids/ElectionCandidateDataGrid";
import { getElectionCandidates } from "@/pages/api/elections/[id]/candidates";
import { Candidate } from "@/common/types/Candidate";
import ElectionUserDataGrid from "@/modules/elections/grids/ElectionUserDataGrid";
import { getElectionUsers } from "@/pages/api/elections/[id]/users";
import { User } from "@/common/types/User";
import ElectionActionButtons from "@/modules/elections/ElectionActionButtons";
import ElectionDeletionConfirmationDialogue from "@/modules/elections/delete/ElectionDeletionConfirmationDialogue";
import ElectionDeletionErrorSnackbar from "@/modules/elections/delete/ElectionDeletionErrorSnackbar";
import ElectionDateCard from "@/modules/elections/ElectionDateCard";
import ElectionStatusCard from "@/modules/elections/ElectionStatusCard";

type ViewElectionProps = {
  election: Election;
  electionCandidates: Candidate[];
  electionUsers: User[];
};

export default function ViewElection({
  election,
  electionCandidates,
  electionUsers,
}: ViewElectionProps) {
  const router = useRouter();

  let id = Number(router.query.id);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState<boolean>(false);

  const [showDeletionErrorSnackbar, setShowDeletionErrorSnackbar] =
    React.useState<boolean>(false);

  const handleShowConfirmationDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleHideConfirmationDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleShowDeletionErrorSnackbar = () => {
    setShowDeletionErrorSnackbar(true);
  };

  const handleHideDeletionErrorSnackbar = () => {
    setShowDeletionErrorSnackbar(false);
  };

  const handleDelete = async () => {
    return router.push("/admin/elections");
  };

  const handleDeletionFailure = () => {
    handleHideConfirmationDelete();
    handleShowDeletionErrorSnackbar();
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - Election ${id}`}</title>
      </Head>

      <PageTitle name="Election view portal" description="Viewing election" />

      <ElectionDeletionConfirmationDialogue
        electionId={id}
        open={showDeleteConfirmation}
        onDelete={handleDelete}
        onDeleteFailure={handleDeletionFailure}
        onClose={handleHideConfirmationDelete}
      />

      <ElectionDeletionErrorSnackbar
        open={showDeletionErrorSnackbar}
        onClose={handleHideDeletionErrorSnackbar}
      />

      <Grid container mt={2} spacing={2}>
        <Grid item xs={3}>
          <ElectionDateCard election={election} />
        </Grid>
        <Grid item xs={9}>
          <ElectionStatusCard election={election} sx={{ height: 1 }} />
        </Grid>
      </Grid>

      <Box mt={2}></Box>

      <Grid mt={2} spacing={2} container>
        <Grid item xs={12} lg={3}>
          <ElectionBasicInfoCard election={election} sx={{ height: "100%" }} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <ElectionCandidateDataGrid rows={electionCandidates} />
        </Grid>
      </Grid>

      <Box mt={2}>
        <ElectionUserDataGrid rows={electionUsers} />
      </Box>

      <Box mt={2}>
        <ElectionActionButtons
          onDelete={handleShowConfirmationDelete}
          onAddCandidate={() => console.log("not implemented")}
          onAddUser={() => console.log("not implemented")}
        />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const id = Number(context.query.id);

    if (Number.isNaN(id))
      return {
        redirect: {
          destination: "/",
        },
      };

    const { req, res } = context;
    const { accessToken } = await auth0.getAccessToken(req, res, {
      scopes: ["read:elections"],
    });

    if (!accessToken)
      return {
        redirect: {
          destination: "/",
        },
      };

    const election = await getElection(accessToken, id);
    const electionCandidates = await getElectionCandidates(accessToken, id);
    const electionUsers = await getElectionUsers(accessToken, id);

    if (!election || !electionCandidates || !electionUsers)
      return {
        redirect: {
          destination: "/admin/elections",
        },
      };

    return { props: { election, electionCandidates, electionUsers } };
  },
} as any);
