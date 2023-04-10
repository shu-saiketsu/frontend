import Box from "@mui/material/Box";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import auth0 from "@/common/utils/auth0";
import CreatePartyForm from "@/modules/parties/CreatePartyForm";

export default function CreateCandidate() {
  const router = useRouter();

  const handlePartyCreated = (partyId: number) => {
    router.push(`/admin/parties/${partyId}`);
  };

  return (
    <>
      <Head>
        <title>Saiketsu - Create Party</title>
      </Head>

      <PageTitle
        name="Create new party"
        description="Create new party process"
      />

      <Box mt={2}>
        <CreatePartyForm onPartyCreated={handlePartyCreated} />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    try {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:parties"],
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
