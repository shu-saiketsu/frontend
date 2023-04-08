import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Head from "next/head";
import * as React from "react";

import Layout from "@/common/components/Layout";
import createEmotionCache from "@/common/createEmotionCache";
import theme from "@/common/theme";
import { FrontendAppProps } from "@/common/types/FrontendAppProps";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: FrontendAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { user } = pageProps;

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <UserProvider user={user}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </UserProvider>
    </LocalizationProvider>
  );
}
