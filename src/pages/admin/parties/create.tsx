import * as React from "react";
import auth0 from "@/common/utils/auth0";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import CreatePartyForm from "@/modules/parties/CreatePartyForm";

export default function CreateCandidate() {
  let router = useRouter();

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
