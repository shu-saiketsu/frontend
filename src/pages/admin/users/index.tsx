import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";

import DataFetchAlertError from "@/common/components/DataFetchAlertError";
import PageTitle from "@/common/components/PageTitle";
import { User } from "@/common/types/User";
import auth0 from "@/common/utils/auth0";
import UserDataGrid from "@/modules/users/components/UserDataGrid";
import { getUsers } from "@/pages/api/users";

type IndexUsersProps = {
  users?: User[];
};

export default function IndexUsers({ users }: IndexUsersProps) {
  let displayContentType;

  if (users) {
    displayContentType = <UserDataGrid rows={users} />;
  } else {
    displayContentType = <DataFetchAlertError />;
  }

  return (
    <>
      <Head>
        <title>Saiketsu - Users</title>
      </Head>

      <PageTitle name="Users" description="Viewing all users" />

      <Box mt={2}>{displayContentType}</Box>

      <Box mt={2}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          href="/admin/users/create"
          size="large"
          fullWidth
        >
          Create User
        </Button>
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
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

    const users = await getUsers(accessToken);
    if (!users) return { props: {} };

    return { props: { users } };
  },
} as any);
