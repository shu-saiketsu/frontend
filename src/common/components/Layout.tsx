import { UserProfile } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import * as React from "react";

import Header from "./Header/Header";
import HealthStatus from "./HealthStatus";
import Sidebar from "./SideBar";
import useHealth from "../hooks/useHealth";

type LayoutProps = {
  user?: UserProfile;
  children: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  const { health, isLoading, error } = useHealth();

  return (
    <>
      <HealthStatus health={health} isLoading={isLoading} error={error} />
      <Stack direction="row">
        <Box sx={{ width: 300 }}>
          <Sidebar />
        </Box>

        <Box sx={{ width: 1 }}>
          <Header />
          <Container maxWidth="xl">
            <Box mb={2}>
              <main>{children}</main>
            </Box>
          </Container>
        </Box>
      </Stack>
    </>
  );
}
