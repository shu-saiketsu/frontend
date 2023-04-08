import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";

export interface FrontendAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
