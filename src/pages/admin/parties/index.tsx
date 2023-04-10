import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import * as React from "react";

import DataFetchAlertError from "@/common/components/DataFetchAlertError";
import PageTitle from "@/common/components/PageTitle";
import { Party } from "@/common/types/Party";
import auth0 from "@/common/utils/auth0";
import PartyDataGrid from "@/modules/parties/PartyDataGrid";
import { getParties } from "@/pages/api/parties";

type IndexPartiesProps = {
  parties: Party[];
};

export default function IndexParties({ parties }: IndexPartiesProps) {
  let displayContentType;

  if (parties) {
    displayContentType = <PartyDataGrid rows={parties} />;
  } else {
    displayContentType = <DataFetchAlertError />;
  }

  return (
    <>
      <Head>
        <title>Saiketsu - Parties</title>
      </Head>

      <PageTitle name="Parties" description="Viewing all parties" />

      <Box mt={2}>{displayContentType}</Box>

      <Box mt={2}>
        <Button
          variant="contained"
          startIcon={<GroupAddIcon />}
          href="/admin/parties/create"
          size="large"
          fullWidth
        >
          Create Party
        </Button>
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    try {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["read:parties"],
      });

      if (!accessToken)
        return {
          redirect: {
            destination: "/",
          },
        };

      const parties = await getParties(accessToken);
      if (!parties) return { props: {} };

      return { props: { parties } };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  },
} as any);
