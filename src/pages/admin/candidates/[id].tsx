import Grid from "@mui/material/Grid";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import { Candidate } from "@/common/types/Candidate";
import auth0 from "@/common/utils/auth0";
import CandidateActionButtons from "@/modules/candidates/CandidateActionButtons";
import CandidateBasicInfoCard from "@/modules/candidates/CandidateBasicInfoCard";
import CandidateDeletionConfirmationDialogue from "@/modules/candidates/delete/CandidateDeletionConfirmationDialogue";
import CandidateDeletionErrorSnackbar from "@/modules/candidates/delete/CandidateDeletionErrorSnackbar";
import { getCandidate } from "@/pages/api/candidates/[id]";

type ViewCandidateProps = {
  candidate: Candidate;
};

export default function ViewCandidate({ candidate }: ViewCandidateProps) {
  const router = useRouter();

  const id = Number(router.query.id);

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
    return router.push("/admin/candidates");
  };

  const handleDeletionFailure = () => {
    handleHideConfirmationDelete();
    handleShowDeletionErrorSnackbar();
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - Candidate ${id}`}</title>
      </Head>

      <PageTitle name="Candidate view portal" description="Viewing candidate" />

      <CandidateDeletionConfirmationDialogue
        candidateId={id}
        open={showDeleteConfirmation}
        onDelete={handleDelete}
        onDeleteFailure={handleDeletionFailure}
        onClose={handleHideConfirmationDelete}
      />

      <CandidateDeletionErrorSnackbar
        open={showDeletionErrorSnackbar}
        onClose={handleHideDeletionErrorSnackbar}
      />

      <Grid mt={2} spacing={2} container>
        <Grid item xs={12} lg={3}>
          <CandidateBasicInfoCard candidate={candidate} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <CandidateActionButtons onDelete={handleShowConfirmationDelete} />
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const id = Number(context.query.id);
    const { req, res } = context;

    try {
      if (Number.isNaN(id))
        return {
          redirect: {
            destination: "/",
          },
        };

      const { accessToken } = await auth0.getAccessToken(req, res);
      if (!accessToken)
        return {
          redirect: {
            destination: "/",
          },
        };

      const candidate = await getCandidate(accessToken, id);
      if (!candidate)
        return {
          redirect: {
            destination: "/admin/candidates",
          },
        };

      return { props: { candidate } };
    } catch (error) {
      return {
        redirect: {
          destination: "/admin/candidates",
        },
      };
    }
  },
} as any);
