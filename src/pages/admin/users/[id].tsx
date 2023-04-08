import * as React from "react";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import auth0 from "@/common/utils/auth0";
import { GetServerSidePropsContext } from "next";
import { User } from "@/common/types/User";

import { getUser } from "@/pages/api/users/[id]";
import UserDeletionConfirmationDialogue from "@/modules/users/components/delete/UserDeletionConfirmationDialogue";
import UserDeletionErrorSnackbar from "@/modules/users/components/delete/UserDeletionErrorSnackbar";
import UserBasicInfoCard from "@/modules/users/components/UserBasicInfoCard";
import UserActionButtons from "@/modules/users/components/UserActionButtons";

type ViewUserProps = {
  dataUser: User;
};

export default function ViewUser({ dataUser }: ViewUserProps) {
  const router = useRouter();

  let id = router.query.id as string;

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
    return router.push("/admin/users");
  };

  const handleDeletionFailure = () => {
    handleHideConfirmationDelete();
    handleShowDeletionErrorSnackbar();
  };

  return (
    <>
      <Head>
        <title>{`Saiketsu - User ${id}`}</title>
      </Head>

      <PageTitle name="User view portal" description="Viewing user" />

      <UserDeletionConfirmationDialogue
        userId={id}
        open={showDeleteConfirmation}
        onDelete={handleDelete}
        onDeleteFailure={handleDeletionFailure}
        onClose={handleHideConfirmationDelete}
      />

      <UserDeletionErrorSnackbar
        open={showDeletionErrorSnackbar}
        onClose={handleHideDeletionErrorSnackbar}
      />

      <Grid mt={2} spacing={2} container>
        <Grid item xs={12} lg={3}>
          <UserBasicInfoCard user={dataUser} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <UserActionButtons
            onDelete={handleShowConfirmationDelete}
            onBlock={() => console.log("not implemented")}
            onVerify={() => console.log("not implemented")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.query.id;

    if (typeof id !== "string")
      return {
        redirect: {
          destination: "/",
        },
      };

    const { req, res } = context;
    const { accessToken } = await auth0.getAccessToken(req, res, {
      scopes: ["read:users"],
    });

    if (!accessToken)
      return {
        redirect: {
          destination: "/",
        },
      };

    const dataUser = await getUser(accessToken, id);
    if (!dataUser)
      return {
        redirect: {
          destination: "/admin/users",
        },
      };

    return { props: { dataUser } };
  },
} as any);
