import * as React from "react";
import Head from "next/head";
import PageTitle from "@/common/components/PageTitle";

export default function Index() {
  return (
    <>
      <Head>
        <title>Saiketsu</title>
      </Head>

      <PageTitle name="Home" description="Welcome to democracy" />
    </>
  );
}
