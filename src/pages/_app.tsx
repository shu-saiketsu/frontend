import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/theme";
import createEmotionCache from "@/createEmotionCache";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout";

const clientSideEmotionCache = createEmotionCache();

export interface FrontendApp extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: FrontendApp) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <UserProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserProvider>
    </CacheProvider>
  );
}
