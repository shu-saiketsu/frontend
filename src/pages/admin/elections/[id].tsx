import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import { Candidate } from "@/common/types/Candidate";
import { Election } from "@/common/types/Election";
import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";
import ElectionDeletionConfirmationDialogue from "@/modules/elections/delete/ElectionDeletionConfirmationDialogue";
import ElectionDeletionErrorSnackbar from "@/modules/elections/delete/ElectionDeletionErrorSnackbar";
import ElectionActionButtons from "@/modules/elections/ElectionActionButtons";
import ElectionBasicInfoCard from "@/modules/elections/ElectionBasicInfoCard";
import ElectionDateCard from "@/modules/elections/ElectionDateCard";
import ElectionStatusCard from "@/modules/elections/ElectionStatusCard";
import ElectionCandidateDataGrid from "@/modules/elections/grids/ElectionCandidateDataGrid";
import ElectionUserDataGrid from "@/modules/elections/grids/ElectionUserDataGrid";
import AddCandidateDialogueForm from "@/modules/elections/update/AddCandidateDialogueForm";
import AddUserDialogueForm from "@/modules/elections/update/AddUserDialogueForm";
import { getElection } from "@/pages/api/elections/[electionId]";
import { getElectionCandidates } from "@/pages/api/elections/[electionId]/candidates";
import { getElectionUsers } from "@/pages/api/elections/[electionId]/users";

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

  const id = Number(router.query.id);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState<boolean>(false);

  const [showDeletionErrorSnackbar, setShowDeletionErrorSnackbar] =
    React.useState<boolean>(false);

  const [showCandidateDialogue, setShowCandidateDialogue] =
    React.useState<boolean>(false);

  const [showUserDialogue, setShowUserDialogue] =
    React.useState<boolean>(false);

  const handleCandidateAddedSuccessfully = () => {
    setShowCandidateDialogue(false);
    router.replace(router.asPath);
  };

  const handleUserAddedSuccessfully = () => {
    setShowUserDialogue(false);
    router.replace(router.asPath);
  };

  const handleOnUserDeleted = () => {
    router.replace(router.asPath);
  };

  const handleOnCandidateDeleted = () => {
    router.replace(router.asPath);
  };

  const handleShowCandidateDialogue = () => {
    setShowCandidateDialogue(true);
  };

  const handleShowUserDialogue = () => {
    setShowUserDialogue(true);
  };

  const handleHideCandidateDialogue = () => {
    setShowCandidateDialogue(false);
  };

  const handleHideUserDialogue = () => {
    setShowUserDialogue(false);
  };

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

  const handleDeletionFailure = () => {
    handleHideConfirmationDelete();
    handleShowDeletionErrorSnackbar();
  };

  const handleDelete = async () => {
    return router.push("/admin/elections");
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - Election ${id}`}</title>
      </Head>

      <PageTitle name="Election view portal" description="Viewing election" />

      <>
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
      </>

      <AddCandidateDialogueForm
        electionId={id}
        open={showCandidateDialogue}
        onAdded={handleCandidateAddedSuccessfully}
        onClose={handleHideCandidateDialogue}
      />

      <AddUserDialogueForm
        electionId={id}
        open={showUserDialogue}
        onAdded={handleUserAddedSuccessfully}
        onClose={handleHideUserDialogue}
      />

      <Grid mt={0.5} spacing={2} container>
        <Grid item xs={12} md={3}>
          <ElectionDateCard election={election} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ElectionStatusCard election={election} sx={{ height: 1 }} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <ElectionBasicInfoCard election={election} sx={{ height: "100%" }} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <ElectionCandidateDataGrid
            electionId={id}
            rows={electionCandidates}
            onCandidateDeleted={handleOnCandidateDeleted}
          />
        </Grid>
        <Grid item xs={12}>
          <ElectionUserDataGrid
            electionId={id}
            rows={electionUsers}
            onUserDeleted={handleOnUserDeleted}
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <ElectionActionButtons
          onDelete={handleShowConfirmationDelete}
          onAddCandidate={handleShowCandidateDialogue}
          onAddUser={handleShowUserDialogue}
        />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    const id = Number(context.query.id);

    if (Number.isNaN(id))
      return {
        redirect: {
          destination: "/",
        },
      };

    try {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:elections"],
      });

      if (!accessToken)
        return {
          redirect: {
            destination: "/",
          },
        };

      const election = await getElection(id);
      const electionCandidates = await getElectionCandidates(id);
      const electionUsers = await getElectionUsers(accessToken, id);

      if (!election || !electionCandidates || !electionUsers)
        return {
          redirect: {
            destination: "/admin/elections",
          },
        };

      return { props: { election, electionCandidates, electionUsers } };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  },
} as any);
