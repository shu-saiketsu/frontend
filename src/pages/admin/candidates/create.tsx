import * as React from "react";
import auth0 from "@/common/utils/auth0";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import CreateCandidateForm from "@/modules/candidates/CreateCandidateForm";

export default function CreateCandidate() {
  let router = useRouter();

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

export const getServerSideProps = auth0.withPageAuthRequired();
