import BallotIcon from "@mui/icons-material/Ballot";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";

import DataFetchAlertError from "@/common/components/DataFetchAlertError";
import PageTitle from "@/common/components/PageTitle";
import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";
import ElectionDataGrid from "@/modules/elections/grids/ElectionDataGrid";
import { getElections } from "@/pages/api/elections";

type IndexElectionsProps = {
  elections?: Election[];
};

export default function IndexElections({ elections }: IndexElectionsProps) {
  let displayContentType;
  if (elections) {
    displayContentType = <ElectionDataGrid rows={elections} />;
  } else {
    displayContentType = <DataFetchAlertError />;
  }

  return (
    <>
      <Head>
        <title>Saiketsu - Elections</title>
      </Head>

      <PageTitle name="Elections" description="Viewing all elections" />

      <Box mt={2}>{displayContentType}</Box>

      <Box mt={2}>
        <Button
          variant="contained"
          startIcon={<BallotIcon />}
          href="/admin/elections/create"
          size="large"
          fullWidth
        >
          Create Election
        </Button>
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
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

    const elections = await getElections(accessToken);
    if (!elections) return { props: {} };

    return { props: { elections } };
  },
} as any);
