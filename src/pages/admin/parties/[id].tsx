import Grid from "@mui/material/Grid";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import { Party } from "@/common/types/Party";
import auth0 from "@/common/utils/auth0";
import PartyDeletionConfirmationDialogue from "@/modules/parties/delete/PartyDeletionConfirmationDialogue";
import PartyDeletionErrorSnackbar from "@/modules/parties/delete/PartyDeletionErrorSnackbar";
import PartyActionButtons from "@/modules/parties/PartyActionButtons";
import PartyBasicInfoCard from "@/modules/parties/PartyBasicInfoCard";
import { getParty } from "@/pages/api/parties/[id]";

type ViewPartyProps = {
  party: Party;
};

export default function ViewParty({ party }: ViewPartyProps) {
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
    return router.push("/admin/parties");
  };

  const handleDeletionFailure = () => {
    handleHideConfirmationDelete();
    handleShowDeletionErrorSnackbar();
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - Party ${id}`}</title>
      </Head>

      <PartyDeletionConfirmationDialogue
        partyId={id}
        open={showDeleteConfirmation}
        onDelete={handleDelete}
        onDeleteFailure={handleDeletionFailure}
        onClose={handleHideConfirmationDelete}
      />

      <PartyDeletionErrorSnackbar
        open={showDeletionErrorSnackbar}
        onClose={handleHideDeletionErrorSnackbar}
      />

      <PageTitle name="Party view portal" description="Viewing party" />

      <Grid mt={2} spacing={2} container>
        <Grid item xs={12} lg={3}>
          <PartyBasicInfoCard party={party} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <PartyActionButtons onDelete={handleShowConfirmationDelete} />
        </Grid>
      </Grid>
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
      scopes: ["read:parties"],
    });

    if (!accessToken)
      return {
        redirect: {
          destination: "/",
        },
      };

    const party = await getParty(accessToken, id);
    if (!party)
      return {
        redirect: {
          destination: "/admin/parties",
        },
      };

    return { props: { party } };
  },
} as any);
