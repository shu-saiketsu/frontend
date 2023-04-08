import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";

export interface FrontendAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
