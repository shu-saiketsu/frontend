import Box from "@mui/material/Box";
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

export const getServerSideProps = auth0.withPageAuthRequired();
