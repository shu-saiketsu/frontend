declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";

      AUTH0_SECRET: string;

      AUTH0_BASE_URL: string;
      AUTH0_ISSUER_BASE_URL: string;
      AUTH0_CLIENT_ID: string;
      AUTH0_CLIENT_SECRET: string;
      AUTH0_AUDIENCE_IDENTIFIER: string;

      NEXT_PUBLIC_AUTH0_NAMESPACE: string;

      GATEWAY_API: string;
      HEALTH_API: string;
    }
  }
}

export {};
