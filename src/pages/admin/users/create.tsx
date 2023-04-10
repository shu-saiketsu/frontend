import Box from "@mui/material/Box";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import auth0 from "@/common/utils/auth0";
import CreateUserForm from "@/modules/users/components/CreateUserForm";

export default function CreateUser() {
  const router = useRouter();

  const handleUserCreated = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  return (
    <>
      <Head>
        <title>Saiketsu - Create User</title>
      </Head>

      <PageTitle name="Create new user" description="Create new user process" />

      <Box mt={2}>
        <CreateUserForm onUserCreated={handleUserCreated} />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    try {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:users"],
      });

      if (!accessToken)
        return {
          redirect: {
            destination: "/",
          },
        };

      return { props: {} };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  },
} as any);
