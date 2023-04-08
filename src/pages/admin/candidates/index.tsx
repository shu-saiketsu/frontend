import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import * as React from "react";

import DataFetchAlertError from "@/common/components/DataFetchAlertError";
import PageTitle from "@/common/components/PageTitle";
import { Candidate } from "@/common/types/Candidate";
import auth0 from "@/common/utils/auth0";
import CandidateDataGrid from "@/modules/candidates/CandidateDataGrid";
import { getCandidates } from "@/pages/api/candidates";

type IndexCandidatesProps = {
  candidates?: Candidate[];
};

export default function IndexCandidates({ candidates }: IndexCandidatesProps) {
  let displayContentType;
  if (candidates) {
    displayContentType = <CandidateDataGrid rows={candidates} />;
  } else {
    displayContentType = <DataFetchAlertError />;
  }

  return (
    <>
      <Head>
        <title>Saiketsu - Candidates</title>
      </Head>

      <PageTitle name="Candidates" description="Viewing all candidates" />

      <Box mt={2}>{displayContentType}</Box>

      <Box mt={2}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          href="/admin/candidates/create"
          size="large"
          fullWidth
        >
          Create Candidate
        </Button>
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    const { accessToken } = await auth0.getAccessToken(req, res, {
      scopes: ["read:candidates"],
    });

    if (!accessToken)
      return {
        redirect: {
          destination: "/",
        },
      };

    const candidates = await getCandidates(accessToken);
    if (!candidates) return { props: {} };

    return { props: { candidates } };
  },
} as any);
