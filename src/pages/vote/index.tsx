import Box from "@mui/material/Box";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import * as React from "react";

import PageTitle from "@/common/components/PageTitle";
import { Election } from "@/common/types/Election";
import auth0 from "@/common/utils/auth0";
import { isUserInRole } from "@/common/utils/roleRetriever";
import BasicElectionInformationCard from "@/modules/vote/BasicElectionInformationCard";
import ElectionVotingCardList from "@/modules/vote/ElectionVotingCardList";

import { getUserElections } from "../api/elections/users/[userId]";

type VoteIndexProps = {
  elections: Election[];
};

export default function VoteIndex({ elections }: VoteIndexProps) {
  return (
    <>
      <Head>
        <title>Saiketsu - Vote</title>
      </Head>

      <PageTitle name="Vote" description="Vote in your eligible elections." />

      <Box mt={1}>
        <BasicElectionInformationCard elections={elections} />
      </Box>

      <Box mt={1}>
        <ElectionVotingCardList elections={elections} />
      </Box>
    </>
  );
}

export const getServerSideProps = auth0.withPageAuthRequired({
  async getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    const session = await auth0.getSession(req, res);
    const user = session?.user;

    const isAdministrator = isUserInRole("Administrator", user);
    if (!session || !user || isAdministrator)
      return {
        redirect: {
          destination: "/",
        },
      };

    const sub = user.sub as string;

    const elections = await getUserElections(sub, true);
    if (!elections)
      return {
        redirect: {
          destination: "/",
        },
      };

    return { props: { elections } };
  },
} as any);
