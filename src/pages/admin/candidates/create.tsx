import Box from "@mui/material/Box";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import auth0 from "@/common/utils/auth0";
import CreateCandidateForm from "@/modules/candidates/CreateCandidateForm";

export default function CreateCandidate() {
  const router = useRouter();

  const handleCandidateCreated = (candidateId: number) => {
    router.push(`/admin/candidates/${candidateId}`);
  };

  return (
    <>
      <Head>
        <title>Saiketsu - Create Candidate</title>
      </Head>

      <PageTitle
        name="Create new candidate"
        description="Create new candidate process"
      />

      <Box mt={2}>
        <CreateCandidateForm onCandidateCreated={handleCandidateCreated} />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    try {
      const { accessToken } = await auth0.getAccessToken(req, res, {
        scopes: ["create:candidates"],
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
