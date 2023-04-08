import * as React from "react";
import auth0 from "@/common/utils/auth0";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import CreateElectionForm from "@/modules/elections/CreateElectionForm";
import { UserProfile } from "@auth0/nextjs-auth0/client";

type CreateElectionProps = {
  user: UserProfile;
};

export default function CreateElection({ user }: CreateElectionProps) {
  let router = useRouter();

  const handleElectionCreated = (electionId: number) => {
    router.push(`/admin/elections/${electionId}`);
  };

  return (
    <>
      <Head>
        <title>Saiketsu - Create Election</title>
      </Head>

      <PageTitle
        name="Create new election"
        description="Create new election process"
      />

      <Box mt={2}>
        <CreateElectionForm
          onElectionCreated={handleElectionCreated}
          user={user}
        />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired();
