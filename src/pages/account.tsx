import { UserProfile } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Head from "next/head";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import auth0 from "@/common/utils/auth0";
import AccountImageEmailRole from "@/modules/account/components/AccountImageEmailRole";

type AccountProps = {
  user: UserProfile;
};

export default function Account({ user }: AccountProps) {
  return (
    <>
      <Head>
        <title>Saiketsu - Account</title>
      </Head>

      <PageTitle name="Account" description="Displaying account information" />

      <Box mt={1}>
        <AccountImageEmailRole user={user} />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired();
